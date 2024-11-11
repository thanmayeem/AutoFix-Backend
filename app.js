require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const firebaseAdmin = require('firebase-admin');
const socketIo = require('socket.io');

const app = express();
const port = process.env.PORT || 3000;

// Firebase setup
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(require(process.env.FIREBASE_ADMIN_SDK_PATH))
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Middleware
app.use(express.json());

// Routes
app.use('/api/diagnostics', require('./routes/diagnostics'));

// Start server
const server = app.listen(port, () => console.log(`Server running on port ${port}`));

const io = socketIo(server);
io.on('connection', (socket) => {
  console.log('New client connected');
  // Define real-time events here
});
