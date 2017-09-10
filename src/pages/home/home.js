import React, {Component} from 'react';
import {TabContent, TabPane, Nav, NavItem, NavLink, Row, Col} from 'reactstrap';

import Header from './header';
import ProjectTab from './tabs/projectTab';
import PeopleTab from "./tabs/peopleTab";
import TeamTab from "./tabs/teamTab";


class Home extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1'
        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {
        return (
            <div>
                <Header />
                <div className="ml-3 mr-5 d-inline-block">
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
                        <ProjectTab id="1" />
                        <TeamTab id="2" />
                        <PeopleTab id="3" />
                    </TabContent>
                </div>
                <div className="d-inline-block text-right w-25">
                    <p> Team Requests </p>
                    <p> Project Requests </p>
                    <p> My teams </p>
                    <p> My Projects </p>
                </div>
            </div>
        );
    }
}

export default Home;
