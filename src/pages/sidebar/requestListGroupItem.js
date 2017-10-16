import React from 'react';
import {RejectIcon, AcceptIcon} from '../../icons/icon';

import {ListGroupItem, Button, Row} from 'reactstrap';

const RequestListGroupItem = ({id, children, accept, reject}) => (
    <ListGroupItem key={id}>
        <Row>
        {children}
            <AcceptIcon className="d-inline-block border-0" onclick={accept}/>
            <RejectIcon className="d-inline-block border-0" onclick={accept}/>
        </Row>
    </ListGroupItem>

);

export default RequestListGroupItem;