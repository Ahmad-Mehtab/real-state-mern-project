import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import swiperCore from "swiper";
// Import Swiper styles
// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import { ToastContainer, toast } from "react-toastify";
import { FaMapMarkerAlt } from "react-icons/fa";

function Home() {
  const [offerListing, setOfferListing] = useState([]);
  const [saleListing, setSaleListing] = useState([]);
  const [rentListing, setRentListing] = useState([]);

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        const res = await fetch(`/api/listing/get?offer=true&limit=4`);
        const data = await res.json();
        setOfferListing(data);
        fetchRentList();
      } catch (error) {
        toast.error(error);
      }
    };
    fetchOffer();

    const fetchRentList = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=rent&limit=4`);
        const data = await res.json();
        setRentListing(data);
        fetchSaleList();
      } catch (error) {
        toast.error(error);
      }
    };

    const fetchSaleList = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=sell&limit=4`);
        const data = await res.json();
        setSaleListing(data);
      } catch (error) {
        toast.error(error);
      }
    };
  }, []);

  return (
    <div className="">
      {/* main content */}
      <div className="flex flex-col p-8  sm:p-14 md:p-32 gap-7">
        <h1 className="sm:text-6xl text-3xl  font-bold text-slate-700">
          Find your next <span className="text-gray-500">perfect</span> <br />{" "}
          place with ease
        </h1>
        <p className="text-md font-semibold text-gray-400">
          khpal kor is the best place to find your next perfect place to live.{" "}
          <br />
          we have a wide range of properties for you to choose from.
        </p>
        <Link to={`/signup`} className="text-md font-bold text-blue-700">
          Lets get started...
        </Link>
      </div>

      {/* swipper section */}
      <div>
        <Swiper
          cssMode={true}
          navigation={true}
          pagination={true}
          mousewheel={true}
          keyboard={true}
          modules={[Navigation, Pagination, Mousewheel, Keyboard]}
          className="mySwiper"
        >
          {offerListing &&
            offerListing?.map((item, index) => (
              <SwiperSlide key={index}>
                <div
                  key={item._id}
                  className="h-[500px]"
                  style={{
                    background: `url(${item.imageUrls[0]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                ></div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      {/* Recent Rent */}

      <div className="grid place-content-center mt-40 px-5 md:px-20">
        <h2 className="text-[27px] text-slate-700 font-bold">Recent sale offers </h2>
        <Link to={`/search?offer=true`} className="font-medium text-blue-600 text-[17px]">Show more offer</Link>
        <div className="grid lg:flex lg:flex-wrap md:grid-cols-2 sm:grid-cols-1 gap-4 ">
          {saleListing &&
            saleListing?.map((rentItem) => (
              <div key={rentItem._id} className="w-full md:w-[300px] min-h-[450px] overflow-hidden shadow-md transition-shadow hover:shadow-lg border-2 border-slate-200 rounded-md p-2">
                <Link to={`/search?offer=true`}>
                  <img
                    src={rentItem.imageUrls}
                    alt="Missing"
                    className="w-full h-[320px] sm:h-[220px] object-cover rounded-md hover:scale-105 transition-scale duration-300 "
                  />

                  <div className="flex mt-3">
                    <ul>
                      <li className="text-xl font-medium truncate">
                        {rentItem.name}
                      </li>
                      <li className="mt-3 flex items-center gap-1 whitespace-break-spaces">
                        <FaMapMarkerAlt className="text-green-700" />
                        {rentItem.address}
                      </li>
                      <li className="truncate mt-1">{rentItem.description}</li>
                      <li className="mt-4 text-xl font-bold text-gray-500">
                        ${rentItem.regularPrice}{" "}
                        {rentItem.type === "rent" ? "/ month" : ""}
                      </li>
                      <li className="flex gap-9 font-bold mt-1">
                        <span>
                          {rentItem.bedrooms}
                          {rentItem.bedrooms > 1 ? "Beds" : "Bed"}
                        </span>
                        <span>
                          {rentItem.bathrooms}
                          {rentItem.bathrooms > 1 ? "Baths" : "Bath"}
                        </span>
                      </li>
                    </ul>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
      {/* Recent Sale */}

      <div className="grid place-content-center my-20 px-5 md:px-20">
        <h2 className="text-[27px] text-slate-700 font-bold">Recent Places for rent</h2>
        <Link to={`/search?offer=true`} className="font-medium text-blue-600 text-[17px]">Show more offer</Link>
        <div className="grid lg:flex lg:flex-wrap md:grid-cols-2 sm:grid-cols-1 gap-4">
          {rentListing &&
            rentListing?.map((saleItem) => (
              <div key={saleItem._id} className="w-full min-h-[450px] md:w-[300px] overflow-hidden shadow-md transition-shadow hover:shadow-lg border-2 border-slate-200 rounded-md p-2">
                <Link to={`/listing/`}>
                  <img
                    src={saleItem.imageUrls}
                    alt="Missing"
                    className="w-full h-[320px] sm:h-[220px] object-cover rounded-md hover:scale-105 transition-scale duration-300 "
                  />

                  <div className="flex mt-3">
                    <ul>
                      <li className="text-xl font-medium truncate">
                        {saleItem.name}
                      </li>
                      <li className="mt-3 flex items-center gap-1 whitespace-break-spaces">
                        <FaMapMarkerAlt className="text-green-700" />
                        {saleItem.address}
                      </li>
                      <li className="truncate mt-1">{saleItem.description}</li>
                      <li className="mt-4 text-xl font-bold text-gray-500">
                        ${saleItem.regularPrice}{" "}
                        {saleItem.type === "rent" ? "/ month" : ""}
                      </li>
                      <li className="flex gap-9 font-bold mt-1">
                        <span>
                          {saleItem.bedrooms}
                          {saleItem.bedrooms > 1 ? "Beds" : "Bed"}
                        </span>
                        <span>
                          {saleItem.bathrooms}
                          {saleItem.bathrooms > 1 ? "Baths" : "Bath"}
                        </span>
                      </li>
                    </ul>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Home;
