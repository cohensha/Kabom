import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Form, FormGroup, Label, InputGroup, InputGroupButton, Input,
	FormText, Badge} from 'reactstrap';
import { database, auth, storage} from '../../firebase/constants';
import './style.css';
import {defaultProfilePictureUrl} from "../../constants/urls";
import {uscSchools, schoolYears} from "../../constants/lists";

class FormContainer extends Component {

	constructor(props) {
		super(props);

		this.state = {
			firstName : "",
            allSkills :[], // Drop down of skills pulled from the database
            skills: [], // My selected skills
            newSkills : [], // New skills to be added to the database
            projectTypes : [], // Project types pulled from the database
            projectInterests : [], // My project interests
            newProjectTypes : [], // New project interest to be added to db
			// Inputs
			school : "",
			year : "",
			description : "",
			profilePictureUrl : defaultProfilePictureUrl,
			profilePictureFile : "",
            selectedSkill : "",
			newSkill : "",
            selectedProjectType : "",
			newProjectType : "",
            linkedIn: "",
            facebook: "",
            github: "",
            website : "",
			// Validation for required fields
			schoolInvalid : true,
			yearInvalid : true,
			descriptionInvalid : true,
			skillsInvalid : true,
			interestInvalid : true,

            submitted: false,
		};

		this.completeProfile = this.completeProfile.bind(this);
        this.addSkill = this.addSkill.bind(this);
        this.addNewSkill = this.addNewSkill.bind(this);
        this.addInterest = this.addInterest.bind(this);
        this.addNewInterest = this.addNewInterest.bind(this);
	}

    handleSelectedSchoolChange (e) {this.setState({school : e.target.value});}

    handleSelectedYearChange (e) {this.setState({year : e.target.value});}

    handleDescriptionChange (e) { this.setState({description : e.target.value});}

