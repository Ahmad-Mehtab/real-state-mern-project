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
import { ProfileUpdateSuccess } from "../redux/authSlice";

function Profile() {
  const { userData,  } = useSelector((state) => state.user);

  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const dispatch =  useDispatch();


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
        setFileUploadError(true);
        toast.error("Error image upload(image must be less then 2 mb");
        setFilePerc(0); // Reset progress if there's an error
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            setFormData({ ...formData, avatar: downloadURL });
            toast.success("image uploaded successfully");
            setFileUploadError(false); // Reset fileUploadError on successful upload
            setFilePerc(0); // Set progress to 100 after successful upload
          })
          .catch((error) => {
            console.error("Error getting download URL:", error);
            setFileUploadError(true);
            setFilePerc(0); // Reset progress if there's an error
          });
      }
    );
  };

  const handleChange = (e) => {
    const {name, value } = e.target;
    setFormData({ ...formData, [name]: value }); // Update state with name:value pair
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/user/update/${userData._id}`, {
        method: 'POST',
        headers : { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)  
       });
       const responseData = await res.json();
       toast.success("Profile Updated Successful");
       dispatch(ProfileUpdateSuccess(responseData));
    } catch (error) {
      toast.error("Update Failed");
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
      </form>
      <div className="mx-auto px-1 my-3 flex justify-between">
        <span className="font-medium text-red-600">Delete account</span>
        <span className="font-medium text-red-600">Sign out</span>
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
}

export default Profile;
