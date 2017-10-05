import React, {Component} from 'react';
import {Modal, ModalBody, ModalHeader, ModalFooter, Button, Row, Col, Label, FormGroup,Input} from 'reactstrap';
import { database, auth } from '../../firebase/constants';


class CreateProjectModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            projectNameInput: '',
            projectDescriptionInput: '',
        };

        this.toggle = this.props.onclick;
        this.postProjectRef = database.child("projects");
        this.postUserProjectsRef = database.child("users/mOnTIAFBT8g1ijeglL2KWS3ASHp1/projects");


    }


    writeProjectToDb() {
        console.log(this.state.projectNameInput);
        const projectId = this.postProjectRef.push({
            name: this.state.projectNameInput,
            description: this.state.projectDescriptionInput,
            created: new Date(),
            interests: 0,
            projectOwner: "mOnTIAFBT8g1ijeglL2KWS3ASHp1",
        });

        this.postUserProjectsRef.push({
           name: this.state.projectNameInput,
        });

        this.setState({projectNameInput: ''});
        this.setState({projectDescriptionInput: ''});
        this.toggle();

    }

    componentWillUnmount() {
        this.postProjectRef.off();
        this.postUserProjectsRef.off();

    }

    handleChangeProjectName(event) {
        this.setState({projectNameInput: event.target.value});
    }

    handleChangeProjectDesc(event) {
        this.setState({projectDescriptionInput: event.target.value});
    }

    render() {
        return (
            <Modal isOpen={this.props.show} className={this.props.className}>
                <ModalHeader >Create a Project!</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label className="text-gray-dark">Project Name</Label>
                        <Input type="text"
                               name="projectName"
                               value={this.state.projectNameInput}
                               onChange={(e) => this.handleChangeProjectName(e)}
                               id="projectNameExample"
                               placeholder="Enter Your Project Name ... "
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label className="text-gray-dark">Project Description</Label>
                        <Input type="textarea"
                               name="projectDescription"
                               onChange={(e) => this.handleChangeProjectDesc(e)}
                               value={this.state.projectDescriptionInput}
                               id="projectNameExample"
                               placeholder="Tell us what you expect in a project... "
                        />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary"
                            onClick={() => this.writeProjectToDb()}
                    >Create Project</Button>{' '}
                    <Button color="secondary" onClick={this.props.onclick}>Cancel</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default CreateProjectModal;
