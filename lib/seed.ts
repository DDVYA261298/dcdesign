import dotenv from "dotenv";
dotenv.config(); 

console.log("✅ MONGODB_URI loaded as:", process.env.MONGODB_URI); // debug log


import mongoose from 'mongoose';
import { connectToDatabase } from './mongodb';
import Project from '@/models/Project';
import Employee from '@/models/Employee';
import Review from '@/models/Review';
import User from '@/models/User';
import * as bcrypt from 'bcryptjs'; // ✅ Correct way for CommonJS with types

const seedDatabase = async () => {
  try {
    await connectToDatabase();
    
    // Clear existing data
    await Project.deleteMany({});
    await Employee.deleteMany({});
    await Review.deleteMany({});
    await User.deleteMany({});
    
    // Create admin user
    const adminPassword = 'admin123'; // Change this to a secure password
    
    const adminUser = new User({
      username: 'admin',
      password: adminPassword, // Will be hashed by the pre-save hook
      name: 'Admin User',
      role: 'admin'
    });
    console.log("🔧 Seeding admin...");
    await adminUser.save();
    console.log('Admin user created');
    
    // Create employees
    const employees = await Employee.create([
      {
        name: 'Jane Smith',
        role: 'Lead Designer',
        bio: 'Jane has over 10 years of experience in interior design, specializing in modern residential spaces.',
        image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
      },
      {
        name: 'John Davis',
        role: 'Senior Designer',
        bio: 'John specializes in commercial spaces and has worked with numerous high-profile clients.',
        image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
      },
      {
        name: 'Emily Johnson',
        role: 'Junior Designer',
        bio: 'Emily is passionate about sustainable design and bringing natural elements into interior spaces.',
        image: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg',
      },
    ]);
    
    console.log('Employees created');
    
    // Create projects
    const projects = await Project.create([
      {
        title: 'Modern Loft Renovation',
        description: 'A complete renovation of a downtown loft space, transforming it into a modern, open-concept living area with plenty of natural light.',
        status: 'completed',
        images: [
          'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
          'https://images.pexels.com/photos/275484/pexels-photo-275484.jpeg',
          'https://images.pexels.com/photos/3932930/pexels-photo-3932930.jpeg',
        ],
        videos: ['https://www.youtube.com/embed/dQw4w9WgXcQ'],
        featured: true,
        client: 'Urban Living Co.',
        location: 'New York, NY',
        completedDate: new Date('2023-04-15'),
        employees: [employees[0]._id, employees[2]._id],
      },
      {
        title: 'Coastal Beach House',
        description: 'A serene beach house design featuring light colors, natural materials, and panoramic views of the ocean.',
        status: 'completed',
        images: [
          'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
          'https://images.pexels.com/photos/1743227/pexels-photo-1743227.jpeg',
          'https://images.pexels.com/photos/2062431/pexels-photo-2062431.jpeg',
        ],
        videos: [],
        featured: true,
        client: 'Coastal Properties',
        location: 'Malibu, CA',
        completedDate: new Date('2023-08-10'),
        employees: [employees[1]._id, employees[0]._id],
      },
      {
        title: 'Boutique Hotel Lobby',
        description: 'A luxury boutique hotel lobby featuring custom artwork, elegant seating, and a striking reception desk.',
        status: 'ongoing',
        images: [
          'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg',
          'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
        ],
        videos: [],
        featured: false,
        client: 'Elite Hotels Group',
        location: 'Chicago, IL',
        employees: [employees[0]._id, employees[1]._id, employees[2]._id],
      },
    ]);
    
    console.log('Projects created');
    
    // Create reviews
    const reviews = await Review.create([
      {
        clientName: 'Robert Johnson',
        text: 'The team at Interior transformed our outdated loft into a stunning modern space. We couldn\'t be happier with the results!',
        rating: 5,
        project: projects[0]._id,
      },
      {
        clientName: 'Sarah Williams',
        text: 'Working with Jane and Emily was a pleasure. They understood our vision perfectly and delivered beyond our expectations.',
        rating: 5,
        project: projects[0]._id,
      },
      {
        clientName: 'Michael Chen',
        text: 'Our beach house is now the perfect getaway. The design captures the coastal vibe while maintaining elegance and comfort.',
        rating: 4,
        project: projects[1]._id,
      },
    ]);
    
    console.log('Reviews created');
    
    // Update projects with reviews
    await Project.findByIdAndUpdate(projects[0]._id, {
      reviews: [reviews[0]._id, reviews[1]._id],
    });
    
    await Project.findByIdAndUpdate(projects[1]._id, {
      reviews: [reviews[2]._id],
    });
    
    console.log('Projects updated with reviews');
    
    // Update employees with projects
    for (const employee of employees) {
      const employeeProjects = projects.filter(project =>
        project.employees.some(
          (emp: mongoose.Types.ObjectId | string) =>
            emp.toString() === employee._id.toString()
        )
      );
    
      await Employee.findByIdAndUpdate(employee._id, {
        projects: employeeProjects.map(project => project._id),
      });
    }
    
    console.log('Employees updated with projects');
    
    
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // mongoose.connection.close();
  }
};

export default seedDatabase;