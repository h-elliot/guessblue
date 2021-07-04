import React, { useState } from 'react';
import '../styles/Header.css';
import { Cross as Hamburger } from 'hamburger-react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	NavLink,
} from 'react-router-dom';
import Nav from './Nav';

function Header() {
	// setState for the hamburger nav
	const [isOpen, setOpen] = useState(false);

	return (
		<>
			<header>
				<h1 className='logo'>
					guess<span>blue?</span>
				</h1>
				<Hamburger
					toggled={isOpen}
					toggle={setOpen}
					isOpen={isOpen}
					onToggle={(toggled) => {
						if (toggled) {
							setOpen(true);
						} else {
							setOpen(false);
						}
					}}
					direction='left'
					color='turquoise'
					rounded
					distance='lg'
					size={42}
					label='Show menu'
				/>
			</header>
			<br />
			<nav style={{ display: isOpen ? 'block' : 'none' }}>
				<Nav />
			</nav>
		</>
	);
}

export default Header;
