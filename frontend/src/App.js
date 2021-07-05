import './fonts.css';
import './App.css';
import React, { useState } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import Header from './components/header comps/Header';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { FriendsProvider } from './contexts/FriendsProvider';
import { GamesProvider } from './contexts/GamesProvider';

function App() {
	const [player, setPlayer] = useState('');
	const [id, setId] = useLocalStorage('id');

	// everything in our dashboard has the friends/games context now bc we're providing it here
	const dashboard = (
		<FriendsProvider>
			<GamesProvider>
				<Dashboard id={id} />
			</GamesProvider>
		</FriendsProvider>
	);

	return (
		<div className='App'>
			<header>
				<Header />
			</header>
			<main>
				<>{id ? dashboard : <Login onIdSubmit={setId} />}</>
			</main>
		</div>
	);
}

export default App;
