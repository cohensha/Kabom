import React, {Component} from 'react';
import {Modal, ModalBody, ModalHeader, ModalFooter, Button, Row, Col, Label, FormGroup,Input} from 'reactstrap';
import { database, auth } from '../../firebase/constants';

import '../home/style.css';


class CardModal extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.props.onclick;
    }

    render() {
        return (
            <Modal isOpen={this.props.show} className={this.props.className}>
                <ModalHeader >{this.props.obj.name}</ModalHeader>
                <ModalBody>
                    <p>{this.props.obj.description}</p>
                    <p>{'Seeking ' + this.props.obj.seekingNumPeople + ' developers'} </p>
                    <p>{'Interests: ' + this.props.obj.interests}</p>
                    <p>{'Skills Needed: ' + this.props.obj.skillsNeeded} </p>
                    <Button>I'm interested!</Button>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.props.request}>Request</Button>
                    <Button color="secondary" onClick={this.props.onclick}>Close</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default CardModal;
