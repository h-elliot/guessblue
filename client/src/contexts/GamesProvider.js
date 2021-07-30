import React, { useContext, useState, useEffect, useCallback } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { useFriends } from './FriendsProvider';
import { useSocket } from './SocketProvider';

const GamesContext = React.createContext();

export function useGames() {
	return useContext(GamesContext);
}

export function GamesProvider({ children, id }) {
	const [games, setGames] = useLocalStorage('games', []);
	const [selectedGameIndex, setSelectedGameIndex] = useState(0);
	const { friends } = useFriends();
	const socket = useSocket();

	//* HOW createGame WORKS
	// [1]	takes in the partner you want a game with
	// [2]	checks if a game exists already with that partner
	//![2.1]  - if one does exist, error
	// [3]	sets the Games state to the current games + the desired game

	function createGame(partner, gameId) {
		// [1]
		console.log(`gameId: ${gameId}`);
		setGames((prevGames) => {
			// [2]

			// [3]
			return [...prevGames, { gameId, partner, messages: [] }];
		});
	}

	// * HOW this double-loop WORKS
	// here is where we save the partner's name to a game
	// [1]	for each game and each friend
	// [2]	if a friend ID matches the current partner ID,
	// [3]	add a key for partner's name
	for (let i = 0; i < games.length; i++) {
		// [1] for each game
		for (let j = 0; j < friends.length; j++) {
			// [1] for each friend
			if (games[i].partner === friends[j].id) {
				//	[2]
				// if the current game (index)'s partner ID matches
				// a friend ID in our friends list (and it should)
				const partnerName = friends[j].name;
				//  [3]
				// add a partnerName-KEY that is the same as the
				// friends ID's corresponding name
				games[i].name = partnerName;
				games[i].index = [i];
			}
		}
	}

	//* HOW formattedGames WORKS
	// [1]	map the unformatted games into games
	//		that have an array(object) of messages
	// [2]	map the messages array(object), and for each one
	// [3]	find the friend from friends that has the
	//		same ID as sender
	// [4]	assign "name" to either the friend's name
	//		(matching the friend ID) |OR| the sender id
	// [5]	assign "fromMe" to messages that are from the
	//		POV player (you, not your friends)
	// [6]	FORMATTED MESSAGES object: the message, the senderName, and fromMe
	// [7]	FORMATTED GAME: includes everything about the game,
	//		the array of formatted messages, and the
	//		currently selected game
	const formattedGames = games.map((game, index) => {
		// [1]
		const selected = index === selectedGameIndex;
		const messages = game.messages.map((message) => {
			// [2]
			const friend = friends.find((friend) => {
				// [3]
				return friend.id === message.sender;
				// "friend" now refers to the friend ID that matches sender
			});
			const name = (friend && friend.name) || message.sender;
			// [4]
			const fromMe = id === message.sender;
			// [5]
			return { ...message, senderName: name, fromMe };
			// [6]
		});
		return { ...game, messages, selected };
		// [7]
	});

	//* HOW deleteGame WORKS
	// [1]	takes in the gameId
	// [2]	filter allows all games through that dont
	//		match the gameToDelete
	// [3]	sets games to the ones that pass the filter
	//!		it dont work tho.....

	function deleteGame(gameToDelete) {
		console.log(`gameId: ${gameToDelete}`);
		console.log(`game info: \n ${games.hasOwnProperty()}`);

		const freshNewGames = games.filter(
			(game) => game['gameId'] !== gameToDelete
		);

		console.log(`freshNewGames:`);
		console.log(JSON.stringify(freshNewGames));
		setGames(freshNewGames);
	}

	//todo =================================================================
	//todo =================================================================

	//* HOW addMessageTC WORKS:
	// [1] receives incoming info about a message,
	// [2] checks if a game exists with the current partner,
	// [2.1] if it matches, add the new message to match partner's messages array
	// [2.2] if it doesnt, create a new game object with the partner, and new message
	const addMessageToConversation = useCallback(
		({ partner, text, sender }) => {
			// [1] function receives incoming info about a message
			// partner = RECEIVES the message
			// sender = SENT the message
			// text = the message
			console.log(`📟 ${JSON.stringify(text)}`); //✅ console log the message
			setGames((prevGames) => {
				// setGames takes the previous games and...
				let gameMatches = false;
				// gameMatches is false by default, and will change to true
				// if there's a corresponding game with the specified partner
				const newMessage = { sender, text };
				const updatedGame = prevGames.map((game) => {
					// takes all the previous games and copies them,
					// for each of the games, check if the partners match
					if (game.partner === partner) {
						gameMatches = true;
						// if the partner in the new game matches an
						// existing game, return that game, the messages,
						// and the newest message on the end
						return {
							...game,
							messages: [...game.messages, newMessage],
						};
					}
					// if the partner doesnt match, the
					// function wont do any of that
					return game;
				});

				// once we've checked for a matching game, if there
				// indeed was one, then return the updatedGame
				// object as the newest version of that game
				if (gameMatches) {
					return updatedGame;
				} else {
					// if gameMatches is false
					// return all the previous games, along
					// with the new message and partner as a new game
					return [...prevGames, { partner, messages: [newMessage] }];
				}
			});
		},
		[setGames]
	);

	useEffect(() => {
		if (!socket) {
			console.log('🕳️ SOCKET IS NULL');
			return;
		}
		// when the socket receives-message, add it to convo
		socket.on('receive-message', addMessageToConversation);

		return () => socket.off('receive-message');
	}, [socket, addMessageToConversation]);

	//* HOW sendMessage WORKS
	// [1]	it takes in the partner (who the message is sent to)
	//		and the text of the message
	// [2]	it then emits to the server the "send-message"
	//		custom event, through its socket
	// [3]	next it add the message to conversation

	function sendMessage(partner, text) {
		socket.emit('send-message', { partner, text });

		addMessageToConversation({ partner, text, sender: id });
	}

	const exportValue = {
		games: formattedGames,
		selectedGame: formattedGames[selectedGameIndex],
		sendMessage,
		selectGameIndex: setSelectedGameIndex,
		createGame,
		deleteGame,
	};

	return (
		<GamesContext.Provider value={exportValue}>
			{children}
		</GamesContext.Provider>
	);
}
