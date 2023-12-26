import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

function ListingItem({ itemListing }) {
  return (
    <div className="p-3">
      <Link to={`/listing/${itemListing._id}`}>
        <div className="w-full xs:w-[300px] min-h-[450px] sm:w-[250px] md:w-[300px] overflow-hidden shadow-md transition-shadow hover:shadow-lg border-2 border-slate-200 rounded-md p-2">
          <img
            src={itemListing.imageUrls}
            alt="Missing"
            className="w-full h-[320px] sm:h-[220px] object-cover rounded-md hover:scale-105 transition-scale duration-300 "
          />

          <div className="flex flex-col mt-3">
            <ul>    
              <li className="text-xl font-medium truncate">
                {itemListing.name}
              </li>
              <li className="mt-3 flex items-center gap-1 whitespace-break-spaces">
                <FaMapMarkerAlt className="text-green-700" />
                {itemListing.address}
              </li>
              <li className="truncate mt-1">{itemListing.description}</li>
              <li className="mt-4 text-xl font-bold text-gray-500">
                ${itemListing.regularPrice}{" "}
                {itemListing.type === "rent" ? "/ month" : ""}
              </li>
              <li className="flex gap-9 font-bold mt-1">
                <span>
                  {itemListing.bedrooms}
                  {itemListing.bedrooms > 1 ? "Beds" : "Bed"}
                </span>
                <span>
                  {itemListing.bathrooms}
                  {itemListing.bathrooms > 1 ? "Baths" : "Bath"}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ListingItem;
