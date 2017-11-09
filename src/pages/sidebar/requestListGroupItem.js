import React from 'react';
import {RejectIcon, AcceptIcon} from '../../icons/icon';

import {ListGroupItem, Button, Row} from 'reactstrap';

export const RequestListGroupItem = ({id, children, accept, reject, onclick}) => (
    <ListGroupItem key={id}>
        <Row>
            <p onClick={onclick} className="mr-5"> {children} </p>
            <AcceptIcon className="border-0 d-inline-block mr-5" onclick={accept}/>
            <RejectIcon className="d-inline-block border-0" onclick={reject}/>
        </Row>
    </ListGroupItem>

);

//export default RequestListGroupItem;

export const OwnedListGroupItem = ({id, children, contact, onclick}) => (
    <ListGroupItem key={id}>
        <Row>
            <p onClick={onclick} className="mr-4"> {children} </p>
            <Button color="primary" onClick={contact}>Contact!</Button>
        </Row>
    </ListGroupItem>

);
