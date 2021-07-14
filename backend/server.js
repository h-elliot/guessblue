const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
app.use(cors());

const server = require('http').createServer(app);

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

const PORT = 4040;

server.listen(4040, () => {
	console.log(`📡 SERVER RUNNING ON ${PORT} 💻`);
});

// creating our own ids for socketID, bc we already have our own static ids
// we want a static id that doesnt change when we refresh
io.on('connection', (socket) => {
	const id = socket.handshake.query.id;
	socket.join(id);
	console.log(`🔌 NEW SOCKET ID: ${socket.id} | 🤝 QUERY ID: ${id}`);

	// when we receive the output 'send-message':
	// from sendMessage in GamesProvider
	// this func RECEIVES our partner and text
	socket.on('send-message', ({ partner, text }) => {
		console.log(`💬 [${partner}] ${text}`);
		// and then broadcasts to partner:
		// object called 'receive-message'
		// that has partner, sender (with our id)
		// and the message text

		// swap sender and partner--hope it works
		// let sender = id;
		// partner = [sender, (sender = partner)][0];
		socket.broadcast.to(partner).emit('receive-message', {
			partner,
			sender: id,
			text,
		});
	});
});
