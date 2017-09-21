import React, {Component} from 'react';
import { auth, database } from '../../config/constants';
import { Button, form, FormGroup, Label, Input, FormText, ButtonGroup} from 'reactstrap';


class FormContainer extends Component {


	constructor(props) {
		super(props);

		this.state = {
			rolesSelected: [0,0,0],
			data: "haven't clicked a button"
			
		};
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.onButtonPress = this.onButtonPress.bind(this);
		
		var user = auth().currentUser;
		var name, email, photoUrl, uid, emailVerified;

		if (user != null) {
		  email = user.email;

		  uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
		                   // this value to authenticate with your backend server, if
		                   // you have one. Use User.getToken() instead.

		 this.setState({userData: {
		 	userUID: user,
		 	userEmail: email
		 }})
		}
	}

	mountComponent() {
		//get data we want to submit


	}

	handleFormSubmit() {

	}

	handleClearForm() {

	}

	onButtonPress(e) {
		this.setState({data: "clicked a button.."})
	}


	render() {



		return (

			<div id="form">
				<h3> Create a New Profile, {this.state.userData.userUID} </h3>

				<ButtonGroup>
					<Button onClick={this.onButtonPress}>Designer</Button>
					<Button>Developer</Button>
					<Button>Product</Button>				
				</ButtonGroup>

				<h4>{this.state.data}</h4>



		    </div>


		 );

	}
}

export default FormContainer;


