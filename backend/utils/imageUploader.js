const cloudinary = require("cloudinary").v2;
// const multer = require("multer");
// const streamifier = require("streamifier");
// require("dotenv").config();

// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// exports.uploadToCloudinary = (buffer, folder) => {
//   return new Promise((resolve, reject) => {
//     let stream = cloudinary.uploader.upload_stream(
//       { folder: folder, chunk_size: 6000000 }, 
//       (error, result) => {
//         if (error) reject(error);
//         else resolve(result);
//       }
//     );
//     streamifier.createReadStream(buffer).pipe(stream);
//   });
// };



exports.uploadImageToCloudinary = async (file, folder, height, quality) => {
  const options = { folder };
  if (height) {
    options.height = height;
  }
  if (quality) {
    options.quality = quality;
  }
  options.resource_type = "auto";

  return await cloudinary.uploader.upload(file.tempFilePath, options);
};

