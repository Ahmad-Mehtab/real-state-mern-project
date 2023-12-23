import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function Contact({ listing }) {
  const [userInfo, setUserInfo] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const ContactPerson = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        console.log("data: ", data);
        if (data.success === false) {
          toast.error("something went wrong");
        }
        setUserInfo(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Something went wrong");
      }
    };
    ContactPerson();
  }, [listing.userRef]);

  const handleSubmit = (e) => {
    setMessage(e.target.value);
  };
  const createMailtoLink = () => {
    const subject = `Regarding ${listing.name}`;
    const body = encodeURIComponent(message);
    return `mailto:${userInfo?.email}?subject=${subject}&body=${body}`;
  };
  return (
    <div className="flex flex-col gap-2 mt-6 w-full md:w-2/3">
      <p className="text-lg">
        Contact <span className="font-bold">{userInfo?.username}</span> for{" "}
        <span className="font-bold">{listing.name}</span>
      </p>
      <textarea
        name="message"
        id="message"
        className=" bg-slate-200  border border-gray-400  rounded-lg h-20 w-full"
        value={message}
        onChange={handleSubmit}
      ></textarea>
      <Link
        to={createMailtoLink()}
        className="uppercase rounded-md mx-auto w-full bg-slate-600 p-2 text-center text-white font-bold mt-1"
      >
        Submit
      </Link>
      <ToastContainer />
    </div>
  );
}

export default Contact;
