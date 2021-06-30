import React, { useState } from 'react';
import { Cross as Hamburger } from 'hamburger-react';

function Burger(isOpen, setOpen) {
	return (
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
	);
}
export default Burger;
