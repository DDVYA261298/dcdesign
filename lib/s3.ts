// lib/s3.ts
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import { NodeHttpHandler } from "@aws-sdk/node-http-handler";

export const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
  maxAttempts: 5, // Allow the SDK itself to retry on transient network issues
  requestHandler: new NodeHttpHandler({
    connectionTimeout: 10000, // ms
    socketTimeout: 30000, // ms (increase to avoid early timeout)
  }),
});

export const uploadToS3 = async (
  file: File,
  folder: string,
  contentType: string
): Promise<string> => {
  const buffer = Buffer.from(await file.arrayBuffer());
  const extension = file.name.split(".").pop();
  const key = `${folder}/${randomUUID()}.${extension}`;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET!,
    Key: key,
    Body: buffer,
    ContentType: contentType,
    // ACL: "public-read", // Only needed if you require public access
  });

  console.log(`Uploading: ${key} | Size: ${buffer.length} bytes`);

  try {
    await s3.send(command);
    return `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
  } catch (error: any) {
    console.error("❌ Final upload attempt failed:", error);
    throw new Error("S3 Upload failed. Please try again.");
  }
};
