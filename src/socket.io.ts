// import { io } from 'socket.io-client';

// let socket;

// export const initiateSocket = (token) => {
//     socket = io('http://localhost:5000', { // Ensure the port matches your backend server
//         auth: {
//             token, // Send the token without 'Bearer ' prefix if server expects it
//         },
//     });

//     console.log('Connecting socket...');

//     socket.on('connect', () => {
//         console.log('Socket connected:', socket.id);
//     });

//     socket.on('disconnect', () => {
//         console.log('Socket disconnected');
//     });
// };

// export const getSocket = () => {
//     if (!socket) {
//         throw new Error('Socket not initialized. Call initiateSocket first.');
//     }
//     return socket;
// };
import { Server } from 'socket.io';
import Message from '../../backend/src/models/message';

export default function (server: any) {
  const io = new Server(server);

  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('joinChat', (chatId: string) => {
      socket.join(chatId);
      console.log(`User joined chat: ${chatId}`);
    });

    socket.on('sendMessage', async (data: { chatId: string, senderId: string, text: string }) => {
      const { chatId, senderId, text } = data;

      try {
        const message = new Message({ chat: chatId, sender: senderId, text });
        await message.save();

        io.to(chatId).emit('receiveMessage', message);
      } catch (error) {
        console.error('Error sending message:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
}
