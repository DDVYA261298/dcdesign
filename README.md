# Interior Design Portfolio

A full-stack web application for showcasing interior design projects, team members, and client reviews.

## Features

- Responsive frontend built with Next.js and TypeScript
- MongoDB database for storing project data
- Admin dashboard for managing content
- Project filtering by status
- Image and video management
- Client testimonials
- Team member profiles

## Tech Stack

- **Frontend**: Next.js with TypeScript, Tailwind CSS
- **Backend**: Next.js API routes
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS with shadcn/ui components

## Project Structure

```
/app
  ├── (public)/ # Public-facing pages
  │   ├── page.tsx # Home page
  │   ├── projects/
  │   ├── about/
  │   ├── contact/
  ├── (admin)/ # Admin pages
  │   ├── admin/
  │   ├── login/
  ├── api/ # API routes
/components
  ├── ui/ # UI components (shadcn)
  ├── layout/ # Layout components
  ├── home/ # Home page components
  ├── projects/ # Project-related components
  ├── admin/ # Admin-specific components
/lib # Utility functions
/models # MongoDB models
/public
  ├── images/ # Static images
```

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- MongoDB database

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/interior-design-portfolio.git
cd interior-design-portfolio
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env.local` file in the root directory and add:
```
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

4. Seed the database
```bash
# Visit this URL after starting the development server
http://localhost:3000/api/seed
```

5. Start the development server
```bash
npm run dev
```

6. Access the application at `http://localhost:3000`

### Admin Access

- URL: http://localhost:3000/admin/login
- Username: admin
- Password: admin123 (change this in production)

## Deployment

This application can be deployed to any platform that supports Next.js applications, such as Vercel, Netlify, or a custom server.

```bash
npm run build
npm start
```

## License

MIT