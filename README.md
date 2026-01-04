# 📝 SnapNotes

A simple and elegant note-taking application where you can create, edit, search, and organize your notes efficiently.

> **Learning Project**: This is a beginner-friendly project built to understand the fundamentals of full-stack development, including user authentication, REST API creation, and frontend-backend integration.

## 🌐 Live Demo

**Frontend:** [https://snapnotes-mern.onrender.com](https://snapnotes-mern.onrender.com)  
**Backend API:** [https://snapnotes-mern-backend.onrender.com](https://snapnotes-mern-backend.onrender.com)

## 💡 What I Learned

- Building a complete REST API from scratch using Node.js and Express
- Implementing secure user authentication with JWT tokens
- Connecting frontend (React) with backend API using Axios
- Database design and operations with MongoDB
- State management using Redux
- Creating a responsive UI with Tailwind CSS

## ✨ Features

- 🔐 User authentication (Sign up & Login)
- ✏️ Create and edit notes with tags
- 📌 Pin important notes to the top
- 🔍 Search notes by title or tags
- 🗑️ Delete notes you no longer need
- 📱 Clean and responsive UI

## 🛠️ Built With

### Frontend
- **React** - JavaScript library for building user interfaces
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Redux Toolkit** - State management
- **Axios** - HTTP client for API requests
- **React Router** - Navigation between pages

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web application framework
- **MongoDB** - NoSQL database for storing notes and users
- **Mongoose** - MongoDB object modeling
- **JWT** - Secure authentication with JSON Web Tokens
- **bcryptjs** - Password hashing

## 📁 Project Structure

```
snapnotes/
├── frontend/          # React frontend application
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Main pages (Home, Login, Signup)
│   │   ├── redux/        # State management
│   │   └── utils/        # Helper functions
│   └── package.json
│
├── backend/           # Express backend server
│   ├── controller/    # Business logic
│   ├── models/        # Database schemas
│   ├── routes/        # API endpoints
│   ├── utils/         # Utility functions
│   └── package.json
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js installed on your computer
- MongoDB database (local or cloud)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd snapnotes
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   ```
   
   Create a `.env` file in the backend folder:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```
   
   Start the backend server:
   ```bash
   npm start
   ```

3. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   ```
   
   Start the development server:
   ```bash
   npm run dev
   ```

4. **Open your browser** and visit `http://localhost:5173`

## 📝 How to Use

1. **Sign Up** - Create a new account
2. **Login** - Access your notes
3. **Create Notes** - Click the "+" button to add a new note
4. **Add Tags** - Organize notes with tags
5. **Pin Notes** - Keep important notes at the top
6. **Search** - Find notes quickly by title or tags
7. **Edit/Delete** - Manage your notes easily

## 🔒 Authentication

The app uses JWT (JSON Web Tokens) for secure authentication:
- Passwords are hashed using bcryptjs before storing
- JWT tokens are stored in cookies for session management
- Protected routes ensure only authenticated users can access their notes

## 📄 License

This project is open source and available for personal use.

## 🤝 Contributing

Feel free to fork this project and make your own improvements!

---

