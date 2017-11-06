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
                            <CardImg top width = "100%" src={this.props.obj.profilePicture}/>
                            <h1 className="name">{this.props.obj.name}</h1>
                            <h2 className="info">{this.props.obj.bio}</h2>
                            <p><button className="button">I'm interested!</button></p>
                        </div>

                        <div className="information">
                            <h2 >About Me</h2> <br/>

                            <h5>School</h5>
                            <p className="info">University of Southern California</p>
                            <p className="info">{this.props.obj.school}</p>

                            <h5>Email</h5>
                            <p className="info">{this.props.obj.email}</p>

                            <h5>Links</h5>
                            <p className="info">{this.props.obj.facebook}</p>
                            <p className="info">{this.props.obj.github}</p>
                            <p className="info">{this.props.obj.linkedin}</p>

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