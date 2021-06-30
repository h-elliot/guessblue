import './fonts.css';
import './App.css';
import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import Header from './components/Header/Header';

function App() {
	const [player, setPlayer] = useState('');

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
			<main></main>
		</div>
	);
}

export default App;
