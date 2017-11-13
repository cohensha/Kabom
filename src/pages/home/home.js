import React, {Component} from 'react';
import {TabContent, Nav, NavItem, NavLink, Row, Col} from 'reactstrap';
import Header from '../header/header';
// import ProjectTab from './tabs/projectTab';
// import PeopleTab from "./tabs/peopleTab";
// import TeamTab from "./tabs/teamTab";
import { auth, database } from '../../firebase/constants';
import DisplayTab from "./tabs/displayTab";
import CreateTeamModal from '../modals/createTeamModal';
import CreateProjectModal from '../modals/createProjectModal';
import PeopleCardModal from '../modals/peopleCardModal';
import Sidebar from '../sidebar/sidebar';

class Home extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1',
            projects: [],
            teams: [],
            people: [],
            showProfileModal: false,
            showCreateTeamModal: false,
            showCreateProjectModal: false,
            currUid: auth().currentUser.uid,
            currUser: null,
        };
    }

    componentDidMount() {
        database.child("users/" + auth().currentUser.uid).once("value").then((user) => {
            if (user.exists()) {
                this.setState({ currUser: user.val() });
            }
        });
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    toggleProfileModal() {
        this.setState({ showProfileModal: !this.state.showProfileModal });
    }


    render() {
        return (
            <div className="home">
                <Header
                    toggleProfile={() => this.toggleProfileModal()}
                />
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
                        <Sidebar uid={this.state.currUid || 'null rn'}/>
                    </Col>
                </Row>
                {this.state.currUser &&
                <PeopleCardModal show={this.state.showProfileModal}
                                 onclick={() => this.toggleProfileModal()}
                                 obj={this.state.currUser}
                />
                }
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

export default Home;
