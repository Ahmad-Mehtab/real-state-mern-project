import React, { useState } from "react";

function CreateListing() {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
  });
console.log(formData);
  const submitImage = () => {
    if (files.length > 0 && files.length < 7) {
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storageImage(files[i]));
      }
    
    }
  };

  const storageImage = (files) => {
    console.log('files: ', files);
    //   Promise.all(files).then((urls) =>{
    //     setFormData({...formData, imageUrls: formData.imageUrls.concat(urls)});
    //   });
  }
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
              className="border border-green-500 p-2 rounded-md"
              onClick={submitImage}
            >
              Upload
            </button>
          </div>
          <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 mt-3">
            Create list
          </button>
        </div>
      </form>
    </main>
  );
}

export default CreateListing;
