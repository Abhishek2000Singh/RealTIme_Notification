import { Server } from 'socket.io';

const io = new Server({
    cors: {
        origin: 'http://localhost:3000', // Allow requests from frontend (React)
    },
});

let onlineUsers = [];

// Add a new user to the onlineUsers array if they don't exist
const addNewUser = (username, socketId) => {
    if (!onlineUsers.some((user) => user.username === username)) {
        onlineUsers.push({ username, socketId });
        console.log(`User ${username} added to online users`);
    } else {
        console.log(`User ${username} is already online`);
    }
};

// Remove a user from the onlineUsers array when they disconnect
const removeUser = (socketId) => {
    onlineUsers = onlineUsers.filter(user => user.socketId !== socketId);
    console.log(`User with socketId ${socketId} disconnected`);
};

// Get a user object by username
const getUser = (username) => {
    return onlineUsers.find(user => user.username === username);
};

io.on('connection', (socket) => {

    // When a new user connects
    socket.on("newUser", (username) => {
        addNewUser(username, socket.id);
    });

    // Send notification to the receiver if they are online
    socket.on("sendNotification", ({ senderName, receiverName, type }) => {
        const receiver = getUser(receiverName);

        if (receiver) {
            // Send notification to the receiver
            io.to(receiver.socketId).emit("getNotification", {
                senderName,
                type
            });
            console.log(`Notification sent from ${senderName} to ${receiverName}`);
        } else {
            // Handle case where receiver is not online
            console.log(`Receiver ${receiverName} not found online`);
        }
    });
    // Send notification to the receiver if they are online
    socket.on("sendText", ({ senderName, receiverName, text }) => {
        const receiver = getUser(receiverName);

        if (receiver) {
            // Send notification to the receiver
            io.to(receiver.socketId).emit("getNotification", {
                senderName,
                text
            });
            console.log(`Notification sent from ${senderName} to ${receiverName}`);
        } else {
            // Handle case where receiver is not online
            console.log(`Receiver ${receiverName} not found online`);
        }
    });

    // Handle disconnection of a user
    socket.on("disconnect", () => {
        removeUser(socket.id);
    });
});

// Start the server
io.listen(5000, () => {
    console.log('Server running at http://localhost:5000');
});
