import React, {Component} from 'react';
import { Button } from 'reactstrap';
import './style.css';

class Login extends Component {
    render() {
        return (
            <header id="header">
			<h1>Kabom</h1>
			<p>Find people to help you launch your next big thing.</p>

			<form id="login-form" method="post" action="">
				<input type="email" name="email" id="email" placeholder="Email" />
				<input type="password" name="password" id="password" placeholder="Password" />
				<Button color="primary">Log In</Button>{' '}
			</form>

			<form id="signup-form" method="post" action=""> 
				<input type="firstName" name="firstName" id="firstName" placeholder="First name" /> 
				<input type="lastName" name="lastName" id="lastName" placeholder="Last name" /> <br/>
				<input type="email" name="email" id="email" placeholder="Email" /> <br/>
				<input type="password" name="password" id="password" placeholder="New password" /> <br/>
				<Button color="success">Create Account</Button>{' '}
			</form>
		</header>
        );
    }
}

export default Login;
