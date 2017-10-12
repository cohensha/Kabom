import React from 'react';

import {TabPane, Row, Col, Input, Label} from 'reactstrap';

import TeamCard from '../cards/teamCard';


const TeamTab = ({id}) => (
    <TabPane tabId={id} className="mt-3">
        <Row>
            <Col sm={"12"}>
                <Label for="searchTeam">Search Team</Label>
                <Input  name="people" id="searchTeam" placeholder="team name" />
                <br/>
            </Col>
        </Row>
        <Row>
            <Col sm="6">
                <TeamCard />
            </Col>
            <Col sm="6">
                <TeamCard />
            </Col>
        </Row>
    </TabPane>
);

export default TeamTab;