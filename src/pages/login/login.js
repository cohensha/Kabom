import React, {Component} from 'react';
import { Button, UncontrolledAlert } from 'reactstrap';
import './style.css';
import { auth, database } from '../../config/constants';
import { Redirect } from 'react-router-dom';
class Login extends Component {

	constructor(props) {
    	super(props);
    	this.state = {
    		logInFailed : false,
    		createAccountFailed : false,
    		createAccountErrorMessage : "",
    		sentVerificationEmail : false,
    		verificationEmailError : false,
    		emailNotVerified : false,
			logInSuccess : false,
    	};
    	this.logIn = this.logIn.bind(this);
    	this.createAccount = this.createAccount.bind(this);
	}

	logIn() {
		var email = document.getElementById('loginEmail').value
		var password = document.getElementById('loginPassword').value
		auth().signInWithEmailAndPassword(email, password).then(function() {
			// Check if
			var user = auth().currentUser;
			if (user.emailVerified) {
				//ADDED
                this.setState({ logInSuccess : true });
			} else {
				this.setState({ emailNotVerified : true });
			}
		}.bind(this)).catch(function(error) {
			// Handle Errors here.
			this.setState({logInFailed : true });
		}.bind(this));
	}

	createAccount() {
		var email = document.getElementById('createEmail').value;
		var password = document.getElementById('createPassword').value;
		var firstName = document.getElementById('firstName').value;
		var lastName = document.getElementById('lastName').value;
		var hasLoggedIn = false;

		auth().createUserWithEmailAndPassword(email, password).then(function() {
			var user = auth().currentUser;
			var emailSent = true;
			user.sendEmailVerification().then(function() {
				// Email sent.
			}).catch(function(error) {
				// An error happened. Should never occur.
				emailSent = false;
			});
			if (!emailSent) {
				this.setState({ verificationEmailError : true });
			} else {
				this.setState({ sentVerificationEmail : true });

				// Add user to database
				database.child('users/' + user.uid).set({
					'first name': firstName,
					'last name': lastName,
					'email' : email,
					'hasLoggedIn': hasLoggedIn
				});
			}
		}.bind(this)).catch(function(error) {
			// Handle Errors here.
			this.setState({
				createAccountFailed : true,
				createAccountErrorMessage : error.message
			});
		}.bind(this));
	}


    render() {

        const { from } = this.props.location.state || { from: { pathname: '/' } }
        if (this.state.logInSuccess) {
			return ( <Redirect to={from}/> );
		}

        return (
            <header id="header">
				<h1>Kabom</h1>
				<p>Find people to help you launch your next big thing.</p>
				<h1> {this.state.logInSuccess && '1'} </h1>

				<form id="login-form" method="post" action="">
					<input type="email" name="email" id="loginEmail" placeholder="Email" />
					<input type="password" name="password" id="loginPassword" placeholder="Password" />
					<Button color="primary" onClick={this.logIn}>Log In</Button>{' '}
				</form>

				<form id="signup-form" method="post" action="">
					<input type="firstName" name="firstName" id="firstName" placeholder="First name" />
					<input type="lastName" name="lastName" id="lastName" placeholder="Last name" /> <br/>
					<input type="email" name="email" id="createEmail" placeholder="Email" /> <br/>
					<input type="password" name="password" id="createPassword" placeholder="New password" /> <br/>
					<Button color="success" onClick={this.createAccount}>Create Account</Button>{' '}
				</form>

				<UncontrolledAlert color="danger" isOpen={this.state.logInFailed}>
					<strong>Login Failed: </strong> Username or Password is incorrect.
				</UncontrolledAlert>

				<UncontrolledAlert color="danger" isOpen={this.state.createAccountFailed}>
			 		<strong>Create Account Failed: </strong> {this.state.createAccountErrorMessage}
			 	</UncontrolledAlert>

			 	<UncontrolledAlert color="success" isOpen={this.state.sentVerificationEmail}>
			 		<strong>Account Created: </strong> Please verify your email before logging in.
			 	</UncontrolledAlert>

			 	<UncontrolledAlert color="warning" isOpen={this.state.emailNotVerified}>
			 		<strong>Login Failed: </strong> Please verify your email before logging in.
			 	</UncontrolledAlert>

			 	<UncontrolledAlert color="warning" isOpen={this.state.verificationEmailError}>
			 		<strong>Error Sending Email: </strong> Something went wrong with sending the verification email. Please try creating an account again.
			 	</UncontrolledAlert>

			</header>
        );
    }
}

export default Login;
