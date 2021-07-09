const io = require('socket.io')(4040);

// creating our own ids for socketID, bc we already have our own static ids
// we want a static id that doesnt change when we refresh
io.on('connection', (socket) => {
	const id = socket.handshake.query.id;
	socket.join(id);

	socket.on('send-message', ({ recipients, text }) => {
		recipients.forEach((recipient) => {
			const newRecipients = recipients.filter((r) => r !== recipient);
			newRecipients.push(id);
			socket.broadcast.to(recipient).emit('recieve-message', {
				recipients: newRecipients,
				sender: id,
				text,
			});
		});
	});
});
