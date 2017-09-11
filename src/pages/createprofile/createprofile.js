import React, {Component} from 'react';
import FormContainer from './FormContainer.js';

class CreateProfile extends Component {
    render() {
        return (
            
            <div className="container">
            	<div className="columns">
            		<div className="col-md-9" centered>

            			<h3> Create a New Profile </h3>


 	     <FormContainer/>

            		</div>


            	</div>
            </div>
        );
    }
}


export default CreateProfile;
