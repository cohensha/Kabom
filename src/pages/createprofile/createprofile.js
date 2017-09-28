import React, {Component} from 'react';
import {Col, Row} from 'reactstrap';
import FormContainer from './FormContainer.js';
import Header from '../home/header.js';
import SideBar from '../home/sidebar/sidebar.js';

class CreateProfile extends Component {
    render() {
        return (
            
            // <div className="container">
            // 	<div className="columns">
            // 		<div className="col-md-9" centered>


            //             <Header/>
            //      	      <FormContainer/>
            //         </div>
            //          <Col sm={{ size: '3', offset: 1 }}>
            //             <SideBar />
            //         </Col>


        //route to create profile after first login

            // 	</div>
            // </div>

         <div>
            <br />
                <Header />
                    <br />
                    <Row>
                        <Col sm="16" md={{size: 8}}>
                        <div className="ml-3 d-inline-block">
                            <FormContainer/>
                        </div>
                        </Col>
                        <Col sm={{ size: '2', offset: 2 }}>
                        <SideBar />
                        </Col>
                    </Row>
        </div>
        );
    }
}


export default CreateProfile;
