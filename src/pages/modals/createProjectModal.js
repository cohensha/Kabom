import React, {Component} from 'react';
import {Modal, ModalBody, ModalHeader, ModalFooter, Button, Row, Col, Label, FormGroup,Input} from 'reactstrap';
import { database, auth } from '../../firebase/constants';

class CreateProjectModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            projectNameInput: '',
            projectDescriptionInput: '',
            locationDescriptionInput: '',
            membersInput: '',
            missionNameInput: ''
        };

        this.toggle = this.props.onclick;
        this.postProjectRef = database.child("projects");
        this.postUserProjectsRef = database.child("users/" + this.props.uid + "/projects");
    }

    writeProjectToDb() {
        const projectId = this.postProjectRef.push({
            name: this.state.projectNameInput,
            /*adcreated: new Date(),*/
            mission: this.state.missionNameInput,
            noOfInterests: 0,
            members: this.state.membersInput,
            description: this.state.projectDescriptionInput,
            locationDescription: this.state.locationDescriptionInput,
            projectOwner: this.props.uid
        });

        // this.postUserProjectsRef.push({
        //    name: this.state.projectNameInput,
        // });

        // this.setState({projectNameInput: ''});
        // this.setState({projectDescriptionInput: ''});
        this.toggle();
    }

    componentWillUnmount() {
        this.postProjectRef.off();
        this.postUserProjectsRef.off();

    }

    handleChangeProjectName(event) {
        this.setState({projectNameInput: event.target.value});
    }

    handleChangeMissionName(event) {
        this.setState({missionNameInput: event.target.value});
    }

    handleChangeProjectDesc(event) {
        this.setState({projectDescriptionInput: event.target.value});
    }

    handleChangeNumPeople(event) {
        this.setState({seekingNumPeopleInput: event.target.value});
    }

    handleChangeMemberName(event) {
        this.setState({membersInput: event.target.value});
    }

    handleChangeLocationDescription(event) {
        this.setState({locationDescriptionInput: event.target.value});
    }

    render() {
        return (
            <Modal isOpen={this.props.show} toggle={this.toggle} className={this.props.className}>
                <ModalHeader >Create New Project</ModalHeader>
                <ModalBody>
                    

                    <FormGroup>
                        <Label className="text-gray-dark">Name your project</Label>
                        <Input type="text"
                               name="projectName"
                               value={this.state.projectNameInput}
                               onChange={(e) => this.handleChangeProjectName(e)}
                               id="projectNameExample"
                               placeholder="Kabom"
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label className="text-gray-dark">Mission</Label>
                        <Input type="text"
                               name="missionName"
                               value={this.state.missionNameInput}
                               onChange={(e) => this.handleChangeMissionName(e)}
                               id="missionName"
                               placeholder="What is the team's mission?"
                        />
                    </FormGroup>

                    {/*<FormGroup>
                        <Label className="text-gray-dark">Members</Label>
                        <Input type="text"
                               name="memberNames"
                               onChange={(e) => this.handleChangeMemberName(e)}
                               value={this.state.membersInput}
                               id="memberName"
                               placeholder="Janson Lau"
                        />

                    </FormGroup>
                    */}

                    <FormGroup>
                        <Label className="text-gray-dark">Where</Label>
                        <Input type="textarea"
                               name="locationDescription"
                               onChange={(e) => this.handleChangeLocationDescription(e)}
                               value={this.state.locationDescriptionInput}
                               id="locationDescription"
                               placeholder="Where are meetings located?"
                        />
                    </FormGroup>
                    
                    <FormGroup>
                        <Label className="text-gray-dark">Description</Label>
                        <Input type="textarea"
                               name="projectDescription"
                               onChange={(e) => this.handleChangeProjectDesc(e)}
                               value={this.state.projectDescriptionInput}
                               id="projectNameExample"
                               placeholder="What are you trying to solve?"
                        />
                    </FormGroup>
                </ModalBody>
                
                <ModalFooter>
                    <Button color="primary" onClick={() => this.writeProjectToDb()}>
                        Create Project
                    </Button>{' '}
                    
                    <Button color="secondary" onClick={this.props.onclick}>
                        Cancel
                    </Button>

                </ModalFooter>
            </Modal>
        );
    }
}
export default CreateProjectModal;
