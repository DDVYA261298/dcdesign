import "dotenv/config"; // ✅ This loads environment variables
import path from "path";
import fs from "fs/promises";
import mime from "mime";
// import { uploadToS3 } from "../lib/s3"; // adjust path if needed

const uploadsDir = path.join(process.cwd(), "public", "uploads");

async function migrateUploads() {
  try {
    const files = await fs.readdir(uploadsDir);
    const result: { [filename: string]: string } = {};

    for (const file of files) {
      const fullPath = path.join(uploadsDir, file);
      const stats = await fs.stat(fullPath);

      if (!stats.isFile()) continue;

      const contentType = mime.getType(file) || "application/octet-stream";
      const buffer = await fs.readFile(fullPath);

      // Directly upload buffer instead of File object
      const s3Url = await uploadToS3FromBuffer(buffer, file, "project-images", contentType);
      result[file] = s3Url;
      console.log(`${file} → ${s3Url}`);
    }

    const outputPath = path.join(process.cwd(), "scripts", "s3-mapping.json");
    await fs.writeFile(outputPath, JSON.stringify(result, null, 2));
    console.log("✅ Mapping saved to scripts/s3-mapping.json");
    console.log(`\n✅ Upload complete. Mapping saved to ${outputPath}`);
  } catch (error) {
    console.error("Migration failed:", error);
  }
}

// Patch for Node.js: upload using raw buffer
async function uploadToS3FromBuffer(
  buffer: Buffer,
  filename: string,
  folder: string,
  contentType: string
): Promise<string> {
  const { PutObjectCommand } = await import("@aws-sdk/client-s3");
  const { randomUUID } = await import("crypto");
  const { s3 } = await import("../lib/s3");

  const extension = path.extname(filename);
  const key = `${folder}/${randomUUID()}${extension}`;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET!,
    Key: key,
    Body: buffer,
    ContentType: contentType,
  });

  await s3.send(command);

  return `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
}
  migrateUploads();
