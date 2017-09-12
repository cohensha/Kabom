import React from 'react';

import {Card, CardTitle, CardText, Button} from 'reactstrap';


const ProjectCard = () => (
    <Card block>
        <CardTitle>Project Title Treatment</CardTitle>
        <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
        <Button>I'm interested!</Button>
    </Card>
);

export default ProjectCard;