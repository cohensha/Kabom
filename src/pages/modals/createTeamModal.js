import React, {Component} from 'react';
import {Modal, ModalBody, ModalHeader, ModalFooter,
    Button, Label, FormGroup, Badge, InputGroup, InputGroupButton, Input} from 'reactstrap';
import { database, storage } from '../../firebase/constants';
import './createProjectOrTeamStyle.css';


class CreateTeamModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currUid: this.props.uid,

            allSkills : [], // Existing Skills in DB
            allProjectTypes : [], // Existing Project Types in DB
            skills : [],
            projectTypes : [],
            newSkills : [],
            newProjectTypes : [],

            name: '',
            description: '',
            newMember : '',
            addedMembers : [],

            teamPictureFile : '',
            teamPictureUrl : '',
            portfolio : '',

            selectedSkill : "",
            newSkill : "",

            selectedProjectType : "",
            newProjectType : "",

            lookingForMembers : false,
            currentlyAvailable : false,

            //Error Checking
            validName : true,
            validDescription : true,
            validMembers : true,
            validPortfolio : true,
            validSkills : true,
            validProjectTypes : true,

            invalidMembersMessage : "",
        };

        this.addTeammate = this.addTeammate.bind(this);
        this.addSkill = this.addSkill.bind(this);
        this.addNewSkill = this.addNewSkill.bind(this);
        this.addNewProjectType = this.addNewProjectType.bind(this);
        this.addProjectType = this.addProjectType.bind(this);
        this.fieldsAreValid = this.fieldsAreValid.bind(this);

        this.toggle = this.props.onclick;
        this.postTeamRef = database.child("teams"); //this posts to general teams tree
        this.postUserTeamRef = database.child("users/" + this.props.uid + "/team"); //this posts to users team owner
        this.postUserTeamsRef = database.child("users/" + this.props.uid + "/teams/"); //this posts to users list of teams
    }

    componentDidMount() {
        // Get Skills
        database.child("skills/teams").once("value").then((snapshot) => {
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
        database.child("projectTypes/teams").once("value").then((snapshot) => {
            if (snapshot.exists()) {
                snapshot.forEach((childSnapshot) => {
                    let item = childSnapshot.key;
                    this.setState({
                        allProjectTypes: this.state.allProjectTypes.concat([item])
                    });
                });
            }
        });
    }

    componentWillUnmount() {
        this.postUserTeamRef.off();
        this.postUserTeamsRef.off();
        this.postTeamRef.off();
    }

    handleNameChange(e) {this.setState({name: e.target.value});}

    handleNewMemberChange(e) {this.setState({newMember: e.target.value});}

    handleDescriptionChange(e) { this.setState({description: e.target.value});}

    handleTeamPictureChange(e) {
        this.setState({teamPictureFile : e.target.files[0]});
        var reader = new FileReader();
        reader.onload = (e) => {
            this.setState({teamPictureUrl: reader.result});
        };
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    handleSelectedSkillChange(e) {this.setState({selectedSkill: e.target.value});}

    handleNewSkillChange(e) {this.setState({newSkill: e.target.value});}

    handleSelectedProjectTypeChange (e){this.setState({selectedProjectType: e.target.value});}

    handleNewProjectTypeChange (e){this.setState({newProjectType: e.target.value});}

    handlePortfolioChange(e){this.setState({portfolio: e.target.value});}

    handleLookingForMembersChange(e){this.setState({lookingForMembers: e.target.checked});}

    handleCurrentlyAvailableChange(e){this.setState({currentlyAvailable: e.target.checked});}

    writeTeamToDb() {
        if (this.fieldsAreValid()) {

            const teamId = this.postTeamRef.push().key;

            this.postUserTeamRef.set(teamId);
            this.postUserTeamsRef.child(teamId).set(this.state.name);

            this.postTeamRef.child(teamId).set({
                "name": this.state.name,
                "description": this.state.description,
                "portfolio": this.state.portfolio,
                "skills": this.state.skills,
                "projectTypes": this.state.projectTypes,
                "teamOwner": this.props.uid,
                "dateCreated": new Date().toString(),
                "lookingForMembers": this.state.lookingForMembers,
                "currentlyAvailable": this.state.currentlyAvailable,
            });

            if (this.state.teamPictureFile) {
                // Upload project image
                let teamPictureStorageRef = storage.child("teamPictures/" + teamId);
                teamPictureStorageRef.put(this.state.teamPictureFile).then((snapshot) => {
                    this.postTeamRef.child(teamId + "/teamPicture").set(snapshot.downloadURL);
                });
            }

            // TODO: delete this once a comprehensive list of skills have been generated
            this.state.skills.map((x, index) => {
                database.child("skills/teams/" + x).push().set(this.state.currUid);
            });

            // TODO: same
            this.state.projectTypes.map((x, index) => {
                database.child("projectTypes/teams/" + x).push().set(this.state.currUid);
            });

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

        if (this.state.description.length === 0){
            this.setState({validDescription:false});
            allValid = false;
        } else {
            this.setState({validDescription:true});
        }

        if (this.state.portfolio.length === 0) {
            this.setState({validPortfolio:false});
            allValid = false;
        } else {
            this.setState({validPortfolio:true});
        }

        if (this.state.skills.length === 0){
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

        // Request teammates
        //validMembers

        return allValid;
    }

    addTeammate(){
        if (this.state.newMember !== "") {
            this.setState({
                addedMembers : this.state.addedMembers.concat([this.state.newMember]),
            });
            this.setState({newMember : ""});
        }
    }

    addSkill () {
        if (!this.state.selectedSkill) {
            this.setState({
                skills: this.state.skills.concat([this.state.allSkills[0]])
            });
        } else {
            this.setState({
                skills: this.state.skills.concat([this.state.selectedSkill])
            });
        }
    }

    addNewSkill () {
        if (this.state.newSkill !== "") {
            this.setState({
                newSkills : this.state.newSkills.concat([this.state.newSkill]),
                skills: this.state.skills.concat([this.state.newSkill])
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

    deleteMemberBadge(index) {
        var newArray = this.state.addedMembers.filter(function(e, i){
            return i!==index;
        });
        this.setState ({ addedMembers : newArray});
    }

    deleteSkillBadge (index) {
        var newArray = this.state.skills.filter(function(e, i){
            return i!==index;
        });
        this.setState ({ skills : newArray});
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
                <ModalHeader >Create Your Team</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label className="text-gray-dark">Give your team a descriptive name! Bonus points for creative pun use</Label>
                        <Input type="text"
                               value={this.state.name}
                               onChange={(e) => this.handleNameChange(e)}
                               placeholder="Ex. iOS Devs, Python Charmers, Our Glasses Help Us C#"/>
                        <Label hidden={this.state.validName} id={"error"}>
                            Please enter a team name.
                        </Label>
                    </FormGroup>

                    <FormGroup>
                        <FormGroup>
                            <Label>Already have teammates in mind? Add their USC email below</Label>
                            <InputGroup>
                                <Input placeholder="Ex. tommytrojan@usc.edu"
                                       value={this.state.newMember}
                                       onChange={(e) => this.handleNewMemberChange(e)}/>
                                <InputGroupButton>
                                    <Button color="primary" onClick={this.addTeammate}>
                                        Add Team Member
                                    </Button>
                                </InputGroupButton>
                            </InputGroup>
                        </FormGroup>

                        {this.state.addedMembers.map( (mem, idx) =>
                            <Badge href="#"
                                   key={idx}
                                   id={"skillBadge"}
                                   color="primary"
                                   onClick={this.deleteMemberBadge.bind(this, idx)}>
                                {mem}
                            </Badge>
                        )}

                        <Label hidden={this.state.validMembers} id={"error"}>
                            {this.invalidMembersMessage}
                        </Label>
                    </FormGroup>

                    <FormGroup>
                        <Label className="text-gray-dark">Tell us more about your team!</Label>
                        <Input type="textarea"
                               onChange={(e) => this.handleDescriptionChange(e)}
                               value={this.state.description}
                               placeholder="Ex. Team aspirations, unique team chemistry, or just some fun facts" />
                        <Label hidden={this.state.validDescription} id={"error"}>
                            Please write a description about your team.
                        </Label>
                    </FormGroup>

                    <FormGroup>
                        <Label>Upload a picture to better brand your team!</Label>
                        <Input type="file" accept="image/*"
                               files={this.state.teamPictureFile}
                               onChange={(e) => this.handleTeamPictureChange(e)} />
                    </FormGroup>

                    <FormGroup>
                        <FormGroup>
                            <Label>Add your team skills</Label>
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
                            <Label>Can't find one of your skills? Add it!</Label>
                            <InputGroup>
                                <Input placeholder="Add New Skill"
                                       value={this.state.newSkill}
                                       onChange={(e) => this.handleNewSkillChange(e)}/>
                                <InputGroupButton>
                                    <Button color="primary" onClick={this.addNewSkill}>Add New Skill</Button>
                                </InputGroupButton>
                            </InputGroup>
                        </FormGroup>

                        {this.state.skills.map( (skill, idx) =>
                            <Badge href="#"
                                   key={idx}
                                   id={"skillBadge"}
                                   color="primary"
                                   onClick={this.deleteSkillBadge.bind(this, idx)}>
                                {skill}
                            </Badge>
                        )}

                        <Label hidden={this.state.validSkills} id={"error"}>
                            Please enter at least 1 team skill.
                        </Label>
                    </FormGroup>

                    <FormGroup>
                        <FormGroup>
                            <Label>Are you looking for a specific type of project? Add it so project owners can find you easily!</Label>
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
                            Please enter at least 1 project type your team is interested in.
                        </Label>
                    </FormGroup>

                    <FormGroup>
                        <Label className="text-gray-dark">Add links to your team portfolio</Label>
                        <Input type="textarea"
                               onChange={(e) => this.handlePortfolioChange(e)}
                               value={this.state.portfolio}
                               placeholder="Ex. Past projects, GitHub repos, websites, etc." />
                        <Label hidden={this.state.validPortfolio} id={"error"}>
                            Please showcase some team projects your team has worked on. If you have not worked on projects with your team, please create a group instead.
                        </Label>
                    </FormGroup>

                    <FormGroup check>
                        <Label check>
                            <Input type="checkbox"
                                   onChange={(e) => this.handleLookingForMembersChange(e)}
                                   value={this.state.lookingForMembers} />{' '}
                            Currently looking for team members
                        </Label>

                        <Label check>
                            <Input type="checkbox"
                                   onChange={(e) => this.handleCurrentlyAvailableChange(e)}
                                   value={this.state.currentlyAvailable} />{' '}
                            Currently available for projects
                        </Label>
                    </FormGroup>

                </ModalBody>
                
                <ModalFooter>
                    <Button color="primary"
                            onClick={() => this.writeTeamToDb()}>
                        Create Team
                    </Button>{' '}
                    <Button color="secondary"
                            onClick={this.props.onclick}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default CreateTeamModal;
