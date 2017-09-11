import React, {Component} from 'react';
import { Button, form, FormGroup, Label, Input, FormText, ButtonGroup} from 'reactstrap'; 

/**********************LINKING TO FIREBASE FOR TESTING***/

var firebase = require("firebase");

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDGctU-d7Kbp10qjICbVsuNMQaZ82q3Nh0",
    authDomain: "kabom-3627c.firebaseapp.com",
    databaseURL: "https://kabom-3627c.firebaseio.com",
    projectId: "kabom-3627c",
    storageBucket: "kabom-3627c.appspot.com",
    messagingSenderId: "744303065823"
  };
  firebase.initializeApp(config);


  // Get a reference to the database service
  var database = firebase.database();


  //*****************************************************

class FormContainer extends Component {


	constructor(props) {
		super(props);

		this.handleFormSubmit = this.handleFormSubmit.bind(this);
	}

	mountComponent() {
		//get data we want to submit
		fetch(/*database call*/)
			.then(response => response.json() )
			.then(data => {

				this.setState({
					
					
				});

			});
	}

	handleFormSubmit() {

	}

	handleClearForm() {

	}


	render() {

		return (
				<ButtonGroup>
			        <Button>Left</Button>{' '}
			        <Button>Middle</Button>{' '}
			        <Button>Right</Button>	
		    	</ButtonGroup>


		 );

	}
}

export default FormContainer;


