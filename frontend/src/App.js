import './fonts.css';
import './App.css';
import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import useLocalStorage from './hooks/useLocalStorage';
import Header from './components/Header';
import ClueInput from './components/Seer/ClueInput';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
	const [player, setPlayer] = useState('');
	const [id, setId] = useLocalStorage('id');
	const routes = [
		{
			path: '/',
			exact: true,
			sidebar: () => <div>home!</div>,
			main: () => <h2>Home</h2>,
		},
		{
			path: '/bubblegum',
			sidebar: () => <div>bubblegum!</div>,
			main: () => <h2>Bubblegum</h2>,
		},
		{
			path: '/shoelaces',
			sidebar: () => <div>shoelaces!</div>,
			main: () => <h2>Shoelaces</h2>,
		},
	];

	return (
		<div className='App'>
			<header>
				<Header />
			</header>
			<main>
				<>{id ? <Dashboard id={id} /> : <Login onIdSubmit={setId} />}</>
			</main>
		</div>
	);
}

export default App;
