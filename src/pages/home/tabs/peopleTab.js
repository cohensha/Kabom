import React from 'react';

import {TabPane, Row, Col} from 'reactstrap';

import PeopleCard from '../cards/peopleCard';


const PeopleTab = ({id}) => (
    <TabPane tabId={id} className="mt-3">
        <Row>
            <Col sm="6">
                <PeopleCard />
            </Col>
            <Col sm="6">
                <PeopleCard />
            </Col>
        </Row>
    </TabPane>
);

export default PeopleTab;