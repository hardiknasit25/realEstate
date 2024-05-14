import React, { useState } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../../FirebaseConfing';

function UpdateImage({ nextStep, prevStep, propertyDetails, setPropertyDetails }) {

  const [files, setfiles] = useState([]);
  const [imageUploadError, setImageUploadError] = useState(false)
  const [uploading, setUploading] = useState(false);

  const handleOnCLick = () => {
    // if (files.length === 0){
    //   // setImageUploadError("Please Upload Atliast 1 Image");
    // }
    // else{
    // }
    nextStep();
  }

  const handleImageSubit = async (e) => {
    if (files.length > 0 && files.length + propertyDetails.imageUrls.length < 7) {
      setUploading(true)
      setImageUploadError(false)
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]))
      }
      Promise.all(promises).then((urls) => {
        setPropertyDetails({ ...propertyDetails, imageUrls: propertyDetails.imageUrls.concat(urls) })
        setImageUploadError(false)
        setUploading(false)
      }).catch((err) => {
        setImageUploadError('Image Uploaded Faild')
        setUploading(false)
      })
    }
    else {
      setImageUploadError("you can uplaod only 6 images per listing")
      setUploading(false)
    }
  }

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName)
      const uploadTask = uploadBytesResumable(storageRef, file)
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            resolve(downloadUrl)
          })
        }
      )
    })
  }

  const handleRemoveImage = (index) => {
    setPropertyDetails({
      ...propertyDetails,
      imageUrls: propertyDetails.imageUrls.filter((_, i) => i !== index),
    })
  }

  return (
    <div className='h-[35rem] p-3 w-full'>

      <div className='flex justify-center items-center gap-3 p-3'>
        <input type='file' id='images' accept='image/*' multiple onChange={(e) => setfiles(e.target.files)} className='border-[1.5px] border-gray-600 p-3 flex justify-center items-center cursor-pointer rounded' />
        <button type='button' onClick={handleImageSubit} className='p-3 border-[1.5px] border-green-700 text-green-700 rounded uppercase hover:opacity-80'> 
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </div>

      <div className='flex gap-3 p-4 justify-center items-center flex-wrap'>
        {propertyDetails.imageUrls.length > 0 &&
          propertyDetails.imageUrls?.map((url, index) => (
            <div key={url} className='flex flex-col gap-2 border-[1.5px] border-gray-300 rounded-md p-2'>
              <img src={url} className='h-[10rem] w-[10rem] rounded-md object-cover' alt='listing_image' />
              <button type='button' onClick={() => handleRemoveImage(index)} className='text-red-500 uppercase'>Delete</button>
            </div>
          ))}
      </div>

      <p className='text-red-500'>{imageUploadError && imageUploadError}</p>
      <div className="flex justify-center items-center gap-4 mt-10">
          <button className="px-4 bg-white border-[1.5px] border-slate-200 font-semibold text-slate-700 text-sm rounded-md py-2 hover:opacity-95" type="submit" onClick={prevStep}>Back</button>
          <button className="px-4 bg-[#228BE6] font-semibold text-white text-sm rounded-md py-2 hover:opacity-95" type="submit" onClick={handleOnCLick}>Next Step</button>
      </div>
    </div>
  )
}

export default UpdateImage

