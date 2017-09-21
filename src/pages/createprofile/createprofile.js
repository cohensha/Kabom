import React, {Component} from 'react';
import FormContainer from './FormContainer.js';
import Header from '../home/header.js';
import SideBar from '../home/sidebar/sidebar.js';

class CreateProfile extends Component {
    render() {
        return (
            
            <div className="container">
            	<div className="columns">
            		<div className="col-md-9" centered>


        <Header/>

 	     <FormContainer/>

            		</div>


            	</div>
            </div>
        );
    }
}


export default CreateProfile;
