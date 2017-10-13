import React, {Component} from 'react';
import {Col, Row} from 'reactstrap';
import FormContainer from './FormContainer.js';
import Header from '../header/header.js';
import SideBar from '../sidebar/sidebar.js';

class CreateProfile extends Component {

    render() {
        return (
            <div>
                <br />
                <Header />
                <br />
                <Row>
                    <Col xs="16" md={{size: 8}}>
                    <div className="ml-3 d-inline-block">
                        <FormContainer />
                    </div>
                    </Col>
                    <Col xs={{ size: '2', offset: 2 }}>
                    <SideBar />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default CreateProfile;
