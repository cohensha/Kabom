import React, {Component} from 'react';
import { auth, database } from '../../config/constants';
import { Redirect } from 'react-router-dom';
import { Button, Form, FormGroup, Label,InputGroup, InputGroupAddon, Input, FormText, ButtonGroup} from 'reactstrap';


class FormContainer extends Component {


	constructor(props) {
		super(props);

		this.state = {
			rolesSelected: [0,0,0],
			data: "haven't clicked a button",
			skills: ['iOS', 'Java', 'JavaScript', 'C/C++', 'Node', 'Wireframing', 'Photoshop']
			
		};
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.onButtonPress = this.onButtonPress.bind(this);
		
		// var user = auth().currentUser;
		var name, email, photoUrl, uid, emailVerified;

		// if (user != null) {
		//   email = user.email;

		//   uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
		//                    // this value to authenticate with your backend server, if
		//                    // you have one. Use User.getToken() instead.

		//  this.setState({userData: {
		//  	userUID: user,
		//  	userEmail: email
		//  }})
		// }
	}


	handleFormSubmit() {

	}

	handleClearForm() {

	}

	onButtonPress(e) {
		this.setState({data: "clicked a button.."})
	}

	roleSelectionHandle(e) {

		 // alert('key: ', event.target.attributes.getNamedItem('data-key').value);
		 // this.setState({ role: e.target.value });
  	// 	 this.props.onChange(e.target.value);
	}




	render() {
		



		return (

			<Form id="form">
				<h3> Create your new profile</h3>

				<FormGroup row>
					<Label sm={4} for="username">Choose Profile picture</Label>
					 <InputGroup sm={6} id="username">
				        <InputGroupAddon sm={2} >@</InputGroupAddon>
				        <Input sm={4} placeholder="username" />
	     			 </InputGroup>
	     		</FormGroup>

     			  <FormGroup row>
			          <Label sm={4} for="exampleFile">Choose Profile picture</Label>
			          <Input  sm={6} type="file" name="file" id="exampleFile" />
       			 </FormGroup>

       			 <FormGroup row>
       			 	<Label sm={4} for="roleButtons">Which role do you fit?</Label>

					<ButtonGroup sm={6} id="roleButtons" onClick={this.roleSelectionHandle.bind(this)} >
						<Button onClick={this.onButtonPress} data-key='1' name="Designer">Designer</Button>
						<Button>Developer</Button>
						<Button>Product</Button>				
					</ButtonGroup>
				</FormGroup>

				<FormGroup row>
					<Label sm={4} for="skillChecks">What skills do you have?</Label>
						<FormGroup sm={3}>
					          <FormGroup check>
					            <Label check>
					              <Input type="radio" name="radio1" />{''}
					               {this.state.skills[0]}</Label>
					          </FormGroup>

					          <FormGroup check>
					            <Label check>
					              <Input type="radio" name="radio1" />{' '}
					              {this.state.skills[1]}
					            </Label>
					          </FormGroup>

					          <FormGroup check>
					            <Label check>
					              <Input type="radio" name="radio1" />{' '}
					              {this.state.skills[3]}
					            </Label>
					          </FormGroup>

					          <FormGroup check>
					            <Label check>
					              <Input type="radio" name="radio1" />{' '}
					              {this.state.skills[4]}
					            </Label>
					          </FormGroup>
					    </FormGroup>
					    <FormGroup sm={3}>


					          <FormGroup check>
					            <Label check>
					              <Input type="radio" name="radio1" />{' '}
					              {this.state.skills[5]}
					            </Label>
					          </FormGroup>

					          <FormGroup check>
					            <Label check>
					              <Input type="radio" name="radio1" />{' '}
					              {this.state.skills[6]}
					            </Label>
					          </FormGroup>
					    </FormGroup>
					    



				 </FormGroup>

				  <FormGroup row >

					          <Button sm={3} onClick={this.handleFormSubmit}>
					          	Go to Homepage
					          </Button>
					    </FormGroup>


		    </Form>


		 );

	}
}

export default FormContainer;


