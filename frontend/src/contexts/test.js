const formattedGames = games.map((game) => {
	console.log(`FG ` + game.gamePartner);
	const gamePartner = game.gamePartner.map((gamePartner) => {
		const friend = friends.find((friend) => {
			return friend.id === gamePartner;
		});
		const name = (friend && friend.name) || gamePartner;
		return { id: gamePartner, name };
	});
	return { ...game, gamePartner };
});
console.log(`formattedGames: ${formattedGames}`);
