import React from 'react';

import {TabPane, Row, Col} from 'reactstrap';

import ProjectCard from '../cards/projectCard';


const ProjectTab = ({id}) => (
    <TabPane tabId={id} className="mt-3">
        <ProjectCard />
    </TabPane>
);

export default ProjectTab;