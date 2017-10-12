import React from 'react';

import {Navbar, NavItem, NavLink, Nav} from 'reactstrap';
import './style.css';


const Header = () => (
    <div>
        <Navbar id="header">
            <Nav>
            <h1 href="/" className="d-inline-block">Kabom</h1>
                <NavItem className="ml-auto">
                    <NavLink id="link" href="/login">Profile</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink id="link" href="/">Home</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink id="link" href="/login">Sign Out</NavLink>
                </NavItem>
            </Nav>
        </Navbar>
    </div>
);

export default Header;