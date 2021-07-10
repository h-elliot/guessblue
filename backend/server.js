const io = require('socket.io')(4040);

// creating our own ids for socketID, bc we already have our own static ids
// we want a static id that doesnt change when we refresh
io.on('connection', (socket) => {
	const id = socket.handshake.query.id;
	socket.join(id);

	socket.on('send-message', ({ partner, text }) => {
		partner.forEach((partner) => {
			const newPartner = partner.filter((p) => p !== partner);
			newPartner.push(id);
			socket.broadcast.to(partner).emit('receive-message', {
				partner: newPartner,
				sender: id,
				text,
			});
		});
	});
});
