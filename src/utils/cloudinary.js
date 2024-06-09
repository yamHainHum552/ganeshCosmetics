import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (file, folder) => {
  try {
    const buffer = await file.arrayBuffer();
    const bytes = Buffer.from(buffer);

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "auto",
          folder,
        },
        (error, result) => {
          if (error) {
            return reject(error.message);
          }
          return resolve(result);
        }
      );

      const stream = require("stream");
      const bufferStream = new stream.PassThrough();
      bufferStream.end(bytes);
      bufferStream.pipe(uploadStream);
    });
  } catch (error) {
    throw new Error(`Failed to upload file: ${error.message}`);
  }
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
