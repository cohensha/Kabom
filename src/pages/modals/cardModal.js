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
               
                <ModalBody>
                        <div className="introCard">
                            <CardImg top width = "100%" src="https://i.imgur.com/GWUyCqu.gif" alt={"Cover Image"}/>
                            <h1 className="name">{this.props.obj.name}</h1>
                            <p className="mission">project.mission</p>
                            <p>University of Southern California</p>
                            <p><button className="button">I'm interested!</button></p>
                        </div>

                        <div className="information">
                            <h2 >Information</h2> <br/>

                            <h5>Where</h5>
                            <p>{this.props.obj.locationDescription} </p>

                            <h5>Looking for</h5>
                            <p>{this.props.obj.seekingNumPeople + ' people'} </p>

                            <h5>Number of interests</h5>
                            <p className="info">{this.props.obj.noOfInterests}</p>
                        </div>

                        <div className="description">
                            <h2> Members </h2> 
                            
                            <div className="container">
                                <p>{this.props.obj.members}</p>
                            </div> <br/>
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