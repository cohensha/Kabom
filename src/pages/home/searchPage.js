import React, {Component} from 'react';
import {TabContent, Nav, NavItem, NavLink, Row, Col} from 'reactstrap';
import ProjectTab from './tabs/projectTab';
import PeopleTab from "./tabs/peopleTab";
import TeamTab from "./tabs/teamTab";
import DisplayTab from "./tabs/displayTab";

import Header from "../header/header";


class SearchPage extends Component {



    render () {
       return (
           <div id="searchdiv">
           <Header/>
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

           </div>)
    }
}

export default SearchPage;