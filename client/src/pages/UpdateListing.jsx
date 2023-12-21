import React, { useEffect, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ThreeDots from "react-loading-icons/dist/esm/components/three-dots";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function UpdateListing() {
  const [files, setFiles] = useState([]);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 0,
    discountPrice: 0,
    furnished: false,
    parking: false,
    offer: false,
  });

  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const params = useParams();



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
    } else if (files.length === 0) {
      toast.error("please select images");
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

  const handleFormSubmit = (e) => {
    const targetId = e.target.id;

    if (targetId === "rent" || targetId === "sell") {
      setFormData({ ...formData, type: targetId });
    }
    if (
      targetId === "furnished" ||
      targetId === "parking" ||
      targetId === "offer"
    ) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [targetId]: !prevFormData[targetId],
      }));
    }
    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({ ...formData, [targetId]: e.target.value });
    }
  };

  const submitHandle = async (e) => {
    e.preventDefault();
    const listingId = params.listingId;
    if (formData.imageUrls.length < 1) {
      toast.error("Please select an image");
      return;
    }
    if (formData.regularPrice < formData.discountPrice) {
      toast.error("Regular price should be greater than Discount price");
      return;
    }

    try {
      const res = await fetch(`/api/listing/update/${listingId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          userRef: userData._id,
        }),
      });
      const data = await res.json();
      if (data.success === false || data.statusCode === 500) {
        toast.error("Something getting wrong");
        return;
      }
      toast.success("Form Update Successful");
      resetForm();
      setTimeout(() => {
        navigate("/listing");
      }, 3000);
    } catch (error) {
      toast.error(error);
    }
  };
  const resetForm = () => {
    setFormData({
      imageUrls: [],
      name: "",
      description: "",
      address: "",
      type: "rent",
      bedrooms: 1,
      bathrooms: 1,
      regularPrice: 0,
      discountPrice: 0,
      furnished: false,
      parking: false,
      offer: false,
    });
    setFiles([]);
  };

useEffect(() => {
  const updateUserData = async () => {
    try {
      const listingId = params.listingId;
  
      const response = await fetch(`/api/listing/get/${listingId}`);
      const data = await response.json();
  
      console.log('data: ', data);
  
      if (data.success === false) {
        toast.error("Something went wrong");
        return;
      }
  
      // Assuming data is expected to be an object with form data
      if (typeof data === 'object' && Object.keys(data).length > 0) {
        setFormData(data);
      } else {
        toast.error("Invalid data received");
      }
  
    } catch (error) { 
      console.error('Error fetching data:', error);
      toast.error("Something went wrong");
    }
  };

  updateUserData();
}, [params.listingId]);
  return (
    <main className="xs:p-6">
      <h1 className="text-center text-2xl mb-3">Update a Listing</h1>
      <form
        className="max-w-4xl flex-col md:flex-row mx-auto flex gap-4"
        onSubmit={submitHandle}
      >
        <div className="flex flex-col flex-1">
          <input
            type="text"
            name="name"
            placeholder="Title"
            id="name"
            required
            className="bg-white w-full p-3 rounded-md border border-slate-300 my-1.5"
            onChange={handleFormSubmit}
            value={formData.name}
          />
          <textarea
            name="description"
            id="description"
            placeholder="Description"
            className="bg-white w-full p-3 rounded-md border border-slate-300 my-1.5"
            rows="2"
            onChange={handleFormSubmit}
            value={formData.description}
          ></textarea>
          <input
            type="text"
            name="address"
            id="address"
            placeholder="Address"
            className="bg-white w-full p-3 rounded-md border border-slate-300 my-1.5"
            onChange={handleFormSubmit}
            value={formData.address}
          />
          <div className="flex gap-6 items-center  flex-wrap mt-3">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="w-4 h-4"
                id="sell"
                checked={formData.type === "sell"}
                onChange={handleFormSubmit}
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
                checked={formData.type === "rent"}
                onChange={handleFormSubmit}
              />
              <label htmlFor="" className="font-medium">
                Rent
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="w-4 h-4"
                id="parking"
                checked={formData.parking}
                onChange={handleFormSubmit}
              />
              <label htmlFor="" className="font-medium">
                Parking Spot
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="w-4 h-4"
                id="furnished"
                onChange={handleFormSubmit}
                checked={formData.furnished}
              />
              <label htmlFor="" className="font-medium">
                Furnished
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="w-4 h-4"
                id="offer"
                checked={formData.offer}
                onChange={handleFormSubmit}
              />
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
                id="bedrooms"
                value={formData.bed}
                onChange={handleFormSubmit}
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
                id="bathrooms"
                className="p-3 rounded-md"
                value={formData.bath}
                onChange={handleFormSubmit}
              />
              <label htmlFor="" className="">
                Baths
              </label>
            </div>
            <div className="flex items-center gap-3 rounded-md">
              <input
                type="number"
                required
                id="regularPrice"
                min="500"
                className="p-3 rounded-md"
                value={formData.regularPrice}
                onChange={handleFormSubmit}
              />
              <label htmlFor="" className="">
                Regular price <p className="text-xs text-center">($/month)</p>
              </label>
            </div>
            <div className="flex items-center gap-3 rounded-md">
              <input
                type="number"
                required
                id="discountPrice"
                min="100"
                className="p-3 rounded-md"
                value={formData.disPrice}
                onChange={handleFormSubmit}
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
              // required
              onChange={(e) => setFiles(e.target.files)}
              className="border p-2 rounded-md border-slate-300 w-full"
            />
            <button
              type="button"
              className="border  bg-blue-500 text-white p-2 rounded-md"
              onClick={submitImage}
            >
              {uploadLoading ? (
                <ThreeDots className="font-normal  w-12" />
              ) : (
                "Upload"
              )}
            </button>
          </div>

          {formData.imageUrls?.map((imageUrl) => (
            <div key={imageUrl} className="flex justify-between items-center">
              <img
                src={imageUrl}
                className="w-20 h-20 object-cover my-1 border-1 border-black"
                alt="messing"
              />
              <button
                className="bg-red-700 text-white p-2 text-sm font-medium rounded-lg hover:opacity-95"
                onClick={() => handleDelete(imageUrl)}
              >
                Delete
              </button>
            </div>
          ))}
          <button
            disabled={uploadLoading}
            className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 mt-3"
          >
            Update list
          </button>
        </div>
      </form>
      <ToastContainer position="top-right" />
    </main>
  );
}

export default UpdateListing;
