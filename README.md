# Full Stack Authentication App

A full-stack web application built with the MERN stack (MongoDB, Express, React, Node.js) featuring a robust authentication system using JSON Web Tokens (JWT). The frontend is powered by Vite and React, styled with modern Tailwind CSS for a responsive, polished UI.

## Features

- **User Authentication**: Secure Login and Registration system.
- **Form Validation**: Client-side and server-side validation.
- **JWT Authorization**: Protects private routes and securely maintains sessions.
- **Modern UI**: Built with React and styled beautifully with Tailwind CSS v4.
- **Password Hashing**: Passwords securely hashed in the database using bcryptjs.
- **RESTful API**: Node.js and Express backend handling secure data transactions.

## Tech Stack

### Frontend
- **Framework**: React 19 with Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM v7
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JSON Web Tokens (JWT) & bcryptjs
- **Other utilities**: Nodemailer, CORS, dotenv

## Prerequisites

Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/) (running locally or a MongoDB Atlas URI)
- Git

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/krishnagupta031003-ops/ACT_Assignment.git
cd ACT_Assignment
```

### 2. Backend Setup

Open a terminal and navigate to the backend directory:

```bash
cd backend
npm install
```

Create a `.env` file in the `/backend` directory and configure the following environment variables:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

# Nodemailer setup (if applicable for email verification / reset password)
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_app_password
```

Start the backend server (runs using Node --watch or Nodemon for development):

```bash
npm run dev
# OR
npm start
```

### 3. Frontend Setup

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
npm install
```

Start the Vite development server:

```bash
npm run dev
```

The application will usually be available at `http://localhost:5173`. 

## Project Structure

```text
ACT_Assignment/
├── backend/                  # Node.js/Express server
│   ├── config/               # Database and other configuration files
│   ├── controllers/          # Route controller logic
│   ├── middleware/           # Express middlewares (e.g., auth middleware)
│   ├── models/               # Mongoose schemas
│   ├── routes/               # API route definitions
│   ├── .env                  # Environment variables
│   ├── package.json          
│   └── server.js             # Main server entrypoint
│
└── frontend/                 # React Frontend
    ├── public/               
    ├── src/                  
    │   ├── assets/           
    │   ├── components/       # Reusable React components
    │   ├── pages/            # Page components (Login, Register, Dashboard)
    │   ├── App.jsx           # Main App component with routing
    │   └── main.jsx          # React entrypoint
    ├── index.html            
    ├── package.json          
    └── vite.config.js        
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.
