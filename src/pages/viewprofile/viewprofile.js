import React, {Component} from 'react';
import {Col, Row} from 'reactstrap';
import Header from '../home/header.js';
import SideBar from '../home/sidebar/sidebar.js';

class ViewProfile extends Component {

	render() {


		return (

			<div>
				<Header/>

				<Row>
					<Col sm="16" md={{size: 8}}>
                        <div className="ml-3 d-inline-block">
                            <h1>Hello there</h1>
                        </div>
                        </Col>
					<Col sm={{ size: '2', offset: 2 }}>
						<SideBar/>
					</Col>
				</Row>

			</div>

		)
	}



}

export default ViewProfile;