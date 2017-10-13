import React, {Component} from 'react';
import {TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, Button} from 'reactstrap';


import Header from '../header/header';
import ProjectTab from './tabs/projectTab';
import PeopleTab from "./tabs/peopleTab";
import TeamTab from "./tabs/teamTab";
import { database, auth } from '../../firebase/constants';
import DisplayTab from "./tabs/displayTab";
import CreateTeamModal from '../modals/createTeamModal';
import CreateProjectModal from '../modals/createProjectModal';

import Sidebar from '../sidebar/sidebar';
import FormContainer from './FormContainer';

import { Redirect } from 'react-router-dom';


class Home extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.toggleCreateTeam = this.toggleCreateTeam.bind(this);
        this.checkIfUserCompletedProfile = this.checkIfUserCompletedProfile.bind(this);
        this.state = {
            completedProfile: true,
            activeTab: '1',
            projects: [],
            teams: [],
            people: [],
            showCreateTeamModal: false,
            showCreateProjectModal: false,
            currUid: auth().currentUser.uid,
        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    toggleCreateTeam() {
        this.setState({
            showCreateTeamModal: !this.state.showCreateTeamModal
        });
    }

    toggleCreateProject() {
        this.setState({
            showCreateProjectModal: !this.state.showCreateProjectModal
        });
    }

    componentWillMount() {
        console.log("poo ");
        this.checkIfUserCompletedProfile();
    }

    checkIfUserCompletedProfile() {

        var uid = auth().currentUser.uid;
        var reference = database.child("users/" + uid + "/createdProfile");


        reference.once("value").then(function (snapshot) {
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
                                    <DisplayTab id="1" type="projects"/>
                                    <DisplayTab id="2" type="teams"/>
                                    <DisplayTab id="3" type="users"/>
                                </TabContent>
                            </div>
                        </Col>
                        <Col sm={{size: '3', offset: 1}}>
                            <Sidebar uid={this.state.currUid || 'null rn'} teamclick={() => this.toggleCreateTeam()}
                                     projectclick={() => this.toggleCreateProject()}/>
                        </Col>
                    </Row>
                    <CreateTeamModal show={this.state.showCreateTeamModal}
                                     onclick={() => this.toggleCreateTeam()}
                                     uid={this.state.currUid}/>
                    <CreateProjectModal show={this.state.showCreateProjectModal}
                                        onclick={() => this.toggleCreateProject()}
                                        uid={this.state.currUid}/>
                </div>
            );
        }
    }
}

export default Home;
