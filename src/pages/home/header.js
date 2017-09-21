import React from 'react';
import './style.css';
import {Navbar, NavItem, NavLink, Nav} from 'reactstrap';


const Header = () => (
    <div>
        <Navbar className="topBar">
            <Nav>
            <h1 href="/" className="d-inline-block">Kabom</h1>
                <NavItem className="ml-auto">
                    <NavLink href="/login">Profile</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/">Home</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/login">Sign Out</NavLink>
                </NavItem>
            </Nav>
        </Navbar>
    </div>
);

export default Header;