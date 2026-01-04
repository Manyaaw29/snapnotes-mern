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
- 🌙 Dark mode support

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

## 📝 How to Use

1. **Sign Up** - Create a new account
2. **Login** - Access your notes
3. **Create Notes** - Click the "+" button to add a new note
4. **Add Tags** - Organize notes with tags
5. **Pin Notes** - Keep important notes at the top
6. **Search** - Find notes quickly by title or content
7. **Edit/Delete** - Manage your notes easily
8. **Toggle Dark Mode** - Click the moon/sun icon for your preferred theme

## 🔒 Authentication

The app uses JWT (JSON Web Tokens) for secure authentication:
- Passwords are hashed using bcryptjs before storing
- JWT tokens are stored in cookies for session management
- Protected routes ensure only authenticated users can access their notes

##  License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to fork this repository and submit pull requests.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Contact

Feel free to reach out if you have any questions or suggestions!