    handleProfilePictureChange (e) {
        this.setState({profilePictureFile : e.target.files[0]});
		var reader = new FileReader();
		reader.onload = (e) => {
			this.setState({profilePictureUrl: reader.result});
		};
		if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
		}
	}

    handleSelectedSkillChange (e) {this.setState({selectedSkill : e.target.value});}

    handleNewSkillChange (e) {this.setState({newSkill : e.target.value});}

    handleSelectedProjectTypeChange (e) {this.setState({selectedProjectType : e.target.value});}

	handleNewProjectTypeChange(e) {this.setState({newProjectType : e.target.value});}

	handleLinkedInChange(e) {this.setState({linkedIn : e.target.value});}

	handleFacebookChange(e) {this.setState({facebook :e.target.value});}

	handleGitHubChange(e) {this.setState({github : e.target.value});}

	handleWebsiteChange(e) {this.setState({website : e.target.value});}

    componentDidMount() {
		// Get First Name
		var uid = auth().currentUser.uid;
        database.child("users/"+uid+"/firstName").once("value").then((snapshot) => {
        	this.setState({ firstName : snapshot.val()});
        });

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
                        projectTypes: this.state.projectTypes.concat([item])
                    });
                });
            }
        });

        // Set default input select values
		this.setState({
			year : schoolYears[0],
			school : uscSchools[0]
		});
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

    addInterest () {
        if (!this.state.selectedProjectType) {
            this.setState({
                projectInterests: this.state.projectInterests.concat([this.state.projectTypes[0]])
            });
        } else {
            this.setState({
                projectInterests: this.state.projectInterests.concat([this.state.selectedProjectType])
            });
        }
    }

    addNewInterest () {
		if (this.state.newProjectType !== "") {
            this.setState({
                newProjectTypes : this.state.newProjectTypes.concat([this.state.newProjectType]),
                projectInterests: this.state.projectInterests.concat([this.state.newProjectType])
            });
            this.setState({newProjectType : ""});
		}
    }

    deleteSkillBadge (index) {
        var newArray = this.state.skills.filter(function(e, i){
            return i!==index;
        });
        this.setState ({ skills : newArray});
    }

    deleteInterestBadge (index) {
		var newArray = this.state.projectInterests.filter(function(e, i){
			return i!==index;
		});
		this.setState ({ projectInterests : newArray});
	}

    completeProfile() {
		var isComplete = true;

        // Validate form data
        if (this.state.year.length === 0) {
            this.setState({yearInvalid : false});
            isComplete = false;
            console.log(this.state.year);
        } else {
            this.setState({yearInvalid : true});
        }

        if (this.state.school.length === 0) {
            this.setState({schoolInvalid : false});
            isComplete = false;
        } else {
            this.setState({schoolInvalid : true});
        }

		if (this.state.description.length === 0) {
			this.setState({descriptionInvalid : false});
            isComplete = false;

        } else {
            this.setState({descriptionInvalid : true});
        }

		if (this.state.skills.length === 0) {
			this.setState({skillsInvalid: false});
            isComplete = false;

        } else {
            this.setState({skillsInvalid : true});
        }

		if (this.state.projectInterests.length === 0) {
        	this.setState({interestInvalid: false});
            isComplete = false;

        } else {
            this.setState({interestInvalid : true});
        }

        if (isComplete) {
            let uid = auth().currentUser.uid;

            if (this.state.profilePictureFile) {
                // Upload profile picture
                let profilePictureStorageRef = storage.child("profilePictures/"+uid);
                profilePictureStorageRef.put(this.state.profilePictureFile).then((snapshot)=> {
                    database.child("users/"+uid+"/profilePicture").set(snapshot.downloadURL);
                });
            } else {
                database.child("users/"+uid+"/profilePicture").set(defaultProfilePictureUrl);
            }

            database.child("users/"+uid).update({
				"year" : this.state.year,
				"school" : this.state.school,
				"description" : this.state.description,
                "linkedIn" : this.state.linkedIn,
                "facebook" : this.state.facebook,
                "website" : this.state.website,
                "github" : this.state.github,
                "skills" : this.state.skills,
                "interests" : this.state.projectInterests,
				"createdProfile" : true
            });

            // TODO: delete this once a comprehensive list of skills have been generated
			this.state.newSkills.map((x, index) => {
                database.child("skills/" + x).push().set(uid);
			});

			// TODO: same
            this.state.newProjectTypes.map((x, index) => {
                database.child("projectTypes").push().set(x);
            });

            this.setState({submitted: true});
		}
	}

	render() {
		if(this.state.submitted) {
			return ( <Redirect to={'/'}/> );
		}
		return (
			<Form id="form">
				<h3> Welcome to Kabom, {this.state.firstName}! Let's get started with your creating profile.</h3>

				<FormGroup>
					<Label>School</Label>
					<InputGroup>
						<Input type="select"
							   value={this.state.school}
							   onChange={(e) => this.handleSelectedSchoolChange(e)}>
                            {uscSchools.map( (skill, idx) =>
								<option key={idx}
										value={skill}>
                                    {skill}
								</option>
                            )}
						</Input>
					</InputGroup>
					<FormText>Which school are you in at USC?</FormText>
					<Label hidden={this.state.schoolInvalid} id={"schoolError"}>
						Please enter your school.
					</Label>
				</FormGroup>

				<FormGroup>
					<Label>Year</Label>
					<InputGroup>
						<Input type="select"
							   value={this.state.year}
							   onChange={(e) => this.handleSelectedYearChange(e)}>
                            {schoolYears.map( (skill, idx) =>
								<option key={idx}
										value={skill}>
                                    {skill}
								</option>
                            )}
						</Input>
					</InputGroup>
					<Label hidden={this.state.yearInvalid} id={"yearError"}>
						Please enter your year.
					</Label>
				</FormGroup>

				<FormGroup>
					<Label>Describe yourself *</Label>
					<Input type="textarea" row={"5"}
						   value={this.state.description}
						   onChange={(e) => this.handleDescriptionChange(e)}
						   valid={false}/>
					<FormText></FormText>
					<Label hidden={this.state.descriptionInvalid} id={"descriptionError"}>
						Please enter a description about yourself.
					</Label>
				</FormGroup>

				<FormGroup>
					<Label>Upload a Profile Picture</Label>
					<Input type="file" accept="image/*"
						   files={this.state.profilePictureFile}
						   onChange={(e) => this.handleProfilePictureChange(e)}/>
					<FormText>Put a face to your name.</FormText>
				</FormGroup>

				<img src={this.state.profilePictureUrl} alt={"Profile"} id={"profilePicture"}/>

				<FormGroup>
					<FormGroup>
						<Label>Add Your Skills *</Label>
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
								<Button color="primary" onClick={this.addSkill}>Add  Skill</Button>
							</InputGroupButton>
						</InputGroup>
						<FormText>Add a few skills to let people know how talented you are!</FormText>
					</FormGroup>
					<FormGroup>
						<InputGroup>
							<Input placeholder="Add New Skill"
								   value={this.state.newSkill}
								   onChange={(e) => this.handleNewSkillChange(e)}/>
							<InputGroupButton>
								<Button color="primary" onClick={this.addNewSkill}>Add New Skill</Button>
							</InputGroupButton>
						</InputGroup>
						<FormText>Can't find one of your proudest skills? Add it!</FormText>
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
					<Label hidden={this.state.skillsInvalid} id={"skillError"}>
						Please enter at least 1 skill.
					</Label>
				</FormGroup>
				<FormGroup>
					<FormGroup>
						<Label>Types of Projects I'm Interested In *</Label>
						<InputGroup>
							<Input type="select"
								   value={this.state.selectedProjectType}
								   onChange={(e) => this.handleSelectedProjectTypeChange(e)}>
                                {this.state.projectTypes.map( (projectType, idx) =>
									<option key={idx}
											value={projectType}>
                                        {projectType}
									</option>
                                )}
							</Input>
							<InputGroupButton>
								<Button color="primary" onClick={this.addInterest}>Add Interest</Button>
							</InputGroupButton>
						</InputGroup>
						<FormText>Let others know what types of projects you're interested in!</FormText>
					</FormGroup>

					<FormGroup>
						<InputGroup>
							<Input placeholder="Add New Interest" id={"newInterest"}
								   value={this.state.newProjectType}
								   onChange={(e) => this.handleNewProjectTypeChange(e)}/>
							<InputGroupButton>
								<Button color="primary" onClick={this.addNewInterest}>Add New Interest</Button>
							</InputGroupButton>
						</InputGroup>
						<FormText>Can't find your interest? Add it!</FormText>
					</FormGroup>

					{this.state.projectInterests.map( (interest, idx) =>
						<Badge href="#"
							   key={idx}
							   id={"interestBadge"}
							   color="primary"
							   onClick={this.deleteInterestBadge.bind(this, idx)}>
							{interest}
						</Badge>
					)}

					<Label hidden={this.state.interestInvalid} id={"interestError"}>
						Please enter at least 1 project interest.
					</Label>
				</FormGroup>

				<FormGroup>
					<Label>LinkedIn</Label>
					<Input placeholder="LinkedIn URL"
						   value={this.state.linkedIn}
						   onChange={(e) => this.handleLinkedInChange(e)}/>
					<FormText>Your LinkedIn URL to expand your professional network.</FormText>
				</FormGroup>

				<FormGroup>
					<Label>Facebook</Label>
					<Input placeholder="Facebook URL"
						   value={this.state.facebook}
						   onChange={(e) => this.handleFacebookChange(e)}/>
					<FormText>Your Facebook URL to expand your social network.</FormText>
				</FormGroup>

				<FormGroup>
					<Label>GitHub</Label>
					<Input placeholder="GitHub URL"
						   value={this.state.github}
						   onChange={(e) => this.handleGitHubChange(e)}/>
					<FormText>Your GitHub URL to show off your coding skills.</FormText>
				</FormGroup>

				<FormGroup>
					<Label>Website</Label>
					<Input placeholder="Website URL"
						   value={this.state.website}
						   onChange={(e) => this.handleWebsiteChange(e)}/>
					<FormText>Your personal website to showcase yourself and your work.</FormText>
				</FormGroup>

				<FormGroup>
					<Button color="success" xs={3} onClick={this.completeProfile}> Complete Profile </Button>
				</FormGroup>
			</Form>
		);
	}
}

export default FormContainer;