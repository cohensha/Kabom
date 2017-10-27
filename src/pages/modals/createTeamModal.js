import React, {Component} from 'react';
import {Modal, ModalBody, ModalHeader, ModalFooter, Button, Label, FormGroup,Input} from 'reactstrap';
import { database } from '../../firebase/constants';

class CreateTeamModal extends Component {
    constructor(props) {
        super(props);

        //this.toggle = this.toggle.bind(this);
        this.state = {
            teamNameInput: '',
            teamDescriptionInput: '',
            seekingNumPeopleInput: 0,
            numOptions: [2, 3, 4, 5, 6, 7, 8, 9, 10],
            skillsNeededInput: [],
            currUid: this.props.uid,
        };

        this.toggle = this.props.onclick;
        this.postTeamRef = database.child("teams"); //this posts to general teams tree
        this.postUserTeamRef = database.child("users/" + this.props.uid + "/team"); //this posts to users team owner
        this.postUserTeamsRef = database.child("users/" + this.props.uid + "/teams/"); //this posts to users list of teams

    }

    writeTeamToDb() {
        //console.log(this.state.teamNameInput);
        const teamId = this.postTeamRef.push({
            name: this.state.teamNameInput,
            description: this.state.teamDescriptionInput,
            created: new Date(),
            interests: 0,
            numPeople: 0,
            seekingNumPeople: this.state.seekingNumPeopleInput,
            projects: [],
            teamOwner: this.state.currUid,
            skillsNeeded: this.state.skillsNeededInput,
        });
        this.postUserTeamRef.set(teamId.key);
        this.postUserTeamsRef.push(this.state.teamNameInput);

        this.setState({teamNameInput: ''});
        this.setState({teamDescriptionInput: ''});
        this.setState({skillsNeededInput: []});
        this.toggle();

    }

    componentWillUnmount() {
        this.postUserTeamRef.off();
        this.postUserTeamsRef.off();
        this.postTeamRef.off();

    }
    handleChangeTeamName(event) {
        this.setState({teamNameInput: event.target.value});
    }

    handleChangeTeamDesc(event) {
        this.setState({teamDescriptionInput: event.target.value});
    }

    handleChangeNumPeople(event) {
        this.setState({seekingNumPeopleInput: event.target.value});
    }

    handleSelectSkills(event) {
        let array = this.state.skillsNeededInput;
        array.push(event.target.value);
        this.setState({skillsNeededInput: array});
        //this.state.skillsNeededInput.map( (skill) => console.log(skill) );
    }

    render() {
        return (
            <Modal isOpen={this.props.show} toggle={this.toggle} className={this.props.className}>
                <ModalHeader >Create a Team!</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label className="text-gray-dark">Team Name</Label>
                        <Input type="text"
                               name="teamName"
                               value={this.state.teamNameInput}
                               onChange={(e) => this.handleChangeTeamName(e)}
                               id="teamNameExample"
                               placeholder="Enter Your Team Name ... "
                        />
                    </FormGroup>
                    
                    <FormGroup>
                        <Label className="text-gray-dark">Team Description</Label>
                        <Input type="textarea"
                               name="teamDescription"
                               onChange={(e) => this.handleChangeTeamDesc(e)}
                               value={this.state.teamDescriptionInput}
                               id="teamNameExample"
                               placeholder="Tell us what you expect in a team... "
                        />
                    </FormGroup>
                    
                    <FormGroup>
                        <Label className="text-gray-dark" for="selectGroupSize">Select Group Size</Label>
                        <Input type="select" name="select"
                            id="selectGroupSize"
                            onChange={(e) => this.handleChangeNumPeople(e)}
                        >
                            {this.state.numOptions.map( (num, id) => <option key={id}>{num}</option> )}
                        </Input>
                    </FormGroup>
                    
                </ModalBody>
                
                <ModalFooter>
                    <Button color="primary"
                            onClick={() => this.writeTeamToDb()}
                            >Create a Group</Button>{' '}
                    <Button color="secondary" onClick={this.props.onclick}>Cancel</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default CreateTeamModal;
