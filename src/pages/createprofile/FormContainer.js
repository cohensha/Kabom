import React, {Component} from 'react';
import { Button, form, FormGroup, Label, Input, FormText, ButtonGroup, DropdownItem, DropdownToggle, ButtonDropdown, DropdownMenu} from 'reactstrap'; 

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

		this.toggleU = this.toggleU.bind(this);
		this.state = {
			dropdownOpen: false
		};

		this.onCheckboxBtnClick = this.onCheckboxBtnClick.bind(this);
		this.state = { cSelected: [] };

	}

	toggleU() {
		this.setState({
			dropdownOpen: !this.dropdownOpen
		});
	}

	mountComponent() {
		//get data we want to submit
		fetch(/*database call*/)
			.then(response => response.json() )
			.then(data => {

				this.setState({
					roles: data.roles,
					universities: data.universities
					
				});

			});
	}

	handleFormSubmit() {

	}

	handleClearForm() {

	}


	  onCheckboxBtnClick(selected) {
		    const index = this.state.cSelected.indexOf(selected);
		    if (index < 0) {
		      this.state.cSelected.push(selected);
		    } else {
		      this.state.cSelected.splice(index, 1);
		    }
		    this.setState({ cSelected: [...this.state.cSelected] });
		  }

	render() {

		return (
				// <ButtonGroup>
			 //        <Button>Left</Button>{' '}
			 //        <Button>Middle</Button>{' '}
			 //        <Button>Right</Button>	
		  //   	</ButtonGroup>

		  <form className = "container" onSubmit={this.handleFormSubmit()}>


	  			<ButtonGroup className="role-buttons">
				        <Button>Developer</Button>{' '}
				        <Button>Product manager</Button>{' '}
				        <Button>Designer</Button>	
	    		</ButtonGroup>

	    		<br/>

	    		<ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
				    <DropdownToggle caret>
				          Button Dropdown
				    </DropdownToggle>
				    <DropdownMenu>
			          <DropdownItem header></DropdownItem>
			          <DropdownItem >University of Southern California</DropdownItem>
			          <DropdownItem>UCLA</DropdownItem>
			          <DropdownItem>Stanford University</DropdownItem>
				     </DropdownMenu>
     			</ButtonDropdown>



     			<div className="skillsButtons">
				     	<h5>Skills Buttons</h5>
				        <ButtonGroup>
				          <Button color="primary" onClick={() => this.onCheckboxBtnClick(1)} active={this.state.cSelected.includes(1)}>One</Button>
				          <Button color="primary" onClick={() => this.onCheckboxBtnClick(2)} active={this.state.cSelected.includes(2)}>Two</Button>
				          <Button color="primary" onClick={() => this.onCheckboxBtnClick(3)} active={this.state.cSelected.includes(3)}>Three</Button>
				        </ButtonGroup>
				        <p>Selected: {JSON.stringify(this.state.cSelected)}</p>
     			</div>
     		</form>
		    



     		// Button.propTypes = {
     		// 	active: propTypes.bool,
     		// 	color: propTypes.string,

     		// 	onClick: propTypes.func
     		// }




		 );

	}
}

export default FormContainer;


