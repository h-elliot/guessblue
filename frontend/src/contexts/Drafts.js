//*  == FORMATTED GAMES ==

const formattedGames3 = games.map((singleGame) => {
	// for each single game,
	// find the friend.id that === partner
	// find the friend's name
	// save that name to gamePartner as a new property
});

console.log('init formattedGames');
const formattedGames2 = games.map((game) => {
	console.log('init forEach(friend)');
	friends.forEach((friend) => {
		console.log(`gamePartner: ` + game.gamePartner);
		console.log('init if (friend.id)');
		if (friend.id === game.gamePartner) {
			console.log('we made it to the top!');
			const partnerId = game.gamePartner;
			console.log(`partnerId: ` + partnerId);
			const partnerName = friend.name;
			console.log(`partnerName: ` + partnerName);
			const messages = games.messages;
			console.log(`messages: ` + messages);
			return {
				partnerId: game.gamePartner,
				partnerName: friend.name,
				messages: game.messages,
			};
		}
	});
});

// function consoleCheck() {
// 	console.log(`formattedGames:`);
// 	console.log(formattedGames);
// 	console.log(`games.gamePartner:`);
// 	console.log(games.gamesPartner);
// }

const formattedGames1 = games.map((game) => {
	const gamePartner = game.gamePartner.forEach((gamePartner) => {
		const friend = friends.find((friend) => {
			return friend.id === gamePartner;
		});
		const name = (friend && friend.name) || gamePartner;
		return { id: gamePartner, name };
	});
	return { ...game, gamePartner };
});
