import clientPromise from "./mongodb";

const projects = [
  {
    title: "Modern Minimalist Apartment",
    category: "residential",
    status: "completed",
    description: "A clean, minimalist design for a downtown apartment...",
    year: 2023,
    location: "New York, NY"
  },
  {
    title: "Luxury Penthouse Suite",
    category: "residential",
    status: "completed",
    description: "A sophisticated penthouse design featuring custom furniture...",
    year: 2022,
    location: "Miami, FL"
  }
];

async function seedProjects() {
  const client = await clientPromise;
  const db = client.db('dcdesign');
  const result = await db.collection('projects').insertMany(projects);
  console.log(`${result.insertedCount} projects inserted!`);
}

seedProjects();
