import React from 'react';

import {TabPane, Row, Col, Input, Label} from 'reactstrap';

import ProjectCard from '../cards/projectCard';


const ProjectTab = ({id}) => (
    <TabPane tabId={id} className="mt-3">
        <Row>
            <Col sm={"12"}>
                <Label for="searchProject">Search Project</Label>
                <Input  name="people" id="searchProject" placeholder="name" />
                <br/>
            </Col>
        </Row>
        <Row>
            <Col>
        <ProjectCard />
            </Col>
        </Row>

    </TabPane>
);

export default ProjectTab;