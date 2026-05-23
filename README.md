# Skill Swap & Micro-Learning Platform

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) application designed for a peer-to-peer skill exchange. Users can teach what they know, learn what they need, and grow endlessly through targeted micro-learning sessions.

## Features

- **User Authentication**: Secure register and login system using JWT and bcrypt.
- **Profiles**: Comprehensive user profiles with photo upload support (Multer).
- **Skill Marketplace**: Browse, search, and filter skills offered by mentors.
- **Session Scheduling**: Book sessions with mentors, who can accept or reject requests.
- **Dashboard**: Track upcoming sessions, pending requests, and completed sessions.
- **Modern UI**: Fully responsive, accessible, and dynamic design powered by Tailwind CSS and Framer Motion, with Dark Mode support.

## Technology Stack

### Frontend
- React.js (Vite)
- Tailwind CSS
- React Router DOM
- Axios
- Framer Motion
- Lucide React (Icons)

### Backend
- Node.js
- Express.js
- MongoDB & Mongoose
- JSON Web Token (JWT)
- bcryptjs
- Multer (Local File Uploads)

## Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB (Local instance or Atlas cluster)

### Installation

1. **Clone the repository** (if applicable) or navigate to the project directory.

2. **Backend Setup**:
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` directory based on the following structure:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/skillswap
   JWT_SECRET=supersecretjwtkey12345
   NODE_ENV=development
   ```
   Start the backend server:
   ```bash
   npm run dev
   ```

3. **Frontend Setup**:
   Open a new terminal window.
   ```bash
   cd frontend
   npm install
   ```
   Start the frontend development server:
   ```bash
   npm run dev
   ```

## Folder Structure

```
skill-swap-platform/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Route logic
│   ├── middleware/      # JWT verification and Multer upload config
│   ├── models/          # Mongoose DB Schemas
│   ├── routes/          # Express API routes
│   ├── uploads/         # Local storage for profile photos
│   ├── server.js        # Entry point for backend
│   └── package.json
└── frontend/
    ├── public/
    ├── src/
    │   ├── api/         # Axios API instance
    │   ├── components/  # Reusable UI components (Navbar, Footer, etc.)
    │   ├── context/     # React Context for state management (Auth)
    │   ├── pages/       # React route pages
    │   ├── App.jsx      # Main application router
    │   ├── main.jsx     # React DOM render point
    │   └── index.css    # Global Tailwind styles
    ├── tailwind.config.js
    ├── vite.config.js
    └── package.json
```

## Deployment

To deploy this application:
1. Provision a MongoDB Atlas cluster and update the `MONGO_URI`.
2. Deploy the backend to a service like Render, Heroku, or AWS, ensuring the `uploads` folder is handled (e.g., swapping Multer local storage for AWS S3).
3. Build the frontend using `npm run build` and deploy the `dist` folder to Vercel, Netlify, or Firebase. Ensure the Vite proxy is replaced by the actual backend URL in the Axios base configuration.
