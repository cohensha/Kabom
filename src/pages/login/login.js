import React, {Component} from 'react';

import { Button, Alert, Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col,
    InputGroup, InputGroupAddon, Input, Jumbotron} from 'reactstrap';

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
			createdProfile: false,
			completedProf: true,
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
		if (!email.endsWith("@usc.edu")) {
			email+="@usc.edu"
		}
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
        var confirmPassword = document.getElementById('confirmPassword').value;
		var firstName = document.getElementById('firstName').value;
		var lastName = document.getElementById('lastName').value;

		if(firstName == "" || lastName == ""){
            this.showRedAlert("Please enter your first and last name.", "");
		} else if (email=="") {
            this.showRedAlert("Please enter your USC email.", "");
        } else if(password == "") {
            this.showRedAlert("Please enter a password", "");
        } else if(password != confirmPassword) {
            this.showRedAlert("Passwords do not match.", "");
		} else {
            if (!email.endsWith("@usc.edu")) {
                email+="@usc.edu"
            }
            // Firebase Auth Create User
            auth().createUserWithEmailAndPassword(email, password).then(function() {
                var user = auth().currentUser;
                user.sendEmailVerification().then(function() {
                    // Write new user to the users database
                    database.child("users/" + user.uid + "/email").set(email);
                    database.child("users/" + user.uid + "/firstName").set(firstName);
                    database.child("users/" + user.uid + "/lastName").set(lastName);
                    database.child("users/" + user.uid + "/createdProfile").set(false);

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

	componentWillUnmount() {
        var user = auth().currentUser;

        database.child("users/" + user.uid + "/email").off();
        database.child("users/" + user.uid + "/firstName").off();
        database.child("users/" + user.uid + "/lastName").off();
	}

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } };
        
        if (this.state.logInSuccess) {
            return ( <Redirect to={from}/> );
		}

        return (
			<Container id="container">
				<Row id="header" >
					<Col xs="5">
						<h1>kabom <small><sub>Unify to solve</sub></small></h1>
					</Col>
					<Col xs="auto">
						<Row id="login">
							<Col xs="auto">
								<InputGroup>
									<Input placeholder="username" type="email" name="email" id="loginEmail" />
									<InputGroupAddon>@usc.edu</InputGroupAddon>
								</InputGroup>
							</Col>
							<Col xs="auto">
								<InputGroup>
									<Input placeholder="password" type="password" name="password" id="loginPassword"/>
								</InputGroup>
							</Col>
							<Col xs="auto">
								<Button outline color="warning" onClick={this.signIn}>Sign In</Button>{' '}
							</Col>
							<Col xs="auto">
								<Button color="link" id="forgotPassword" onClick={this.toggle}> Forgot Password?
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
								</Button>
							</Col>
						</Row>
					</Col>
				</Row>

				<Alert color="danger" isOpen={this.state.showRedAlert} toggle={this.dismissRed}>
					<strong>{this.state.redAlertHeader} </strong> {this.state.redAlertMessage}
				</Alert>

				<Alert color="warning" isOpen={this.state.showYellowAlert} toggle={this.dismissYellow}>
					<strong>{this.state.yellowAlertHeader} </strong> {this.state.yellowAlertMessage}
				</Alert>

				<Alert color="success" isOpen={this.state.showGreenAlert} toggle={this.dismissGreen}>
					<strong>{this.state.greenAlertHeader} </strong> {this.state.greenAlertMessage}
				</Alert>

				<Row id="body">
					<Col xs="8">
						<div>
							<Jumbotron>
								<h1 className="display-4">Project collaboration made easier.</h1>
								<p className="lead">
									Kabom connects USC students of all backgrounds to collaborate on student projects.
									Whether you have a project in mind or you just want to join in on a side project,
									find the team of developers, designers, project managers, and whoever else you need
									to make an amazing project.
								</p>
								<p className="lead">
									<Button color="primary">Learn More</Button>
								</p>
								<hr className="my-2" />
								<p><strong>Fun fact:</strong> kabom /kəˈbo͞om/ means <i>unity</i> in Twi, one of the many languages spoken in Ghana.</p>
							</Jumbotron>
						</div>
					</Col>

					<Col id="signUpCol" xs="4">
						<h1 className="display-5" >Sign Up</h1>

						<div id="signUp">
							<Input type="firstName" name="firstName" id="firstName" placeholder="First Name" />
							<Input type="lastName" name="lastName" id="lastName" placeholder="Last Name" />
							<InputGroup>
								<Input type="email" name="email" id="createEmail" placeholder="Username" />
								<InputGroupAddon>@usc.edu</InputGroupAddon>
							</InputGroup>
							<Input type="password" name="password" id="createPassword" placeholder="Password" />
							<Input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password" />
							<Button color="success" onClick={this.createAccount}>Create Account</Button>{' '}
						</div>
					</Col>

				</Row>

				<Row id="bottom">
					<Col>
						<p> Made at the University of Southern California
							<br>
							</br>
							Professor Miller is the best!
						</p>

					</Col>
				</Row>

			</Container>
        );
    }
}

export default Login;
