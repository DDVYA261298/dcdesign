import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env") });
console.log("🔑 MONGODB_URI:", process.env.MONGODB_URI);

import seedDatabase from "../lib/seed";

seedDatabase()
  .then(() => {
    console.log("✅ Database seeding complete!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  });
