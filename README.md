# ⚙️ MERN URL Shortener – Backend

A RESTful backend API for a URL Shortener application built using Node.js, Express.js, and MongoDB. It provides URL shortening functionality, user authentication, and database management.

## 🚀 Features

- RESTful API Development
- User Signup and Signin
- JWT Authentication
- URL Shortening
- Unique Short URL Generation
- MongoDB Database Integration
- Mongoose Data Modeling
- Environment Variable Configuration
- CORS Configuration
- JSON Request Handling

## 🛠️ Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- dotenv
- CORS
- JavaScript

## 📁 Project Structure

```text
backend/
├── models/
│   └── Url.js
├── server.js
├── auth.js
├── .env
├── package.json
└── README.md
```

## ⚙️ Installation & Setup

**1. Clone the backend repository**

```bash
git clone YOUR_BACKEND_REPOSITORY_URL
```

**2. Navigate to the backend folder**

```bash
cd backend
```

**3. Install dependencies**

```bash
npm install
```

**4. Configure environment variables**

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Use your actual MongoDB connection string and a strong JWT secret. Never upload your `.env` file to GitHub.

**5. Start the server**

```bash
npm start
```

If you use nodemon:

```bash
npm run dev
```

Backend runs at:

`http://localhost:5000`

## 🔗 API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/signup` | Register a new user |
| POST | `/auth/signin` | Login user |

### URL Shortener

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Check API status |
| POST | `/shorten` | Generate a shortened URL |

## 🗄️ Database

MongoDB is used to store application data, while Mongoose handles database models and operations.

## 🔒 Security

- JWT-based authentication
- Environment variables for sensitive credentials
- CORS configuration
- Secure database connection configuration

## 👩‍💻 Developer

Developed as part of a MERN Stack URL Shortener project.

