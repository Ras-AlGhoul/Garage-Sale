import React, { useState, useEffect } from 'react';
import ReactImageUploadComponent from "react-images-upload";
import axios from "axios";

const ImageUpload = ({ uploadImg }) => {
  const [imgFile, setImgFile] = useState(null);
  const imageUpload = (e) => {
    let imageFile = e[0];
    let imagePreset = new FormData();
    imagePreset.append("file", imageFile);
    imagePreset.append("upload_preset", "IsellApp");
    setImgFile(imagePreset);
  };

  const postToCloude = async () => {
    try {
      if (imgFile !== null) {
        const response = await axios.post("https://api.cloudinary.com/v1_1/dz2vr4bag/image/upload", imgFile);
        uploadImg({
          target: {
            name: "imageUrl",
            value: response.data.secure_url,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    postToCloude();
  }, [imgFile]);


  return (
    <div>
      < ReactImageUploadComponent
        singleImage={false}
        onChange={imageUpload}
        buttonText="Upload Image"
        withLabel={false}
        withIcon={false}
        buttonClassName="upload-button"
        name="imageUrl"
      > Upload Image </ReactImageUploadComponent>
    </div>
  )
}

export default ImageUpload
