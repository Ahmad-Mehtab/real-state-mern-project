import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Listing() {
  const [showUserData, setShowUserData] = useState();
  const { userData } = useSelector((state) => state.user);
  const isInitialMount = useRef(true);

  return (
    <div>
      
      <ToastContainer />
    </div>
  );
}

export default Listing;
