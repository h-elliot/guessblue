const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');

// setup
const PORT = 4000;
const NEW_MESSAGE_EVENT = 'new-message-event';

const app = express();
const server = http.createServer(app);

const io = socketIO(server, {
	cors: true,
	origins: ['localhost:3000'],
});

app.use(cors());

// not sure why i need this yet
const room = 'game';

// listen for connections. on a connection, connect to socket and join a room
io.on('connection', (socket) => {
	socket.join(room);
	console.log('client joined room');
	// listen for new messages. when a new message is received, send the data and emit it into the room.

	socket.on(NEW_MESSAGE_EVENT, (data) => {
		io.in(room).emit(NEW_MESSAGE_EVENT, data);
	});
	// listen for disconnections. when a client disconnects, remove them from the room
	socket.on('disconnect', () => {
		socket.leave(room);
		console.log('client left room');
	});
});

server.listen(PORT, () => {
	console.log(`listening on *:${PORT}`);
});
