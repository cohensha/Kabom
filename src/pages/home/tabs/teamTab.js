import React from 'react';

import {TabPane, Row, Col} from 'reactstrap';

import TeamCard from '../cards/teamCard';


const TeamTab = ({id}) => (
    <TabPane tabId={id} className="mt-3">
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