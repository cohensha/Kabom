import React, {Component} from 'react';
import { Button, form, FormGroup, Label, Input, FormText, ButtonGroup} from 'reactstrap';

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


