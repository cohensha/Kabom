import React, {Component} from 'react';
import {Modal, ModalBody, ModalHeader, ModalFooter, Button, Row, Col, Label, FormGroup, Input, CardImg} from 'reactstrap';
import { database, auth } from '../../firebase/constants';
import '../home/style.css';
import './viewProjectOrTeamStyle.css';

class CardModal extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.props.onclick;
    }

    render() {
        return (
            <Modal isOpen={this.props.show} toggle={this.toggle} className={this.props.className}>
                <ModalHeader >{this.props.obj.name}</ModalHeader>
                <ModalBody>
                        <div className="card">
                            <CardImg top width = "100%" src="https://i.imgur.com/GWUyCqu.gif" alt={"Cover Image"}/>
                            <h1>project.name1</h1>
                            <p className="slogan">project.slogan</p>
                            <p>University of Southern California</p>
                            <p><button className="button">I'm interested!</button></p>
                        </div>

                        <div className="about">
                            <h2 >Information</h2> <br/>

                            <h5>Looking for</h5>
                            <p>{this.props.obj.seekingNumPeople + ' developers'} </p>
                            
                            <h5>Members</h5>
                            <p className="info">this.props.obj.members</p>

                            <h5>Location</h5>
                            <p className="info">San Francisco, CA</p>

                            <h5>Interests</h5>
                            <p>{this.props.obj.interests}</p>
                    
                            <h5>Skills wanted</h5>
                            <p>{this.props.obj.skillsNeeded} </p>
                        </div>

                        <div className="description">
                            <h2 >Description</h2> 
                            
                            <div className="container">
                              <p>{this.props.obj.description}</p>
                            </div> <br/>
                        </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.props.onclick}>Close</Button>
                </ModalFooter>
            </Modal>
        );
    }
}
export default CardModal;