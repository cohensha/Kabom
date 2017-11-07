import React from 'react';
import {Card, CardTitle, CardText} from 'reactstrap';

const DisplayCard = ({name, description, lookingForMembers, onclick}) => (
    <Card body className="text-center" body inverse style={{ backgroundColor: '#EEF1EF', borderColor: '#EEF1EF'}} onClick={onclick} block>
        <CardTitle> {name}
        	{lookingForMembers ? <img className="projectImage" src={'greencheck.svg'} /> : <img className="projectImage" src={''} alt=""/> }
        </CardTitle>
        <CardText className="cardDescription">{description}</CardText>
        <button className="cardImInterestButton">I'm interested!</button>
    </Card>
);

export default DisplayCard;