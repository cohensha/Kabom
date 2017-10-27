import React, {Component} from 'react';
import {Modal, ModalBody, ModalHeader, ModalFooter, Button, CardImg} from 'reactstrap';
import { database, auth } from '../../firebase/constants';
import '../home/style.css';
import './viewProjectOrTeamStyle.css';

class PeopleCardModal extends Component {
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
                            <p><button className="button">I'm interested!</button></p>
                        </div>

                        <div className="information">
                            <h2 >About Me</h2> <br/>

                            <h5>Interests</h5>
                            <p className="info">{this.props.obj.noOfInterests}</p>
                        </div>

                        <div className="description">
                            <h2 >Experience</h2> 
                            
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
export default PeopleCardModal;