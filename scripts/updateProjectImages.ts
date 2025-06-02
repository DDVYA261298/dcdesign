import mongoose from "mongoose";
import path from "path";
import fs from "fs/promises";
import Project from "@/models/Project";
import { config } from "dotenv";

config(); // Load MONGODB_URI from .env

const mappingPath = path.join(process.cwd(), "scripts", "s3-mapping.json");

async function updateProjectImages() {
  try {
    const raw = await fs.readFile(mappingPath, "utf-8");
    const s3Map = JSON.parse(raw);

    await mongoose.connect(process.env.MONGODB_URI!);
    const projects = await Project.find({});

    for (const project of projects) {
      let updated = false;

      const newImages = project.images.map((imgPath: string) => {
        const fileName = imgPath.split("/").pop();
        if (fileName && s3Map[fileName]) {
          updated = true;
          return s3Map[fileName]; // Replace with S3 URL
        }
        return imgPath; // Keep existing if not matched
      });

      if (updated) {
        project.images = newImages;
        await project.save();
        console.log(`✅ Updated project: ${project.title}`);
      }
    }

    console.log("🎉 All projects updated with S3 image URLs!");
    await mongoose.disconnect();
  } catch (err) {
    console.error("❌ Failed to update projects:", err);
  }
}

updateProjectImages();
