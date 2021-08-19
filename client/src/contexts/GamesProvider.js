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

	//? =====================================================

	function createGame(partner, partnerName, players, gameId) {
		setGames((prevGames) => {
			return [
				...prevGames,
				{ gameId, players, partner, partnerName, messages: [] },
			];
		});
	}
	for (let i = 0; i < games.length; i++) {
		games[i].index = [i];
	}

	//? =====================================================

	function deleteGame(gameToDelete) {
		console.log(`gameId: ${gameToDelete}`);
		console.log(`game info: \n ${games.hasOwnProperty()}`);

		const freshNewGames = games.filter(
			(game) => game['gameId'] !== gameToDelete
		);

		setGames(freshNewGames);
	}

	//todo =================================================================
	//todo =================================================================

	// const addMessageToGame = useCallback(
	// 	({ players, text, gameId, sender }) => {
	// 		setGames((prevGames) => {
	// 			console.log(`adding message to convo`);

	// 			let gameMatches = false; // this is a new game
	// 			const newMessage = { sender, text };

	// 			const thisGame = games.find(({ gameId }) => gameId === gameId);
	// 			if (!thisGame) {
	// 				gameMatches = true; // this game is being added to
	// 			}
	// 			console.log(`thisGame: ${JSON.stringify(thisGame)}`);
	// 			console.log(`gameMatches: ${gameMatches}`);

	// 			const updatedGames = prevGames.map((game) => {
	// 				if (gameMatches) {
	// 					return {
	// 						...game,
	// 						messages: [...game.messages, newMessage],
	// 					};
	// 				}
	// 				return game;
	// 			});

	// 			const newGame = prevGames.map((game) => {
	// 				const partner = sender;
	// 				const friend = friends.find((friend) => friend.id === partner);
	// 				const partnerName = (friend && friend.name) || 'unnamed';
	// 				console.log(`partnerName: ${partnerName}`);

	// 				return [
	// 					...prevGames,
	// 					{
	// 						players,
	// 						gameId,
	// 						partner,
	// 						partnerName,
	// 						sender,
	// 						messages: [newMessage],
	// 					},
	// 				];
	// 			});

	// 			if (gameMatches) {
	// 				return updatedGames;
	// 			} else {
	// 				return [...prevGames, { players, messages: [newMessage] }];
	// 			}
	// 		});
	// 	},
	// 	[setGames]
	// );

	const addMessageToGame = useCallback(
		({ players, text, gameId, sender }) => {
			setGames((prevGames) => {
				let gameMatches = false;
				const newMessage = { sender, text };
				const updatedGames = prevGames.map((game) => {
					if (arrayEquality(game.players, players)) {
						gameMatches = true;
						return {
							...game,
							messages: [...game.messages, newMessage],
						};
					}

					return game;
				});

				if (gameMatches) {
					return updatedGames;
				} else {
					const partner = sender;
					const friend = friends.find((friend) => {
						return friend.id === partner;
					});
					const partnerName = (friend && friend.name) || sender;
					return [
						...prevGames,
						{
							players,
							gameId,
							players,
							partner,
							partnerName,
							messages: [newMessage],
						},
					];
				}
			});
		},
		[setGames]
	);

	//? =====================================================

	useEffect(() => {
		if (!socket) {
			return;
		}
		// when the socket receives-message, add it to convo
		socket.on('receive-message', addMessageToGame);

		return () => socket.off('receive-message');
	}, [socket, addMessageToGame]);

	//? =====================================================

	// players = [selectedGame.partner, id];
	function sendMessage(players, text, gameId) {
		socket.emit('send-message', { players, text, gameId });

		addMessageToGame({
			players,
			text,
			gameId,
			sender: id,
		});
	}

	//todo =================================================================
	//todo =================================================================

	// const formattedGames = games.map((game, index) => {
	// 	const messages = game.messages.map((message) => {
	// 		const name = game.partnerName || message.sender;
	// 		const fromMe = id === message.sender; // boolean

	// 		return { ...message, name, fromMe };
	// 	});

	// 	const selected = index === selectedGameIndex;

	// 	return { ...game, messages, selected };
	// });

	const formattedGames = games.map((game, index) => {
		const players = game.players.map((player) => {
			const friend = friends.find((friend) => {
				return friend.id === player;
			});
			const name = (friend && friend.name) || player;
			return { id: player, name };
		});

		const messages = game.messages.map((message) => {
			const friend = friends.find((friend) => {
				return friend.id === message.sender;
			});
			const name = (friend && friend.name) || message.sender;
			const fromMe = id === message.sender;
			return { ...message, partnerName: name, fromMe };
		});

		const selected = index === selectedGameIndex;
		return { ...game, messages, players, selected };
	});

	//? =====================================================

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

//todo =================================================================
//todo =================================================================

function arrayEquality(a, b) {
	if (a.length !== b.length) return false;

	a.sort();
	b.sort();

	return a.every((player, index) => {
		return player === b[index];
		// if every element of array A is equal to
		// every element of array B at the same index,
		// the arrays are equal
	});
}
