import React, {Component} from 'react';

import {Modal, ModalBody, ModalHeader, ModalFooter,
    Button, Label, FormGroup, Badge, InputGroup, InputGroupButton, Input} from 'reactstrap';
import { database, auth, storage } from '../../firebase/constants';

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
            projectName: '',
            elevatorPitch : '',
            projectImageFile: '',
            projectImageUrl : '',
            projectDescription: '',
            projectMembersDescription : '',

            selectedSkill : "",
            newSkill : "",

            selectedProjectType : "",
            newProjectType : "",

            timeDescription : '',
            myRoleDescription : '',
            compensationDescription : '',
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
                "projectName" : this.state.projectName,
                "elevatorPitch" : this.state.elevatorPitch,
                "projectDescription" : this.state.projectDescription,
                "projectMembersDescription" : this.state.projectMembersDescription,
                "timeDescription" : this.state.timeDescription,
                "myRoleDescription" : this.state.myRoleDescription,
                "compensationDescription" : this.state.compensationDescription,
                "skillsNeeded" : this.state.skillsNeeded,
                "projectTypes" : this.state.projectTypes,
                "projectOwner" : this.props.uid
            });

            if (this.state.projectImageFile) {
                // Upload project image
                let projectPictureStorageRef = storage.child("projectPictures/"+projectId);
                projectPictureStorageRef.put(this.state.projectImageFile).then((snapshot)=> {
                    database.child("projects/" + projectId + "/projectPicture").set(snapshot.downloadURL);
                });
            }

            // TODO: delete this once a comprehensive list of skills have been generated
            this.state.newSkills.map((x, index) => {
                database.child("skills/" + x).push().set(this.props.uid);
            });

            // TODO: same
            this.state.newProjectTypes.map((x, index) => {
                database.child("projectTypes").push().set(x);
            });

            this.toggle();
        }
    }

    fieldsAreValid() {
        // TODO: check fields and add form feedback
        return true;
    }


    componentWillUnmount() {
        this.postProjectRef.off();
        this.postUserProjectsRef.off();
    }

    handleChangeProjectName(e) {this.setState({projectName: e.target.value});}

    handleChangeElevatorPitch(e) {this.setState({elevatorPitch: e.target.value});}

    handleChangeProjectImage(e) {
        this.setState({projectImageFile : e.target.files[0]});
        var reader = new FileReader();
        reader.onload = (e) => {
            this.setState({projectImageUrl: reader.result});
        }
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    handleChangeProjectDescription(e) { this.setState({projectDescription: e.target.value});}

    handleChangeProjectMembersDescription(e) { this.setState({projectMembersDescription: e.target.value});}

    handleChangeTimeDescription(e) { this.setState({timeDescription: e.target.value});}

    handleChangeRoleDescription(e) { this.setState({myRoleDescription: e.target.value});}

    handleChangeCompensationDescription(e) { this.setState({compensationDescription: e.target.value});}

    handleSelectedSkillChange (e) {this.setState({selectedSkill : e.target.value});}

    handleNewSkillChange (e) {this.setState({newSkill : e.target.value});}

    handleSelectedProjectTypeChange (e) {this.setState({selectedProjectType : e.target.value});}

    handleNewProjectTypeChange(e) {this.setState({newProjectType : e.target.value});}

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
                projectTypes: this.state.projectTypes.concat([this.state.projectTypes[0]])
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
                               value={this.state.projectName}
                               onChange={(e) => this.handleChangeProjectName(e)}
                               placeholder="Project Name"
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label className="text-gray-dark">Give us your best 30 second elevator pitch!</Label>
                        <Input type="textarea"
                               onChange={(e) => this.handleChangeElevatorPitch(e)}
                               value={this.state.elevatorPitch}
                               placeholder="Elevator Pitch"
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label>Got a logo or an idea of what you want your project to look like? Upload it here!</Label>
                        <Input type="file" accept="image/*"
                               files={this.state.projectImageFile}
                               onChange={(e) => this.handleChangeProjectImage(e)}/>
                    </FormGroup>

                    <FormGroup>
                        <Label className="text-gray-dark">Tell us anything else about your project here. (Milestones you have, a software development methodology you want to follow, etc.) </Label>
                        <Input type="textarea"
                               onChange={(e) => this.handleChangeProjectDescription(e)}
                               value={this.state.projectDescription}
                               placeholder="Description"
                        />

                    </FormGroup>
                    */}

                    <FormGroup>
                        <Label className="text-gray-dark"> What's your role in this project?</Label>
                        <Input type="textarea"
                               onChange={(e) => this.handleChangeRoleDescription(e)}
                               value={this.state.myRoleDescription}
                               placeholder="Ex. Developer, Designer, Project Manager, General Stakeholder, etc."
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label className="text-gray-dark"> What kind of project members are you looking for?</Label>
                        <Input type="textarea"
                               onChange={(e) => this.handleChangeProjectMembersDescription(e)}
                               value={this.state.projectMembersDescription}
                               placeholder="Ex. 2-3 Developers, 1 Designer, 1 Project Manager"
                        />
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
                                <Input placeholder="Add New ProjectType" id={"newProjectType"}
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
                                   id={"projectTypeBadge"}
                                   color="primary"
                                   onClick={this.deleteProjectTypeBadge.bind(this, idx)}>
                                {projectType}
                            </Badge>
                        )}

                    </FormGroup>

                    <FormGroup>
                        <Label className="text-gray-dark"> Talk about the time commitment you are expecting and any deadlines you want to meet.</Label>
                        <Input type="textarea"
                               onChange={(e) => this.handleChangeTimeDescription(e)}
                               value={this.state.timeDescription}
                               placeholder="Ex. 2-3 hours per week, checking in once a week in person on campus. Aiming for completion before winter break."
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label className="text-gray-dark"> Are you offering any compensation? If so, mention it to motivate users to work on your project!</Label>
                        <Input type="textarea"
                               onChange={(e) => this.handleChangeCompensationDescription(e)}
                               value={this.state.compensationDescription}
                               placeholder="Ex. $1000 for completed website, 10% equity, etc."
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
