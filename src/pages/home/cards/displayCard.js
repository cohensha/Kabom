import React from 'react';

import {Card, CardTitle, CardText, Button} from 'reactstrap';


const DisplayCard = ({name, description, onclick}) => (
    <Card onClick={onclick} block>
        <CardTitle>{name}</CardTitle>
        <CardText>{description}</CardText>
        <button className="cardImInterestButton">I'm interested!</button>
    </Card>
);

export default DisplayCard;