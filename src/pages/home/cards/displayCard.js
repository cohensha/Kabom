import React from 'react';
import {Card, CardTitle, CardText} from 'reactstrap';


const DisplayCard = ({name, description, lookingForMembers, onclick}) => (
    <Card body className="text-center" inverse style={{ backgroundColor: '#EEF1EF', borderColor: '#EEF1EF'}} onClick={onclick} block>
        <CardTitle> {name}
        	{lookingForMembers ? <img className="projectImage" src={'greencheck.svg'} alt=""/> : <img className="projectImage" src={''} alt=""/> }
        </CardTitle>
        <CardText className="cardDescription">{description}</CardText>
        <button className="cardImInterestButton">Open full profile</button>
    </Card>
);

export default DisplayCard;