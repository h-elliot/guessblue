const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
app.use(cors());

const server = require('http').createServer(app);
const PORT = process.env.PORT || 4040;

// have node serve the files for our built react app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// handle GET requests to /api route
app.get('/api', (req, res) => {
	res.json({ message: 'Hello from server!' });
});

// all other GET requests not handled before will return our react app
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

const io = require('socket.io')(server, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST'],
	},
});

server.listen(PORT, () => {
	console.log(`📡 SERVER RUNNING ON ${PORT} 💻`);
});

// creating our own ids for socketID, bc we already have our own static ids
// we want a static id that doesnt change when we refresh
io.on('connection', (socket) => {
	const id = socket.handshake.query.id;
	socket.join(id);
	console.log(`🔌 NEW SOCKET ID: ${socket.id} | 🤝 QUERY ID: ${id}`);

	socket.on('send-message', ({ players, partnerName, text, gameId }) => {
		players.forEach((player) => {
			const playerRecipient = players.filter((p) => p !== player);

			playerRecipient.push(id);
			socket.broadcast.to(player).emit('receive-message', {
				players: playerRecipient,
				text,
				gameId,
				sender: id,
			});
		});
	});
});
