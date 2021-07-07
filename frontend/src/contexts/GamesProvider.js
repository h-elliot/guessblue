import React, { useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { useFriends } from './FriendsProvider';

const GamesContext = React.createContext();

export function useGames() {
	return useContext(GamesContext);
}

export function GamesProvider({ children }) {
	const [games, setGames] = useLocalStorage('games', []);
	// key: 'games', value: [];
	const { friends } = useFriends();

	function createGame(partner) {
		console.log(partner);
		setGames((prevGames) => {
			console.log(...prevGames, { partner, messages: [] });
			return [...prevGames, { partner, messages: [] }];
		});
	}

	// console.log('init formattedGames');
	// const formattedGames1 = games.map((game) => {
	// 	console.log('init forEach(friend)');
	// 	friends.forEach((friend) => {
	// 		console.log(`gamePartner: ` + game.gamePartner);
	// 		console.log('init if (friend.id)');
	// 		if (friend.id === game.gamePartner) {
	// 			console.log('we made it to the top!');
	// 			const partnerId = game.gamePartner;
	// 			console.log(`partnerId: ` + partnerId);
	// 			const partnerName = friend.name;
	// 			console.log(`partnerName: ` + partnerName);
	// 			const messages = games.messages;
	// 			console.log(`messages: ` + messages);
	// 			return {
	// 				partnerId: game.gamePartner,
	// 				partnerName: friend.name,
	// 				messages: game.messages,
	// 			};
	// 		}
	// 	});
	// });

	const formattedGames2 = games.map((game) => {
		const gamePartner = (partner) => {
			const friend = friends.find((friend) => {
				console.log(friend.id === partner);
				return friend.id === partner;
			});
			const name = (friend && friend.name) || gamePartner;
			return { id: gamePartner, name };
		};
		return { ...game, gamePartner };
	});

	const formattedGames3 = games.map((singleGame) => {
		// for each single game,
		// find the friend.id that === partner
		// find the friend's name
		// save that name to gamePartner as a new property
	});

	console.log(`formattedGames: ${formattedGames}`);

	// [object Object],[object Object],[object Object]

	const arrayOfKeyValues = {};

	// function consoleCheck() {
	// 	console.log(`formattedGames:`);
	// 	console.log(formattedGames);
	// 	console.log(`games.gamePartner:`);
	// 	console.log(games.gamesPartner);
	// }

	// const formattedGames = games.map((game) => {
	// 	const gamePartner = game.gamePartner.forEach((gamePartner) => {
	// 		const friend = friends.find((friend) => {
	// 			return friend.id === gamePartner;
	// 		});
	// 		const name = (friend && friend.name) || gamePartner;
	// 		return { id: gamePartner, name };
	// 	});
	// 	return { ...game, gamePartner };
	// });

	return (
		<GamesContext.Provider value={{ createGame, games, formattedGames }}>
			{children}
		</GamesContext.Provider>
	);
}
