import React from 'react';
import {Card, CardTitle, CardText, Button} from 'reactstrap';

const DisplayCard = ({name, description, onclick}) => (
    <Card body className="text-center" body inverse style={{ backgroundColor: '#EEF1EF', borderColor: '#EEF1EF'}} onClick={onclick} block>
        <CardTitle>{name}</CardTitle>
        <CardText className="cardDescription">{description}</CardText>
        <button className="cardImInterestButton">I'm interested!</button>
    </Card>
);

export default DisplayCard;