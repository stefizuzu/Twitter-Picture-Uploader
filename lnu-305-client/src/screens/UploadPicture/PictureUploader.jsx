import React, { useState } from "react";
import { useMutation } from "react-query";
import api from "../../api";

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const useUploadMedia = () =>
  useMutation(async (file) => {
    const base64Image = await toBase64(file);
    return api.post("/twitter/upload", { image: base64Image });
  });

const PictureUploader = () => {
  const [file, setFile] = useState(null);
  const [requestUpload, { isLoading: isUploading }] = useUploadMedia();

  const handleChange = async (event) => {
    try {
      event.persist();
      await requestUpload(event.target.files[0]);
      const blobFile = URL.createObjectURL(event.target.files[0]);
      setFile(blobFile);
    } catch (err) {
      console.error("* Error caught while uploading file", err);
    }
  };

  return (
    <div>
      <h3>Upload picture to Twitter</h3>
      <input
        accept="ïmage/*"
        className="custom-file-input"
        type="file"
        onChange={handleChange}
      />
      <br />
      {file ? <img src={file} alt="selected media" /> : null}
    </div>
  );
};

export default PictureUploader;
