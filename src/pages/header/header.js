import React from 'react';
import './header-style.css';

import {Navbar, NavItem, NavLink, Nav} from 'reactstrap';


const Header = () => (
    <div id="header-comp">
        <Navbar>
            <Nav>
            <h1 href="/" className="d-inline-block">Kabom</h1>
                <NavItem className="ml-auto">
                    <NavLink className="txt" href="/login">Profile</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className="txt" href="/">Home</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className="txt" href="/login">Sign Out</NavLink>
                </NavItem>
            </Nav>
        </Navbar>
    </div>
);

export default Header;