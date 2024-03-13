import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (file, folder) => {
  const buffer = await file.arrayBuffer();
  const bytes = Buffer.from(buffer);
  return new Promise(async (resolve, reject) => {
    await cloudinary.uploader
      .upload_stream(
        {
          resource_type: "auto",
          folder,
        },
        async (err, result) => {
          if (err) {
            return reject(err.message);
          }
          return resolve(result);
        }
      )
      .end(bytes);
  });
};
const deleteImage = async (id) => {
  return new Promise(async (resolve, reject) => {
    await cloudinary.api.delete_resources(
      [`products/${id}`],
      async (err, result) => {
        if (err) {
          return reject(err.message);
        } else {
          return resolve(result);
        }
      }
    );
  });
};

export { uploadOnCloudinary, deleteImage };
