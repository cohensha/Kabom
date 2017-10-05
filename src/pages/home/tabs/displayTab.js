import React from 'react';

import {TabPane, Row, Col} from 'reactstrap';

import DisplayCard from '../cards/displayCard';


const DisplayTab = ({id, data}) => (
    <TabPane tabId={id} className="mt-3">
        <Row>
        {data.map((d, id) =>
            <Col key={id} className="m-1 d-inline-block">
                <DisplayCard className="d-inline-block" key={id} name={d.name} description={d.description} />
            </Col>

            )}
        </Row>
    </TabPane>
);

export default DisplayTab;