import React, {Component} from 'react';
import {Modal, ModalBody, ModalFooter, Badge, Button, CardImg} from 'reactstrap';
import Mailto from 'react-mailto';

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
                        <button className="button">I'm interested!</button>
                    </div>

                    <div className="information">
                        <h2 >Information</h2> <br/>

                        {/*<h5>Number of interests</h5>
                        <p className="info">{this.props.obj.noOfInterests}</p>*/}

                        <h5>Owner</h5>
                        <p className="info">{this.props.obj.ownerName}</p>

                        <h5>Project creator's role</h5>
                        <p className="info">{this.props.obj.myRoleDescription}</p>

                        <h5>Technology used</h5>
                        {this.props.obj.skillsNeeded && this.props.obj.skillsNeeded.map((skill, idx) =>
                            <h5 key={idx} className="d-inline-block">
                                <Badge
                                key={idx}
                                id={"skillBadge"}
                                color="primary"
                                >
                                {skill}
                                </Badge>
                            </h5>
                        )}

                        <h5>Looking for</h5>
                        <p className="info">{this.props.obj.projectMembersDescription}</p>

                        <h5>Time commitment</h5>
                        <p className="info">{this.props.obj.timeDescription}</p>

                        <h5>Compensation</h5>
                        <p className="info">{this.props.obj.compensationDescription}</p>

                        <h5>Tags</h5>
                        {this.props.obj.projectTypes && this.props.obj.projectTypes.map((skill, idx) =>
                            <h5 key={idx} className="d-inline-block">
                                <Badge
                                    key={idx}
                                    id={"skillBadge"}
                                    color="primary"
                                >
                                    {skill}
                                </Badge>
                            </h5>
                        )}

                        {/*<h5>Currently working on project?</h5>
                        <p className="info">{this.props.obj.workingOnProject}</p>

                        <h5>Looking for more team members</h5>
                        <p className="info">{this.props.obj.lookingForMembers}</p>*/}
                        
                    </div>

                    <div className="description">
                        <h2> Teams Working on This Project </h2>
                        {this.props.isMyTeam &&
                        <p>
                            <Mailto email={this.props.obj.contactEmails} obfuscate={true}>
                                Contact Members!
                            </Mailto>
                        </p>
                        }
                        {this.props.obj.teams &&
                        <div className="container">
                            {Object.keys(this.props.obj.teams).map((k, i) =>
                                <p key={i}>{this.props.obj.teams[k]}</p>
                            )}
                        </div>}
                        <br/>
                    </div>

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