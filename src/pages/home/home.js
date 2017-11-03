import React, {Component} from 'react';
import {TabContent, Nav, NavItem, NavLink, Row, Col} from 'reactstrap';
import Header from '../header/header';

import { database, auth } from '../../firebase/constants';
import DisplayTab from "./tabs/displayTab";
import CreateTeamModal from '../modals/createTeamModal';
import CreateProjectModal from '../modals/createProjectModal';
import Sidebar from '../sidebar/sidebar';

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

    componentDidMount() {

    }

    render() {
        return (
            <div className="home">
                <Header/>
                <Row>

                    <Col sm={{size: '12', offset: 1}}>
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

export default Home;
