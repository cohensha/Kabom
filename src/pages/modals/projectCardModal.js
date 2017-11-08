import React, {Component} from 'react';
import {Modal, ModalBody, ModalHeader, ModalFooter, Button, CardImg} from 'reactstrap';
import { database, auth } from '../../firebase/constants';
import '../home/style.css';
import './viewProjectOrTeamStyle.css';

class ProjectCardModal extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.props.onclick;
    }

    render() {
        return (
            <Modal isOpen={this.props.show} toggle={this.toggle} className={this.props.className}>
               
                <ModalBody>
                    <div className="introCard">
                        <CardImg top width = "100%" src={this.props.obj.projectPicture} />
                        <h1 className="name">{this.props.obj.name}</h1>
                        <p className="elevatorPitch">{this.props.obj.elevatorPitch}</p>
                        <p><button className="button">I'm interested!</button></p>
                    </div>

                    <div className="information">
                        <h2 >Information</h2> <br/>

                        {/*<h5>Number of interests</h5>
                        <p className="info">{this.props.obj.noOfInterests}</p>*/}

                        <h5>Project creator's role</h5>
                        <p className="info">{this.props.obj.myRoleDescription}</p>

                        <h5>Technology used</h5>
                        <p className="info">{this.props.obj.skillsNeeded}</p>

                        <h5>Looking for</h5>
                        <p className="info">{this.props.obj.projectMembersDescription}</p>

                        <h5>Time commitment</h5>
                        <p className="info">{this.props.obj.timeDescription}</p>

                        <h5>Compensation</h5>
                        <p className="info">{this.props.obj.compensationDescription}</p>

                        <h5>Tags</h5>
                        <p className="info">{this.props.obj.projectTypes}</p>   
                        
                    </div>

                    {/*<div className="description">
                        <h2> Members </h2> 
                        
                        <div className="container">
                            <p>{this.props.obj.members}</p>
                        </div> <br/>
                    </div>*/}

                    <div className="description">
                        <h2 >Description</h2> 
                        
                        <div className="container">
                          <p className="info">{this.props.obj.description}</p>
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
export default ProjectCardModal;