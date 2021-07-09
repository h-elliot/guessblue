import React, { useContext, useState, useEffect } from 'react';
import io from 'socket.io-client';

const SocketContext = React.createContext();

export function useSocket() {
	return useContext(SocketContext);
}

export function SocketProvider({ id, children }) {
	const [socket, setSocket] = useState();

	// query.id in server.js comes from here:
	useEffect(() => {
		const newSocket = io('http://localhost:4040', { query: { id } });
		setSocket(newSocket);

		return () => newSocket.close();
	}, [id]);

	return <SocketContext.Provider value={socket}></SocketContext.Provider>;
}
