# Studex

Studex is a modern campus management platform designed for colleges and universities to streamline operations.

## Project Purpose

One-stop solution for digital campus management—admissions, attendance, results, hostel, faculty, and student portal.

## Tech Stack

- **Frontend**: Next.js, TypeScript, CSS, JavaScript
- **Backend**: Next.js API Routes
- **Database**: MongoDB
- **Authentication**: Custom auth implementation
- **Deployment**: Vercel

## Project Structure

- **app/**: Main application logic and entry points
- **components/**: Reusable UI elements (navbar, slideshow, campus challenges, college features)
- **hooks/**: Custom React hooks for utilities like mobile responsiveness, toast messaging
- **lib/**: Core utilities including authentication, MongoDB connection, and helper functions
- **models/**: Database schemas for Student, Admin, Hostel, Library, and other entities
- **types/**: TypeScript interfaces and type definitions

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

### Admissions Management
- Online application processing
- Document verification
- Student onboarding

### Student Portal
- Personal dashboard
- Academic records access
- Course enrollment

### Faculty Management
- Scheduling and timetable management
- Performance tracking
- Resource allocation

### Attendance System
- Real-time attendance tracking
- Automated reporting
- Analytics and insights

### Academic Results
- Grade management
- Transcript generation
- Performance analytics

### Hostel Management
- Room allocation
- Mess management
- Fee tracking and payment

## Deployment

The application is Vercel-ready and optimized for production deployment.

```bash
npm run build
```

The platform emphasizes efficiency, intuitive UI, and extensibility for educational institutions.
