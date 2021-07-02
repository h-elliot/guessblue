import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	NavLink,
} from 'react-router-dom';
import './styles/Nav.css';

function Nav() {
	return (
		<Router>
			<ul>
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
	);
}

export default Nav;
