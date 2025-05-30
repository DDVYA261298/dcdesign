import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

// configure
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// Folder to upload
const folderPath = path.join(__dirname, "../public/uploads");

fs.readdir(folderPath, async (err, files) => {
  if (err) return console.error("❌ Failed to read folder:", err);
  for (const file of files) {
    const filePath = path.join(folderPath, file);
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: "dcdesign",
        resource_type: 'auto' 
      });
      console.log("✅ Uploaded:", file);
      console.log("📎 URL:", result.secure_url);
    } catch (error) {
      console.error("❌ Upload failed for", file, error);
    }
  }
});
