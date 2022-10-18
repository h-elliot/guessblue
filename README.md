# guessblue? (or: guesshue?)

## A two-player color-guessing game.

Two players connect and start with a shared score of 100. Player 1 has a color randomly chosen. They send three clues about the color to Player 2 (without using color names*). Player 2 inputs their color guess on a color wheel input, and they have points deducted from their total score equal to the difference between the two colors.

(*blocked words: black, white, grey, red, orange, yellow, green, blue, purple, violet, pink, magenta, cyan, brown

## MVP

- Players can connect to each other
- Game presents randomized color
- Player 1 can send clues (filtered by blocked hue names)
- Player 2 can input a guess and check it
- Game displays correct color
- Game scores the round
- Next round starts automatically

### Extended functionality:

- Players can skip colors
- Player 1 can edit their clues
- Live chat
- Rooms
- Leaderboard
- Color image search (for clue ideas)

## User Stories

As a player, I would like:

- to be able to invite another person to play a game with me.
- a simple design that isn't distracting.
- to know what my score is.
- to be able to type out my own clues.
- to pick my color guess on a wheel.
- to know the correct color after guessing incorrectly.
- to see what color my partner guessed.
- to see the number of point deducted on a miss.
- to see a message when I win or lose.
- to see high scores.

## Userflow

![guessblue-userflow](https://media.git.generalassemb.ly/user/35742/files/dc56d080-d8fb-11eb-8e1d-198a6c5e1ff4)

## Wireframes

![guessblue player1](https://media.git.generalassemb.ly/user/35742/files/eed10a00-d8fb-11eb-9eba-2cd58b5dea10)

![guessblue player2](https://media.git.generalassemb.ly/user/35742/files/f85a7200-d8fb-11eb-9171-df031d451ee5)
