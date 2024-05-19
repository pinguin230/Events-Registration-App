import React from 'react';
import logoImage from './../../../photos/ET-school Events Registration App (test task).jpg'
import MyNavLink from "../nav-bar/MyNavLink";

const Header = () => {
    return (
        <div>
            <MyNavLink to='/'> <img style={{height: "30px"}} src={logoImage} alt="logo"/>  </MyNavLink>
            Header
        </div>
    );
};

export default Header;