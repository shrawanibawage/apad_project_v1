import React from 'react';
import {
Nav,
NavLink,
Bars,
NavMenu,
NavBtn,
NavBtnLink,
} from './navbarelements';

const Navbar = () => {
return (
	<>
	<div>
	<Nav>
		<Bars />
		<NavMenu>
		<NavLink to='/home' activeStyle>
			Home
		</NavLink>
		<NavLink to='/about' activeStyle>
			About
		</NavLink>
		<NavLink to='/register' activeStyle>
			Register
		</NavLink>
		<NavLink to='/login' activeStyle>
			Log In
		</NavLink>
		{/* Second Nav */}
		{/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
		</NavMenu>
	</Nav>
	</div>
	</>
);
};

export default Navbar;
