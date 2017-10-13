import React, {Component} from 'react';
import {TabContent, TabPane, Nav, NavItem, NavLink, Row, Col} from 'reactstrap';

import Header from './header';
import ProjectTab from './tabs/projectTab';
import PeopleTab from "./tabs/peopleTab";
import TeamTab from "./tabs/teamTab";
import Sidebar from './sidebar/sidebar';
import FormContainer from './FormContainer';
import {auth, database} from "../../firebase/constants";
import { Redirect } from 'react-router-dom';



class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: '1',
            completedProfile : true,
        };

        this.toggle = this.toggle.bind(this);
        this.checkIfUserCompletedProfile = this.checkIfUserCompletedProfile.bind(this);

    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    componentWillMount() {
        console.log("poo ");
        this.checkIfUserCompletedProfile();
    }

    checkIfUserCompletedProfile () {

        var uid = auth().currentUser.uid;
        var reference = database.child("users/"+uid+"/createdProfile");


        reference.once("value").then(function(snapshot) {
            console.log("completed profile: " + snapshot.val());
            if (!snapshot.exists() || !snapshot.val()) {

                this.setState({completedProfile: false});
            }
        }.bind(this));
    }

    render() {
        const {from} = this.props.location.state || {from: {pathname: '/createprofile'}}

        if (!this.state.completedProfile) {
            return ( <Redirect to={from}/> );
        } else {
            // Create Profile if the completedProfile variable is not found or is false
            return (
                <div>
                    <Header/>
                    <Row>
                        <Col sm="12" md={{size: 8}}>
                            <div className="ml-3 d-inline-block">
                                <Nav tabs>
                                    <NavItem>
                                        <NavLink
                                            className="{ active: this.state.activeTab === '1' }"
                                            onClick={() => {
                                                this.toggle('1');
                                            }}
                                        >
                                            Projects
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className="{ active: this.state.activeTab === '2' }"
                                            onClick={() => {
                                                this.toggle('2');
                                            }}
                                        >
                                            Teams
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className="{ active: this.state.activeTab === '3' }"
                                            onClick={() => {
                                                this.toggle('3');
                                            }}
                                        >
                                            People
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                                <TabContent activeTab={this.state.activeTab}>
                                    <ProjectTab id="1"/>
                                    <TeamTab id="2"/>
                                    <PeopleTab id="3"/>
                                </TabContent>
                            </div>
                        </Col>
                        <Col sm={{size: '3', offset: 1}}>
                            <Sidebar/>
                        </Col>

                    </Row>
                </div>
            );
        }
    }
}

export default Home;
