import React from 'react';

import {Card, CardTitle, CardText, Button} from 'reactstrap';


const DisplayCard = ({name, description}) => (
    <Card block>
        <CardTitle>{name}</CardTitle>
        <CardText>{description}</CardText>
        <Button>I'm interested!</Button>
    </Card>
);

export default DisplayCard;