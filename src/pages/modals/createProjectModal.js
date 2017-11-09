import React, {Component} from 'react';

import {Modal, ModalBody, ModalHeader, ModalFooter,
    Button, Label, FormGroup, Badge, InputGroup, InputGroupButton, Input} from 'reactstrap';
import { database, storage } from '../../firebase/constants';

import './createProjectOrTeamStyle.css';


class CreateProjectModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            allSkills : [], // Existing Skills in DB
            allProjectTypes : [], // Existing Project Types in DB
            skillsNeeded : [],
            projectTypes : [],
            newSkills : [],
            newProjectTypes : [],
            // Inputs
            name: '',
            elevatorPitch : '',
            projectImageFile: '',
            projectImageUrl : '',
            description: '',
            projectMembersDescription : '',

            selectedSkill : "",
            newSkill : "",

            selectedProjectType : "",
            newProjectType : "",

            timeDescription : '',
            myRoleDescription : '',
            compensationDescription : '',
            lookingForMembers : false,
            workingOnProject : false,

            // Error checking
            validName : true,
            validElevatorPitch : true,
            validDescription : true,
            validRole : true,
            validProjectMembersDescription : true,
            validSkills : true,
            validProjectTypes : true,
            validTimeCommitment : true,
        };

        this.addSkill = this.addSkill.bind(this);
        this.addNewSkill = this.addNewSkill.bind(this);
        this.addNewProjectType = this.addNewProjectType.bind(this);
        this.addProjectType = this.addProjectType.bind(this);
        this.fieldsAreValid = this.fieldsAreValid.bind(this);

        this.postProjectRef = database.child("projects");
        this.postUserProjectRef = database.child("users/" + this.props.uid + "/project");
        this.toggle = this.props.onclick;
    }

    componentDidMount () {
        // Get Skills
        database.child("skills").once("value").then((snapshot) => {
            if (snapshot.exists()) {
                snapshot.forEach((childSnapshot) => {
                    var item = childSnapshot.key;
                    this.setState({
                        allSkills: this.state.allSkills.concat([item])
                    });
                });
            }
        });

        // Get Project Types
        database.child("projectTypes").once("value").then((snapshot) => {
            if (snapshot.exists()) {
                snapshot.forEach((childSnapshot) => {
                    let item = childSnapshot.val();
                    this.setState({
                        allProjectTypes: this.state.allProjectTypes.concat([item])
                    });
                });
            }
        });
    }

    writeProjectToDb() {
        if (this.fieldsAreValid()) {

            const projectId = this.postProjectRef.push().key;

            this.postUserProjectRef.set(projectId);

            this.postProjectRef.child(projectId).set({
                "name" : this.state.name,
                "elevatorPitch" : this.state.elevatorPitch,
                "description" : this.state.description,
                "projectMembersDescription" : this.state.projectMembersDescription,
                "timeDescription" : this.state.timeDescription,
                "myRoleDescription" : this.state.myRoleDescription,
                "compensationDescription" : this.state.compensationDescription,
                "skillsNeeded" : this.state.skillsNeeded,
                "projectTypes" : this.state.projectTypes,
                "projectOwner" : this.props.uid,
                "dateAdded" : new Date().toString(),
                "lookingForMembers" : this.state.lookingForMembers,
                "workingOnProject" : this.state.workingOnProject,
            });

            if (this.state.projectImageFile) {
                // Upload project image
                let projectPictureStorageRef = storage.child("projectPictures/"+projectId);
                projectPictureStorageRef.put(this.state.projectImageFile).then((snapshot)=> {
                    database.child("projects/" + projectId + "/projectPicture").set(snapshot.downloadURL);
                });
            }

            // TODO: delete this once a comprehensive list of skills have been generated
            // this.state.newSkills.map((x, index) => {
            //     database.child("skills/" + x).push().set(this.props.uid);
            // });

            // TODO: same
            // this.state.newProjectTypes.map((x, index) => {
            //     database.child("projectTypes").push().set(x);
            // });

            this.toggle();
        }
    }

    fieldsAreValid() {
        var allValid = true;

        if (this.state.name.length === 0) {
            this.setState({validName:false});
            allValid = false;
        } else {
            this.setState({validName:true});
        }

        if (this.state.elevatorPitch.length === 0){
            this.setState({validElevatorPitch:false});
            allValid = false;
        } else {
            this.setState({validElevatorPitch:true});
        }

        if (this.state.description.length === 0){
            this.setState({validDescription:false});
            allValid = false;
        } else {
            this.setState({validDescription:true});
        }

        if (this.state.myRoleDescription.length === 0){
            this.setState({validRole:false});
            allValid = false;
        } else {
            this.setState({validRole:true});
        }

        if (this.state.projectMembersDescription.length === 0){
            this.setState({validProjectMembersDescription:false});
            allValid = false;
        } else {
            this.setState({validProjectMembersDescription:true});
        }

        if (this.state.skillsNeeded.length === 0){
            this.setState({validSkills:false});
            allValid = false;
        } else {
            this.setState({validSkills:true});
        }

        if (this.state.projectTypes.length === 0){
            this.setState({validProjectTypes:false});
            allValid = false;
        } else {
            this.setState({validProjectTypes:true});
        }

        if (this.state.timeDescription.length === 0){
            this.setState({validTimeCommitment:false});
            allValid = false;
        } else {
            this.setState({validTimeCommitment:true});
        }

        return allValid;
    }

    componentWillUnmount() {
        this.postProjectRef.off();
        this.postUserProjectsRef.off();
    }

    handleChangeName(e) {this.setState({name: e.target.value});}

    handleChangeElevatorPitch(e) {this.setState({elevatorPitch: e.target.value});}

    handleChangeProjectImage(e) {
        this.setState({projectImageFile : e.target.files[0]});
        var reader = new FileReader();
        reader.onload = (e) => {
            this.setState({projectImageUrl: reader.result});
        };
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    handleChangeDescription(e) { this.setState({description: e.target.value});}

    handleChangeProjectMembersDescription(e) { this.setState({projectMembersDescription: e.target.value});}

    handleChangeTimeDescription(e) { this.setState({timeDescription: e.target.value});}

    handleChangeRoleDescription(e) { this.setState({myRoleDescription: e.target.value});}

    handleChangeCompensationDescription(e) { this.setState({compensationDescription: e.target.value});}

    handleSelectedSkillChange (e) {this.setState({selectedSkill : e.target.value});}

    handleNewSkillChange (e) {this.setState({newSkill : e.target.value});}

    handleSelectedProjectTypeChange (e) {this.setState({selectedProjectType : e.target.value});}

    handleNewProjectTypeChange(e) {this.setState({newProjectType : e.target.value});}

    handleLookingForMembersChange(e) {this.setState({lookingForMembers : e.target.checked});}

    handleWorkingOnProjectChange (e) {this.setState({workingOnProject : e.target.checked});}

    addSkill () {
        if (!this.state.selectedSkill) {
            this.setState({
                skillsNeeded: this.state.skillsNeeded.concat([this.state.allSkills[0]])
            });
        } else {
            this.setState({
                skillsNeeded: this.state.skillsNeeded.concat([this.state.selectedSkill])
            });
        }
    }

    addNewSkill () {
        if (this.state.newSkill !== "") {
            this.setState({
                newSkills : this.state.newSkills.concat([this.state.newSkill]),
                skillsNeeded: this.state.skillsNeeded.concat([this.state.newSkill])
            });
            this.setState({newSkill : ""});
        }
    }

    addProjectType () {
        if (!this.state.selectedProjectType) {
            this.setState({
                projectTypes: this.state.projectTypes.concat([this.state.allProjectTypes[0]])
            });
        } else {
            this.setState({
                projectTypes: this.state.projectTypes.concat([this.state.selectedProjectType])
            });
        }
    }

    addNewProjectType () {
        if (this.state.newProjectType !== "") {
            this.setState({
                newProjectTypes : this.state.newProjectTypes.concat([this.state.newProjectType]),
                projectTypes: this.state.projectTypes.concat([this.state.newProjectType])
            });
            this.setState({newProjectType : ""});
        }
    }

    deleteSkillBadge (index) {
        var newArray = this.state.skillsNeeded.filter(function(e, i){
            return i!==index;
        });
        this.setState ({ skillsNeeded : newArray});
    }

    deleteProjectTypeBadge (index) {
        var newArray = this.state.projectTypes.filter(function(e, i){
            return i!==index;
        });
        this.setState ({ projectTypes : newArray});
    }

    render() {
        return (
            <Modal isOpen={this.props.show} toggle={this.toggle} className={this.props.className}>
                <ModalHeader >Create Your New Project</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label className="text-gray-dark">What's the name of your project?</Label>
                        <Input type="text"
                               value={this.state.name}
                               onChange={(e) => this.handleChangeName(e)}
                               placeholder="Project Name"/>
                        <Label hidden={this.state.validName} id={"error"}>
                            Please enter a team name.
                        </Label>
                    </FormGroup>

                    <FormGroup>
                        <Label className="text-gray-dark">Give us your best 30 second elevator pitch!</Label>
                        <Input type="textarea"
                               onChange={(e) => this.handleChangeElevatorPitch(e)}
                               value={this.state.elevatorPitch}
                               placeholder="Elevator Pitch" />
                        <Label hidden={this.state.validElevatorPitch} id={"error"}>
                            Please enter an elevator pitch.
                        </Label>
                    </FormGroup>

                    <FormGroup>
                        <Label>Got a logo or an idea of what you want your project to look like? Upload it here!</Label>
                        <Input type="file" accept="image/*"
                               files={this.state.projectImageFile}
                               onChange={(e) => this.handleChangeProjectImage(e)} />
                    </FormGroup>

                    <FormGroup>
                        <Label className="text-gray-dark">Tell us anything else about your project here </Label>
                        <Input type="textarea"
                               onChange={(e) => this.handleChangeDescription(e)}
                               value={this.state.description}
                               placeholder="Ex. Milestones you have, a software development methodology you want to follow, etc." />
                        <Label hidden={this.state.validDescription} id={"error"}>
                            Please write a description for your project.
                        </Label>
                    </FormGroup>

                    <FormGroup>
                        <Label className="text-gray-dark"> What's your role in this project?</Label>
                        <Input type="textarea"
                               onChange={(e) => this.handleChangeRoleDescription(e)}
                               value={this.state.myRoleDescription}
                               placeholder="Ex. Developer, Designer, Project Manager, General Stakeholder, etc." />
                        <Label hidden={this.state.validRole} id={"error"}>
                            Please describe your role in the project.
                        </Label>
                    </FormGroup>

                    <FormGroup>
                        <Label className="text-gray-dark"> What kind of project members are you looking for?</Label>
                        <Input type="textarea"
                               onChange={(e) => this.handleChangeProjectMembersDescription(e)}
                               value={this.state.projectMembersDescription}
                               placeholder="Ex. 2-3 Developers, 1 Designer, 1 Project Manager" />

                        <Label hidden={this.state.validProjectMembersDescription} id={"error"}>
                            Please describe the project members you are looking for or currently have.
                        </Label>
                    </FormGroup>

                    <FormGroup>
                        <FormGroup>
                            <Label>Add some skills that are needed to build your project</Label>
                            <InputGroup>
                                <Input type="select"
                                       value={this.state.selectedSkill}
                                       onChange={(e) => this.handleSelectedSkillChange(e)}>
                                    {this.state.allSkills.map( (skill, idx) =>
                                        <option key={idx}
                                                value={skill}>
                                            {skill}
                                        </option>
                                    )}
                                </Input>
                                <InputGroupButton>
                                    <Button color="primary" onClick={this.addSkill}>Add Skill</Button>
                                </InputGroupButton>
                            </InputGroup>
                        </FormGroup>

                        <FormGroup>
                            <Label>Can't find one of the skills you need? Add it!</Label>
                            <InputGroup>
                                <Input placeholder="Add New Skill"
                                       value={this.state.newSkill}
                                       onChange={(e) => this.handleNewSkillChange(e)}/>
                                <InputGroupButton>
                                    <Button color="primary" onClick={this.addNewSkill}>Add New Skill</Button>
                                </InputGroupButton>
                            </InputGroup>
                        </FormGroup>

                        {this.state.skillsNeeded.map( (skill, idx) =>
                            <Badge href="#"
                                   key={idx}
                                   id={"skillBadge"}
                                   color="primary"
                                   onClick={this.deleteSkillBadge.bind(this, idx)}>
                                {skill}
                            </Badge>
                        )}

                        <Label hidden={this.state.validSkills} id={"error"}>
                            Please enter at least 1 skill your project requires.
                        </Label>
                    </FormGroup>

                    <FormGroup>
                        <FormGroup>
                            <Label>Classify your project</Label>
                            <InputGroup>
                                <Input type="select"
                                       value={this.state.selectedProjectType}
                                       onChange={(e) => this.handleSelectedProjectTypeChange(e)}>
                                    {this.state.allProjectTypes.map( (projectType, idx) =>
                                        <option key={idx}
                                                value={projectType}>
                                            {projectType}
                                        </option>
                                    )}
                                </Input>
                                <InputGroupButton>
                                    <Button color="primary" onClick={this.addProjectType}>Add Project Type</Button>
                                </InputGroupButton>
                            </InputGroup>
                        </FormGroup>

                        <FormGroup>
                            <Label>Can't find a relevant project type? Add it!</Label>
                            <InputGroup>
                                <Input placeholder="Add New Project Type" id={"newProjectType"}
                                       value={this.state.newProjectType}
                                       onChange={(e) => this.handleNewProjectTypeChange(e)}/>
                                <InputGroupButton>
                                    <Button color="primary" onClick={this.addNewProjectType}>Add New Project Type</Button>
                                </InputGroupButton>
                            </InputGroup>
                        </FormGroup>

                        {this.state.projectTypes.map( (projectType, idx) =>
                            <Badge href="#"
                                   key={idx}
                                   id={"skillBadge"}
                                   color="primary"
                                   onClick={this.deleteProjectTypeBadge.bind(this, idx)}>
                                {projectType}
                            </Badge>
                        )}

                        <Label hidden={this.state.validProjectTypes} id={"error"}>
                            Please enter at least 1 project type to better classify your project.
                        </Label>
                    </FormGroup>

                    <FormGroup>
                        <Label className="text-gray-dark"> Talk about the time commitment you are expecting and any deadlines you want to meet.</Label>
                        <Input type="textarea"
                               onChange={(e) => this.handleChangeTimeDescription(e)}
                               value={this.state.timeDescription}
                               placeholder="Ex. 2-3 hours per week, checking in once a week in person on campus. Aiming for completion before winter break."/>
                        <Label hidden={this.state.validTimeCommitment} id={"error"}>
                            Please describe the time commitment for your project.
                        </Label>
                    </FormGroup>

                    <FormGroup>
                        <Label className="text-gray-dark"> Are you offering any compensation? If so, mention it to motivate users to work on your project!</Label>
                        <Input type="textarea"
                               onChange={(e) => this.handleChangeCompensationDescription(e)}
                               value={this.state.compensationDescription}
                               placeholder="Ex. $1000 for completed website, 10% equity, etc."/>
                    </FormGroup>

                    <FormGroup check>
                        <Label check>
                            <Input type="checkbox"
                                   onChange={(e) => this.handleLookingForMembersChange(e)}
                                   value={this.state.lookingForMembers} />{' '}
                            Currently looking for project members
                        </Label>

                        <Label check>
                            <Input type="checkbox"
                                   onChange={(e) => this.handleWorkingOnProjectChange(e)}
                                   value={this.state.lookingForMembers} />{' '}
                            Currently working on this project
                        </Label>
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
