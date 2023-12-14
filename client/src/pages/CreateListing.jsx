import React, { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Puff from "react-loading-icons/dist/esm/components/puff";
import ThreeDots from "react-loading-icons/dist/esm/components/three-dots";

function CreateListing() {
  const [files, setFiles] = useState([]);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [formData, setFormData] = useState({
    imageUrls: [],
  });
  const style = { color: "black", fontSize: "1.5em" }
  const submitImage = () => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises).then((urls) => {
        setFormData({
          ...formData,
          imageUrls: formData.imageUrls.concat(urls),
        });
        setUploadLoading(false);
        
      });

    } else {
      toast.error("images exceeded limit! upload upto 6 images");
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        setUploadLoading(true);
          
        },

        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };
  const handleDelete = (imageUrl) => {
    const updatedImageUrls = formData.imageUrls.filter(
      (url) => url !== imageUrl
    );
    setFormData({ ...formData, imageUrls: updatedImageUrls });
  };
  return (
    <main className="xs:p-6">
      <h1 className="text-center text-2xl mb-3">Create a Listing</h1>
      <form className="max-w-4xl flex-col md:flex-row mx-auto flex gap-4 ">
        <div className="flex flex-col flex-1">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="bg-white w-full p-3 rounded-md border border-slate-300 my-1.5"
            //   onChange={handleChange}
          />
          <textarea
            name="description"
            id=""
            placeholder="Description"
            className="bg-white w-full p-3 rounded-md border border-slate-300 my-1.5"
            rows="2"
          ></textarea>
          <input
            type="text"
            name="address"
            placeholder="Address"
            className="bg-white w-full p-3 rounded-md border border-slate-300 my-1.5"
            //   onChange={handleChange}
          />
          <div className="flex gap-6 items-center  flex-wrap mt-3">
            <div className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4" />
              <label htmlFor="" className="font-medium">
                Sell
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4" />
              <label htmlFor="" className="font-medium">
                Rent
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4" />
              <label htmlFor="" className="font-medium">
                Parking Spot
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4" />
              <label htmlFor="" className="font-medium">
                Furnished
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4" />
              <label htmlFor="" className="font-medium">
                Offer
              </label>
            </div>
          </div>
          <div className="mt-6 flex gap-4 flex-wrap">
            <div className="flex items-center gap-3 rounded-md">
              <input
                type="number"
                min="1"
                max="10"
                className="p-3 rounded-md"
              />
              <label htmlFor="" className="">
                Beds
              </label>
            </div>
            <div className="flex items-center gap-3 rounded-md">
              <input
                type="number"
                min="1"
                max="10"
                className="p-3 rounded-md"
              />
              <label htmlFor="" className="">
                Baths
              </label>
            </div>
            <div className="flex items-center gap-3 rounded-md">
              <input
                type="number"
                min="1"
                max="10"
                className="p-3 rounded-md"
              />
              <label htmlFor="" className="">
                Regular price <p className="text-xs text-center">($/month)</p>
              </label>
            </div>
            <div className="flex items-center gap-3 rounded-md">
              <input
                type="number"
                min="1"
                max="10"
                className="p-3 rounded-md"
              />
              <label htmlFor="" className="">
                Discounted price
                <p className="text-xs text-center">($/month)</p>
              </label>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <p className="text-gray-600 font-medium mb-3">
            <span className="font-medium text-black">Images:</span> The first
            image will be the cover (max 6)
          </p>
          <div className="gap-4 flex">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setFiles(e.target.files)}
              className="border p-2 rounded-md border-slate-300 w-full"
            />
            <button
              type="button"
              className="border  bg-blue-500 text-white p-2 rounded-md"
              onClick={submitImage}
            > 
              {uploadLoading ? <ThreeDots className="font-normal  w-12"  /> : "Upload"}
            </button>
          </div>
          <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 mt-3">
            Create list
          </button>
          {formData.imageUrls.map((imageUrl) => (
            <div key={imageUrl} className="flex justify-between items-center">
              <img
                src={imageUrl}
                className="w-20 h-20 object-cover my-1 border-1 border-black"
                alt="messing"
              />
              <button
                className="bg-red-700 text-white p-2 text-sm font-medium rounded-lg hover:opacity-95"
                onClick={() => imageUrl}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </form>
      <ToastContainer position="top-right" />
    </main>
  );
}

export default CreateListing;
