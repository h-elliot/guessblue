import React, { useState } from 'react';
import './Header.css';
import { Cross as Hamburger } from 'hamburger-react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	NavLink,
} from 'react-router-dom';

function Header() {
	// setState for the hamburger nav
	const [isOpen, setOpen] = useState(false);

	function toggleMenu() {}

	return (
		<header>
			<h1>
				guess<span>blue?</span>
			</h1>
			<container id='hamburgerMenu'>
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
					label='Show menu'
				/>
				<Router>
					<ul style={{ display: isOpen ? 'block' : 'none' }}>
						<li>
							<Link to='/rules'>Rules</Link>
						</li>
						<li>
							<Link to='/invite'>New Game</Link>
						</li>
						<li>
							<Link to='/invite'>Invite</Link>
						</li>
						<li>
							<Link to='/leaderboard'>Leaderboard</Link>
						</li>
					</ul>
				</Router>
			</container>
		</header>
	);
}

export default Header;
