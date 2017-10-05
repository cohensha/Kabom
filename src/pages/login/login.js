import React, {Component} from 'react';
import { Button, Alert, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './style.css';

import { auth, database} from '../../firebase/constants';
import { Redirect } from 'react-router-dom';
class Login extends Component {

	constructor(props) {
    	super(props);
    	this.state = {
    		showRedAlert : false,
    		showYellowAlert : false,
    		showGreenAlert : false,
    		redAlertHeader : "",
    		redAlertMessage : "",
    		yellowAlertHeader : "",
    		yellowAlertMessage : "",
    		greenAlertHeader : "",
    		greenAlertMessage : "",
			logInSuccess : false,
			nestedModal: false,
			createdProfile: false
    	};
		this.signIn = this.signIn.bind(this);
		this.createAccount = this.createAccount.bind(this);
		this.toggle = this.toggle.bind(this);
		this.toggleNested = this.toggleNested.bind(this);
		this.dismissRed = this.dismissRed.bind(this);
		this.dismissGreen = this.dismissGreen.bind(this);
		this.dismissYellow = this.dismissYellow.bind(this);
		this.showRedAlert = this.showRedAlert.bind(this);
		this.showYellowAlert = this.showYellowAlert.bind(this);
		this.showGreenAlert = this.showGreenAlert.bind(this);
		this.forgotPassword = this.forgotPassword.bind(this);
	}

	toggle() {
	    this.setState({
	      modal: !this.state.modal
	    });
	 }

	toggleNested() {
		this.setState({
		  nestedModal: !this.state.nestedModal
		});
	}

	dismissRed() {
		this.setState({ showRedAlert: false });
	}

	dismissYellow() {
		this.setState({ showYellowAlert: false });
	}

	dismissGreen() {
		this.setState({ showGreenAlert: false });
	}

	showRedAlert(header, message) {
		this.setState({ 
			showRedAlert : true,
			redAlertHeader : header,
			redAlertMessage : message
		});
	}

	showYellowAlert(header, message) {
		this.setState({ 
			showYellowAlert : true,
			yellowAlertHeader : header,
			yellowAlertMessage : message
		});
	}

	showGreenAlert (header, message) {
		this.setState({ 
			showGreenAlert : true,
			greenAlertHeader : header,
			greenAlertMessage : message
		});
	}

	signIn() {
		var email = document.getElementById('loginEmail').value
		var password = document.getElementById('loginPassword').value
		// Firebase Auth Sign In
		auth().signInWithEmailAndPassword(email, password).then(function() {
			var user = auth().currentUser;
			if (user.emailVerified) {
				this.setState({ logInSuccess : true });
			} else {
				this.showYellowAlert ("Sign In Failed: ", "Please verify your email before signing in.");
			}
		}.bind(this)).catch(function(error) {
			this.showRedAlert("Sign In Failed: ", error.message);
		}.bind(this));	
	}

	createAccount() {
		var email = document.getElementById('createEmail').value;
		var password = document.getElementById('createPassword').value;
		var firstName = document.getElementById('firstName').value;
		var lastName = document.getElementById('lastName').value;
		
		// Firebase Auth Create User
		auth().createUserWithEmailAndPassword(email, password).then(function() {
			var user = auth().currentUser;
			//var _this = this;
			user.sendEmailVerification().then(function() {
				// Write new user to the users database
				database.child("users/" + user.uid + "/email").set(email);
				database.child("users/" + user.uid + "/firstName").set(firstName);
				database.child("users/" + user.uid + "/lastName").set(lastName);

				// Green alert: user a verification email has been sent
				this.showGreenAlert ("Your account has been created!", 
					"An verification email has been sent. Please verify before logging in.");
			}.bind(this)).catch(function(error) {
				// An error happened. Should never occur.
				this.showRedAlert("Email Verification Failed: ", error.message);
			}.bind(this));
		}.bind(this)).catch(function(error) {
			this.showRedAlert("Create Account Failed: ", error.message);
		}.bind(this));
	}

	forgotPassword() {
		var email = document.getElementById('forgotPassEmail').value;
		this.toggle();
		auth().sendPasswordResetEmail(email).then(function() {
			this.showGreenAlert ("Reset Password Email Sent: ", 
				"Please check your email to reset your password.");
		}.bind(this)).catch(function(error) {
			this.showRedAlert("Reset Password Failed: ", error.message);
		}.bind(this));
	}

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } }
        
        if (this.state.logInSuccess) {
			
			if(this.state.completedProf == true) {
				return ( <Redirect to={from}/> );
			}
			else {
				return (<Redirect to={{
							  pathname: '/createprofile' }}/> );
			}
		}

        return (
        	<div id="div">
        	<Row>
	            <header id="header">
					<h1>kabom</h1>
					<h3> 
						<Alert color="danger" isOpen={this.state.showRedAlert} toggle={this.dismissRed}>
							<strong>{this.state.redAlertHeader} </strong> {this.state.redAlertMessage}
						</Alert> 

						<Alert color="warning" isOpen={this.state.showYellowAlert} toggle={this.dismissYellow}>
							<strong>{this.state.yellowAlertHeader} </strong> {this.state.yellowAlertMessage}
						</Alert>

						<Alert color="success" isOpen={this.state.showGreenAlert} toggle={this.dismissGreen}>
							<strong>{this.state.greenAlertHeader} </strong> {this.state.greenAlertMessage}
						</Alert>
					</h3>
					
					<h1> {this.state.logInSuccess && '1'} </h1>

					<form id="login-form" method="post" action="">
						<input type="email" name="email" id="loginEmail" placeholder="Email" />
						<input type="password" name="password" id="loginPassword" placeholder="Password" />
						
						<div>
					<Button color="primary" onClick={this.signIn}>Log In</Button>{' '} 
					</div>


					<div id="forgotPassword" onClick={this.toggle}>Forgot Password?
						<Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
						<ModalHeader toggle={this.toggle}>Find Your Account</ModalHeader>
						<ModalBody>
							Enter your email to reset your password.<br />
							<input id = "forgotPassEmail" type="email" name="email" placeholder="Email" />
							<Modal isOpen={this.state.nestedModal} toggle={this.toggleNested}>
							</Modal>
						</ModalBody>
						
						<ModalFooter>
							<Button color="primary" onClick={this.forgotPassword}>Reset Password</Button>{' '}
							<Button color="secondary" onClick={this.toggle}>Cancel</Button>
						</ModalFooter>
						</Modal>
					</div>
					</form>

					
				</header>
				</Row>
					<Row>
						<Col>
							Find your team
						</Col>

						<Col>
							<form id="signup-form" method="post" action="">
								<h1> Sign up </h1> <br/>
								<input type="firstName" name="firstName" id="firstName" placeholder="First name" /> <br/>
								<input type="lastName" name="lastName" id="lastName" placeholder="Last name" /> <br/>
								<input type="email" name="email" id="createEmail" placeholder="Email" /> <br/>
								<input type="password" name="password" id="createPassword" placeholder="New password" /> <br/>
								<Button color="success" onClick={this.createAccount}>Create Account</Button>{' '}
							</form>
						</Col>

					</Row>

					
			</div>
        );
    }
}

export default Login;
