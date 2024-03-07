import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ListingItem from "./ListingItem";
import gif from "../assets/images/YlWC.gif";

function Search() {
  const navigate = useNavigate();
  const [queryParams, setQueryParams] = useSearchParams();
  const [listingData, setListingData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visibleItems, setVisibleItems] = useState(8);
  const [searchData, setSearchData] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });

  //   const searchTermFromUrl = urlParams.get('searchTerm');
  useEffect(() => {
    let searchTermFromUrl = queryParams.get("searchTerm");
    const urlParams = new URLSearchParams(location.search);
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSearchData({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        parking: parkingFromUrl === "true" ? true : false,
        furnished: furnishedFromUrl === "true" ? true : false,
        offer: offerFromUrl === "true" ? true : false,
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      });
      //   setSearchData(old=>({...old,searchTerm:searchTermFromUrl}))
    }

    const fetchListingData = async () => {
      try {
        setLoading(true);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/listing/get?${searchQuery}`);
        const data = await res.json();
        // if (data.length > 8) {
        //   setShowMore(true);
        // } else {
        //   setShowMore(false);
        // }
        setListingData(data);
        setLoading(false);
      } catch (error) {}
    };
    fetchListingData();
  }, [location.search, queryParams]);

  const handleChange = (e) => {
    const targetId = e.target.id;
    if (targetId === "all" || targetId === "sell" || targetId === "rent") {
      setSearchData({ ...searchData, type: targetId });
    }

    if (
      targetId === "furnished" ||
      targetId === "parking" ||
      targetId === "offer"
    ) {
      setSearchData({
        ...searchData,
        [targetId]:
          e.target.checked || e.target.checked == "true" ? true : false,
      });
    }
    if (targetId === "searchTerm") {
      setSearchData({ ...searchData, searchTerm: e.target.value });
    }
    if (targetId === "sortOrder") {
      const sort = e.target.value.split("_")[0] || "created_at";
      const order = e.target.value.split("_")[1] || "desc";
      setSearchData({ ...searchData, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    queryParams.set("searchTerm", searchData.searchTerm);
    const urlParams = new URLSearchParams();
    urlParams.set("type", searchData.type);
    urlParams.set("parking", searchData.parking);
    urlParams.set("furnished", searchData.furnished);
    urlParams.set("offer", searchData.offer);
    urlParams.set("sort", searchData.sort);
    urlParams.set("order", searchData.order);
    const searchQuery = urlParams.toString();
    // window.history.replaceState({}, "", `${window.location.pathname}?${searchQuery}`);
    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = () => {
    // Increase the number of visible items (e.g., show the next 8 items)
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 8);
  };

  const showMoreButton = !loading && visibleItems < listingData.length;

  return (
    <main className="xs:p-6 ">
      <div className="flex flex-col md:flex-row gap-4 ">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:min-h-screen border-b-2 md:border-r-2 p-5 gap-6 min-w-[400px]"
        >
          <div className="flex items-center gap-2">
            <label htmlFor="" className="whitespace-nowrap font-bold">
              Search Term:
            </label>
            <input
              type="text"
              name="name"
              placeholder="Title"
              id="searchTerm"
              value={searchData.searchTerm}
              onChange={handleChange}
              className="bg-white w-full p-3 rounded-md border border-slate-300 my-1.5"
            />
          </div>
          <div className="flex gap-6 items-center  flex-wrap">
            <label htmlFor="" className="font-bold">
              Type:
            </label>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="w-4 h-4"
                id="all"
                checked={searchData.type == "all"}
                onChange={handleChange}
              />
              <label htmlFor="" className="font-medium">
                Rent & Sell
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="w-4 h-4"
                id="sell"
                checked={searchData.type == "sell"}
                onChange={handleChange}
              />
              <label htmlFor="" className="font-medium">
                Sell
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="w-4 h-4"
                id="rent"
                checked={searchData.type == "rent"}
                onChange={handleChange}
              />
              <label htmlFor="" className="font-medium">
                Rent
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="w-4 h-4"
                id="offer"
                checked={searchData.offer}
                onChange={handleChange}
              />
              <label htmlFor="" className="font-medium">
                Offer
              </label>
            </div>
          </div>
          <div className="flex gap-6 items-center  flex-wrap ">
            <label htmlFor="" className="font-bold">
              Amenties:
            </label>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="w-4 h-4"
                id="parking"
                checked={searchData.parking}
                onChange={handleChange}
              />
              <label htmlFor="" className="font-medium">
                Parking
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="w-4 h-4"
                id="furnished"
                checked={searchData.furnished}
                onChange={handleChange}
              />
              <label htmlFor="" className="font-medium">
                Furnished
              </label>
            </div>
          </div>
          <div className="flex items-center gap-2 ">
            <label htmlFor="" className="font-bold">
              Sort:
            </label>
            <select
              defaultValue={"created_at_desc"}
              onChange={handleChange}
              id="sortOrder"
              className="border p-2 px-3 border-gray-500 rounded-md "
            >
              <option value="regularPrice_desc">Price high to low</option>
              <option value="regularPrice_asc">Price low to high</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 uppercase"
          >
            Search
          </button>
        </form>
        <div className="flex flex-col p-5">
          <h1 className="text-3xl text-slate-700 p-3 font-semibold border-b-2">
            Listing Result:
          </h1>
          <div className="flex flex-wrap sm:justify-start justify-center ">
            {loading && <img src={gif} className="w-36 mx-auto mt-5" alt="" />}
            {!loading && listingData.length === 0 && <p>Data not found</p>}
            {!loading &&
              listingData &&
              listingData.slice(0, visibleItems).map((item) => (
                <ListingItem itemListing={item} key={item._id} />
              ))}
          </div>
          {showMoreButton && (
        <button
          type="button"
          className="text-green-700 font-semibold text-lg mt-3"
          onClick={handleShowMore}
        >
          Show more
        </button>
      )}
        </div>
      </div>
      {/* <ToastContainer position="top-right" /> */}
    </main>
  );
}

export default Search;
