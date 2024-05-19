import React, { FC, ReactNode } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';

interface MyNavLinkProps extends NavLinkProps {
	children: ReactNode;
}

const MyNavLink: FC<MyNavLinkProps> = ({ children, ...props }) => {
	return (
		<NavLink {...props}>
			{children}
		</NavLink>
	);
}

export default MyNavLink;
