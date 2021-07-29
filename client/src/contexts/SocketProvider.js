import React, { useContext, useState, useEffect } from 'react';
import io from 'socket.io-client';

const SocketContext = React.createContext();

export function useSocket() {
	return useContext(SocketContext);
}

export function SocketProvider({ id, children }) {
	const [socket, setSocket] = useState();
	const server = 'http://localhost:4040'; //todo: wherever the server is hosted (process.env.PORT ?)

	// query.id in server.js comes from here:
	useEffect(() => {
		const newSocket = io(server, { query: { id } });
		setSocket(newSocket);

		return () => newSocket.close();
	}, [id]);

	return (
		<SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
	);
}
