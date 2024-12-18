require('dotenv').config();
const express = require("express");
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app); // Create an HTTP server
const io = new Server(server, {
  cors: {
    origin: '*', // Allow all origins (for development)
    methods: ['GET', 'POST'], // Specify allowed methods
  },
});

const DataBaseConnection = require("./Services/DatabaseService");

// Middleware for parsing JSON and setting CORS headers
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Initialize database connection
const databaseConnection = new DataBaseConnection();
databaseConnection.connect();

// Routes
const userRoutes = require('./Routes/UserRoutes')(databaseConnection);
app.use('/api/user', userRoutes);

const workspaceRoutes = require('./Routes/WorkspaceRoute')(databaseConnection);
app.use('/api/workspace', workspaceRoutes);

const roomRoutes = require('./Routes/RoomsRoutes')(databaseConnection);
app.use('/api/room', roomRoutes);

const cardRoutes = require('./Routes/CardRoutes')(databaseConnection);
app.use('/api/card', cardRoutes);

const listRoutes = require('./Routes/ListRoutes')(databaseConnection);
app.use('/api/list', listRoutes);

// Socket.IO configuration
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('join-room', (room) => {
    socket.join(room);
  });

  socket.on('listInsert', (id) => {
    io.to(id).emit('listInsert', id);
  });

  socket.on('listUpdate', (id) => {
    io.to(id).emit('listUpdate', id);
  });

  socket.on('listDuplicate', (id) => {
    io.to(id).emit('listDuplicate', id);
  });

  socket.on('listDelete', (id) => {
    io.to(id).emit('listDelete', id);
  });

  socket.on('cardInsert', (id) => {
    io.to(id).emit('cardInsert', id);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Start the server
const PORT = process.env.SERVER_PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
