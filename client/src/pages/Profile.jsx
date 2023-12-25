import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { app } from "../firebase";
import { ProfileUpdateSuccess, signOutSuccess } from "../redux/authSlice";
import { Link, useNavigate } from "react-router-dom";
import SweetAlertCom from "./SweetAlert";

function Profile() {
  const { userData } = useSelector((state) => state.user);

  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  // const [fileUploadError, setFileUploadError] = useState(false);
  const [showSignOutAlert, setShowSignOutAlert] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [formData, setFormData] = useState({});
  const [showUserData, setShowUserData] = useState();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // firebase storage
  // allow read;
  // allow write: if
  // request.resource.size < 2 * 1024 * 1024 &&
  // request.resource.contentType.matches('image/.*')

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        console.log("error: ", error);
        toast.error("Error image upload(image must be less then 2 mb");
        setFilePerc(0); // Reset progress if there's an error
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            setFormData({ ...formData, avatar: downloadURL });
            toast.success("image uploaded successfully");
            setFilePerc(0); // Set progress to 100 after successful upload
          })
          .catch((error) => {
            console.error("Error getting download URL:", error);
            setFilePerc(0); // Reset progress if there's an error
          });
      }
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); // Update state with name:value pair
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/user/update/${userData._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const responseData = await res.json();
      toast.success("Profile Updated Successful");
      dispatch(ProfileUpdateSuccess(responseData));
    } catch (error) {
      toast.error("Update Failed");
    }
  };

  const handleUserDlt = async () => {
    try {
      const dltUser = await fetch(`/api/user/delete/${userData._id}`, {
        method: "DELETE",
      });
      const dltedUsr = await dltUser.json();
      if (dltedUsr.message === false && dltedUsr.statusCode === 401) {
        toast.error("Delete Failed");
        return false;
      }
      dispatch(signOutSuccess());
      setShowDeleteAlert(false);
      // navigate("/signin");
    } catch (error) {
      toast.error(error.message);
    }
  };
  const UserSignOut = async () => {
    try {
      const dltUser = await fetch(`/api/auth/signout`);
      const dltedUsr = await dltUser.json();
      if (dltedUsr.message === false) {
        toast.error("SignOut Failed");
        return false;
      }
      setShowSignOutAlert(false);
      dispatch(signOutSuccess());
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onCancel = () => {
    setShowSignOutAlert(false);
    setShowDeleteAlert(false);
  };

  // Show user Create listing
  const showUserCreateList = async () => {
    // setLoading(true);
  
    try {
      const response = await fetch(`api/user/listings/${userData._id}`);
      const data = await response.json();
      if (data.success === false) toast.error("Something went wrong");
      else if(data.length === 0 ) toast.warn("no data found")
      
      setShowUserData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    //  finally {
    //   setLoading(false); // Set loading to false regardless of success or failure
    // }
  };

  const dltList = async (listId) => { 
    try {
      const response = await fetch(`api/listing/delete/${listId}`,{
        method: 'DELETE',
      });
      const data = await response.json();
      if (data.success === false) {
        toast.error("Something went wrong");
      }
      setShowUserData((prev) => prev.filter((listing) => listing._id !== listId));
      // showUserCreateList() 
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="mx-auto max-w-lg w-full px-4">
      <h1 className="text-center my-5 text-2xl font-bold">Profile</h1>
      <form
        onSubmit={handleSubmit}
        className=" flex flex-col gap-4 items-center"
      >
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <img
          src={formData.avatar || userData.avatar}
          alt="mssing"
          className="w-24 h-24 rounded-full object-cover"
          onClick={() => fileRef.current.click()}
        />
        <p className="text-center">
          {filePerc > 0 && filePerc < 100 ? (
            <span className="text-gray-500">{`uploading ${filePerc}%`}</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          className="bg-white w-full p-3 rounded-md border border-slate-300"
          defaultValue={userData.username}
          onChange={handleChange}
          name="username"
        />
        <input
          type="text"
          className="bg-white w-full p-3 rounded-md border border-slate-300"
          defaultValue={userData.email}
          onChange={handleChange}
          name="email"
        />
        <input
          type="password"
          name="password"
          className="bg-white w-full p-3 rounded-md border border-slate-300"
          onChange={handleChange}
        />
        <button className="w-full p-3 bg-slate-600 text-white text-lg font-medium rounded-md">
          Update
        </button>
        <Link to={"/create-listing"} className="w-full">
          <button className="w-full p-3 bg-green-600 text-white text-lg font-medium rounded-md">
            Create Listing
          </button>
        </Link>
      </form>
      <div className="mx-auto px-1 my-3 flex justify-between">
        <span
          className="font-medium text-red-600 cursor-default"
          onClick={() => setShowDeleteAlert(true)}
        >
          Delete account
        </span>
        <span
          className="font-medium text-red-600"
          onClick={() => setShowSignOutAlert(true)}
        >
          Sign out
        </span>
      </div>
      {showSignOutAlert && (
        <SweetAlertCom
          handleClick={UserSignOut}
          onCancel={onCancel}
          message={"yes, sign out"}
        />
      )}
      {showDeleteAlert && (
        <SweetAlertCom
          handleClick={handleUserDlt}
          onCancel={onCancel}
          message={"yes, delete"}
        />
      )}

      <div className="my-5 text-center ">
        <h3
          className="font-bold text-xl text-green-700"
          onClick={showUserCreateList}
        >
          Show listing
        </h3>
        {showUserData &&
          showUserData.length > 0 &&
          showUserData?.map((listData) => (
            <div
              key={listData._id}
              className="flex items-center justify-between"
            >
        
                <img
                  src={listData.imageUrls[0]}
                  alt="missing"
                  className="w-20 mt-2"
                />
              
              <Link to={`/listing/${listData._id}`}><p>{listData.name}</p></Link>
              <div className="dltEditbtn flex gap-2">
                <button
                  className="bg-red-500 text-white p-1 rounded-md"
                  onClick={() => dltList(listData._id)}
                >
                  Delete
                </button>
                <Link to={`/update-listing/${listData._id}`}>
                <button className="bg-blue-500 text-white p-1 rounded-md">
                  Edit
                </button>
                </Link>
              </div>
            </div>
          ))}
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
}

export default Profile;
