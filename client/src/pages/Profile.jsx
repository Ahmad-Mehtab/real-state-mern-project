import React from "react";
import { useSelector } from "react-redux";
function Profile() {
  const { userData } = useSelector((state) => state.user);

  return (
    <div className="mx-auto max-w-xl w-full px-4">
      <h1 className="text-center my-5 text-2xl font-bold">Profile</h1>
      <form className=" flex flex-col gap-4 items-center">
        <img
          src={userData.avatar}
          alt="mssing"
          className="w-24 h-24 rounded-full object-cover"
        />
        <input
          type="text"
          className="bg-white w-full p-3 rounded-md border border-slate-300"
        />
        <input
          type="text"
          className="bg-white w-full p-3 rounded-md border border-slate-300"
        />
        <input
          type="text"
          className="bg-white w-full p-3 rounded-md border border-slate-300"
        />
        <button className="w-full p-3 bg-slate-600 text-white text-lg font-medium rounded-md">
          Update
        </button>
      </form>
      <div className="mx-auto px-1 my-3 flex justify-between">
        <span className="font-medium text-red-600">Delete account</span>
        <span className="font-medium text-red-600">Sign out</span>
      </div>
    </div>
  );
}

export default Profile;
