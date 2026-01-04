# 📝 SnapNotes

A modern, full-stack note-taking application designed for seamless note management. Create, organize, search, and pin your notes with an intuitive and responsive interface.

> **Learning Project**: Built to master full-stack development fundamentals, including secure authentication, RESTful API design, and modern frontend-backend integration.

## 🌐 Live Application

🚀 **Try it now:** [https://snapnotes-mern.onrender.com](https://snapnotes-mern.onrender.com)  
🔌 **API Endpoint:** [https://snapnotes-mern-backend.onrender.com](https://snapnotes-mern-backend.onrender.com)

> **Note:** The app is hosted on Render's free tier. Initial load may take 30-60 seconds as the server spins up from sleep mode.

## 💡 Key Learnings & Technologies

This project demonstrates proficiency in:

- **Backend Development**: Building robust REST APIs with Node.js and Express, implementing proper routing, middleware, and error handling
- **Security**: JWT-based authentication, password hashing with bcryptjs, and secure HTTP-only cookies
- **Database Management**: MongoDB schema design, CRUD operations, and data relationships using Mongoose
- **Frontend Architecture**: Component-based React development with hooks, context, and modern patterns
- **State Management**: Global state handling with Redux Toolkit for seamless user experience
- **UI/UX Design**: Responsive layouts with Tailwind CSS, ensuring mobile-first design principles
- **API Integration**: Asynchronous data fetching with Axios and proper error handling
- **Deployment**: Full-stack deployment on Render with environment configuration

## ✨ Features

### Core Functionality
- 🔐 **Secure Authentication** - JWT-based sign up and login system
- ✏️ **Note Management** - Create, edit, and delete notes with rich content
- 🏷️ **Tag Organization** - Categorize notes with custom tags for easy filtering
- 📌 **Pin to Top** - Keep important notes always visible
- 🔍 **Smart Search** - Find notes instantly by title, content, or tags
- 📱 **Responsive Design** - Optimized for desktop, tablet, and mobile devices

### Technical Features
- ⚡ **Fast Performance** - Vite-powered frontend for lightning-fast development and builds
- 🔒 **Secure Cookies** - HTTP-only cookies for token storage
- 🎨 **Modern UI** - Clean interface with Tailwind CSS utility classes
- 🔄 **Real-time Updates** - Instant UI updates with Redux state management

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

## 📁 Project Architecture

```
snapnotes/
├── frontend/              # React + Vite application
│   ├── src/
│   │   ├── components/   # Reusable UI components (Navbar, Cards, Inputs)
│   │   ├── pages/        # Route-based pages (Home, Login, Signup)
│   │   ├── redux/        # Redux store and slices for state management
│   │   └── utils/        # Helper functions and utilities
│   ├── public/           # Static assets
│   └── package.json      # Frontend dependencies
│
├── backend/              # Node.js + Express API server
│   ├── controller/       # Request handlers and business logic
│   ├── models/           # Mongoose schemas (User, Note)
│   ├── routes/           # API route definitions
│   ├── utils/            # Middleware (authentication, error handling)
│   └── package.json      # Backend dependencies
│
└── README.md             # Project documentation
```

## 🚀 Getting Started

### 🌐 Use the Live Application
Simply visit [https://snapnotes-mern.onrender.com](https://snapnotes-mern.onrender.com) to start using SnapNotes immediately. No installation required!

### 💻 Run Locally (For Developers)

If you want to run the project locally for development:

**Prerequisites:**
- Node.js (v14 or higher)
- MongoDB database (local or Atlas)

**Setup:**

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd snapnotes
   ```

2. Backend setup:
   ```bash
   cd backend
   npm install
   ```
   
   Create `.env` file:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```
   
   Start server:
   ```bash
   npm start
   ```

3. Frontend setup (new terminal):
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173)

## 🎯 How to Use

1. **🌐 Visit the App** - Go to [SnapNotes](https://snapnotes-mern.onrender.com)
2. **👤 Create Account** - Sign up with your email and password
3. **🔑 Login** - Access your personal dashboard
4. **➕ Add Notes** - Click the "+" button to create your first note
5. **🏷️ Organize** - Add tags to categorize your notes
6. **📌 Pin Important** - Click the pin icon to keep crucial notes at the top
7. **🔍 Search** - Use the search bar to find notes by title or content
8. **✏️ Edit Anytime** - Click on any note to edit or update it
9. **🗑️ Clean Up** - Delete notes you no longer need

### 🎨 User Experience Highlights
- **Persistent Storage**: All notes are safely stored in MongoDB
- **Session Management**: Stay logged in across browser sessions
- **Instant Feedback**: Real-time UI updates for all actions
- **Mobile Friendly**: Full functionality on all device sizes

## 🔒 Security & Authentication

SnapNotes implements industry-standard security practices:

- **JWT Authentication** - Stateless token-based authentication system
- **Password Hashing** - bcryptjs encryption before database storage
- **HTTP-Only Cookies** - Secure token storage preventing XSS attacks
- **Protected Routes** - Middleware validation for authenticated-only endpoints
- **Environment Variables** - Sensitive data stored securely outside codebase

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


