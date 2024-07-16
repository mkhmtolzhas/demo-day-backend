import 'dotenv/config';
import express from 'express';
import connectDB from './db';
import globalRouter from './global-router';
import { logger } from './logger';
import { createServer } from "node:http"
import { Server } from 'socket.io';
import cors from 'cors';
import GirldriendAIService from './openai/openai-service';

connectDB();

const app = express();
const PORT = process.env.PORT || 3000;
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  }
});



app.use(cors());

app.use(logger);
app.use(express.json());
app.use('/api/',globalRouter);


io.on('connection', (socket) => {
  console.log('a user connected');
  console.log(socket.id);

  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);
  });

  socket.on('send-message', (data) => {
    const { roomId, message } = data;
    console.log(`Message from ${socket.id} to room ${roomId}: ${message}`);
    io.to(roomId).emit('receive-message', {
      userId: socket.id,
      message: message
    });
  });



  socket.on('send-prompt', async (data) => {
    const { roomId, message, systemPrompt } = data;
    console.log(`Message from ${socket.id} to room ${roomId}: ${message}`);
    const girlfriendAIService = new GirldriendAIService();
    // const messages = await getMessagesFromDatabase(message);
    const response = await girlfriendAIService.create(message, systemPrompt);
    io.to(roomId).emit('receive-message', {
      userId: socket.id,
      message: response,
      sender : "bot"
    });
  });

  socket.on('leave-room', (roomId) => {
    socket.leave(roomId);
    console.log(`User ${socket.id} left room ${roomId}`);
  });


  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


server.listen(PORT, () => {
  console.log(`Server runs at http://localhost:${PORT}`);
});

