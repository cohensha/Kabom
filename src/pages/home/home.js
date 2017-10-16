import React, {Component} from 'react';
import {TabContent, Nav, NavItem, NavLink, Row, Col} from 'reactstrap';


import Header from '../header/header';
import ProjectTab from './tabs/projectTab';
import PeopleTab from "./tabs/peopleTab";
import TeamTab from "./tabs/teamTab";
import { database, auth } from '../../firebase/constants';
import DisplayTab from "./tabs/displayTab";
import CreateTeamModal from '../modals/createTeamModal';
import CreateProjectModal from '../modals/createProjectModal';

import Sidebar from '../sidebar/sidebar';

import { Redirect } from 'react-router-dom';


class Home extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.toggleCreateTeam = this.toggleCreateTeam.bind(this);
        this.checkIfUserCreatedProfile = this.checkIfUserCreatedProfile.bind(this);
        this.state = {
            createdProfile: false,
            activeTab: '1',
            projects: [],
            teams: [],
            people: [],
            showCreateTeamModal: false,
            showCreateProjectModal: false,
            currUid: auth().currentUser.uid,
        };
    }

    // TODO: Issue with data persistence. See GitHub
    getInitialState () {

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

    componentDidMount() {
        console.log("In didMount.");
        this.checkIfUserCreatedProfile();
        console.log("End didMount.");

    }

    checkIfUserCreatedProfile() {

        var uid = auth().currentUser.uid;
        var reference = database.child("users/" + uid + "/createdProfile");

        reference.once("value").then( (snapshot) => {
            if (!snapshot.exists()) {
                this.setState({createdProfile: snapshot.val()});
            }
        });
        console.log("Value of createdProfile after check: " + this.state.createdProfile);
    }

    render() {
        const {from} = this.props.location.state || {from: {pathname: '/createprofile'}};

        // TODO: This is not being printed...
        console.log("createdProfile Profile: " + this.state.createdProfile);
        if (!this.state.createdProfile) {
            return ( <Redirect to={from}/> );
        } else {
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
