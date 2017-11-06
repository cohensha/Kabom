import React from 'react';
import {RejectIcon, AcceptIcon} from '../../icons/icon';

import {ListGroupItem, Button, Row} from 'reactstrap';

const RequestListGroupItem = ({id, children, accept, reject, onclick}) => (
    <ListGroupItem key={id}>
        <Row>
            <p onClick={onclick}> {children} </p>
            <AcceptIcon className="d-inline-block border-0" onclick={accept}/>
            <RejectIcon className="d-inline-block border-0" onclick={reject}/>
        </Row>
    </ListGroupItem>

);

export default RequestListGroupItem;