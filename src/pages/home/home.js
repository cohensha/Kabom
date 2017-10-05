import React, {Component} from 'react';
import {TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, Button} from 'reactstrap';

import Header from './header';
import PeopleTab from "./tabs/peopleTab";
import TeamTab from "./tabs/teamTab";
import Sidebar from './sidebar/sidebar';
import { database, auth } from '../../firebase/constants';
import DisplayTab from "./tabs/displayTab";
import CreateTeamModal from '../modals/createTeamModal';
import CreateProjectModal from '../modals/createProjectModal';



class Home extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.toggleCreateTeam = this.toggleCreateTeam.bind(this);
        this.state = {
            activeTab: '1',
            projects: [],
            teams: [],
            people: [],
            showCreateTeamModal: false,
            showCreateProjectModal: false,
        };
        //const user = auth.currentUser;
       this.projectRef = database.child("projects");
       this.teamsRef = database.child("teams");
       this.peopleRef = database.child("users");
    }

    componentDidMount() {
        this.projectRef.once("value").then((snapshot) => {
            if (snapshot.exists()) {
                // Create a data structure to store your data
                let array = [];
                snapshot.forEach(function (childSnapshot) {
                    const item = childSnapshot.val();
                    array.push(item);
                });
                this.setState({projects: array});
            }
        });
        this.teamsRef.once("value").then((snapshot) => {
            if (snapshot.exists()) {
                // Create a data structure to store your data
                let array = [];
                snapshot.forEach(function (childSnapshot) {
                    const item = childSnapshot.val();
                    array.push(item);
                });
                this.setState({teams: array});
            }
        });
        this.peopleRef.limitToFirst(10).once("value").then((snapshot) => {
            if (snapshot.exists()) {
                // Create a data structure to store your data
                let array = [];
                snapshot.forEach(function (childSnapshot) {
                    const item = childSnapshot.val();
                    array.push(item);
                });
                this.setState({people: array});
            }
        });
    }


    componentWillUnmount() {
        this.peopleRef.off();
        this.projectRef.off();
        this.peopleRef.off();
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


    render() {
        return (
            <div>
                <Header />
                    <Row>
                        <Col sm="12" md={{size: 8}}>
                        <div className="ml-3 d-inline-block">
                            <Nav tabs>
                                <NavItem>
                                    <NavLink
                                        className="{ active: this.state.activeTab === '1' }"
                                        onClick={() => { this.toggle('1'); }}
                                    >
                                        Projects
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className="{ active: this.state.activeTab === '2' }"
                                        onClick={() => { this.toggle('2'); }}
                                    >
                                        Teams
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className="{ active: this.state.activeTab === '3' }"
                                        onClick={() => { this.toggle('3'); }}
                                    >
                                        People
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <TabContent activeTab={this.state.activeTab}>
                                <DisplayTab id="1" data={this.state.projects}/>
                                <DisplayTab id="2" data={this.state.teams}/>
                                <DisplayTab id="3" data={this.state.people} />
                            </TabContent>
                        </div>
                        </Col>
                        <Col sm={{ size: '3', offset: 1 }}>
                        <Sidebar />
                            <Button className="mb-2" color="secondary" size="lg"
                                    onClick={() => this.toggleCreateTeam()}
                                    block
                            >Create Team</Button>
                            <Button className="mb-2" color="secondary" size="lg"
                                    onClick={() => this.toggleCreateProject()}
                                    block
                            >Create Project</Button>
                        </Col>
                    </Row>
                <CreateTeamModal show={this.state.showCreateTeamModal} onclick={() => this.toggleCreateTeam()} />
                <CreateProjectModal show={this.state.showCreateProjectModal} onclick={() => this.toggleCreateProject()} />
            </div>
        );
    }
}

export default Home;
