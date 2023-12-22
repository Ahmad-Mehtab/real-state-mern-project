import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import gif from "../assets/images/VAyR.gif";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import "swiper/css/bundle";
// Import Swiper styles
// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";

function Listing() {
  const [loading, setLoading] = useState(true);
  const [listingData, setListingData] = useState();
  const [copied, setCopied] = useState(false);
  const params = useParams();
  console.log(listingData);
  useEffect(() => {
    const showUserData = async () => {
      try {
        const listingId = params.listingId;
        const response = await fetch(`/api/listing/get/${listingId}`);
        const data = await response.json();

        setListingData(data);
        setLoading(false);
        if (data.success === false) {
          toast.error("Something went wrong");
          return;
        }

        // Assuming data is expected to be an object with form data
        // if (typeof data === 'object' && Object.keys(data).length > 0) {
        //   setFormData(data);
        // } else {
        //   toast.error("Invalid data received");
        // }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Something went wrong");
      }
    };

    showUserData();
  }, [params.listingId]);
  return (
    <div className="">
      {loading ? (
        <img src={gif} className="w-36 h-a m-auto" alt="" />
      ) : (
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
            {listingData.imageUrls.map((urls, index) => (
              <SwiperSlide key={index}>
                <div
                  className="h-[500px]"
                  style={{
                    background: `url(${urls})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
            <FaShare
              className="text-slate-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
              Link copied!
            </p>
          )}
          <div className="flex flex-col max-w-5xl p-3 my-7 m-auto">
            <p className="text-2xl font-bold">
              {listingData.name} - ${listingData.regularPrice}
              {listingData.type == "rent" && " /Month"}
            </p>
            <p className="flex items-center gap-1 mt-2 text-lg font-medium">
              <FaMapMarkerAlt className="text-green-700 text-2xl" />{" "}
              {listingData.address}
            </p>
            <div className="max-w-[600px] flex gap-2 mt-8">
              <div className="bg-red-700 px-2 py-1 w-full max-w-[150px] text-md font-bold rounded text-white">
                {listingData.type == "rent" ? "For Rent" : "For Sell"}
              </div>

              {listingData.offer && (
                <div className="bg-green-700 px-2 py-1 w-full max-w-[150px] text-md font-bold rounded text-white">
                  $
                  {Number.parseFloat(
                    listingData.regularPrice - listingData.discountPrice
                  )}
                </div>
              )}
            </div>
            <p className="mt-3">
              <span className="font-bold">Description - </span>{" "}
              {listingData.description}{" "}
            </p>
            <div className="flex justify-between max-w-xl mt-5 flex-wrap">
              <p className="flex items-center gap-2 ">
                <FaBed className="text-2xl" />{" "}
                <p className="font-medium">
                  {listingData.bedrooms}{" "}
                  {listingData.bedrooms > 1 ? "Beds" : "Bed"}
                </p>
              </p>
              <p className="flex items-center gap-2 ">
                <FaBath className="text-2xl" />{" "}
                <p className="font-medium">
                  {listingData.bathrooms}{" "}
                  {listingData.bathrooms > 1 ? "Baths" : "Bath"}
                </p>
              </p>
              <p className="flex items-center gap-2 ">
                <FaParking className="text-2xl" />{" "}
                <p className="font-medium">
                  {listingData.parking ? "Parking" : "No parking"}
                </p>
              </p>
              <p className="flex items-center gap-2 ">
                <FaChair className="text-2xl" />{" "}
                <p className="font-medium">
                  {listingData.furnished ? "Furnashid" : "Not Furnashid"}
                </p>
              </p>
            </div>
            <button className="uppercase rounded-md mx-auto w-full bg-slate-600 p-2 text-white font-bold mt-3">Contact Landlord</button>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default Listing;
