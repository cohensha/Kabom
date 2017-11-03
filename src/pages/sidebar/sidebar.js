import React, {Component} from 'react';
import {Button, Collapse, ListGroup, ListGroupItem} from 'reactstrap';
import { database, auth } from '../../firebase/constants';
//import {RejectIcon, AcceptIcon} from '../../icons/icon'
import RequestListGroupItem from './requestListGroupItem';
import './style.css';

import CardModal from '../modals/cardModal';

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            teamRequestCollapse: false,
            projectRequestCollapse: false,
            myTeamsCollapse: false,
            myProjectsCollapse: false,
            colorTeam: "#ffffff",
            teamRequests: [],
            projRequests: [],
            myTeams: [],
            myProjects: [],
            isMounted: false,
            myTeam: null,
            myTeamProject: null,
            myTeamId: '',
            showCardModal: false,
        };
        this.teamReqRef = database.child("requests/users/" + this.props.uid);
        this.myTeamsRef = database.child("users/" + this.props.uid + "/teams");
        this.myProjectsRef = database.child("users/"+ this.props.uid + "/projects");
        this.teamIdRef = database.child("users/" + this.props.uid + "/team");
        this.testRef = database.child("teams/members");

    }


    componentDidMount() {
        this.teamIdRef.once("value").then((teamIdSnapshot) => {
            if (teamIdSnapshot.exists()) {
                this.setState({myTeamId: teamIdSnapshot.val()});
                console.log(teamIdSnapshot.val());
                //get the team name from team id
                database.child("teams/" + teamIdSnapshot.val() + "/name").once("value").then((sp) => {
                    if (sp.exists()) {
                        this.setState({myTeam: sp.val()});
                    }
                });

                //get the project requests for a given team, need to make it so that full proj object is returned
                database.child("requests/teams/" + teamIdSnapshot.val()).once("value").then((teamsSnapshot) => {
                    if (teamsSnapshot.exists()) {
                        let array = [];
                        teamsSnapshot.forEach(function(childSnapshot) {
                            const item = childSnapshot.val();
                            array.push(item);
                            console.log("item: " + item);
                        });
                        this.setState({projRequests: array});
                    }
                 });
            }
        });

        this.testRef.orderByChild("members").equalTo(this.props.uid).on("value", (snapshot) => {
                console.log("in callback " + this.props.uid);
                let array = [];
                snapshot.forEach(function (childSnapshot) {
                    const item = childSnapshot.val();
                    if(item) {
                        array.push(item);
                        console.log(item);
                    }
                });
            });

            //hHEREEEE@!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //loads full team objects into team request array
        this.teamReqRef.once("value").then( (snapshot) => {
            if (snapshot.exists()) {
                let array = [];
                //console.log(snapshot.key);
                snapshot.forEach(function(childSnapshot) {
                    //console.log(childSnapshot.key);
                    database.child("teams/" + childSnapshot.key).once("value").then((sp) => {
                        let item = sp.val();
                        //save the team id to the team object
                        if (item) {
                            item["teamId"] = childSnapshot.key;
                            array.push(item);
                        }
                        //console.log(item);
                    });
                });
                this.setState({teamRequests: array});
            }
        });


        this.myTeamsRef.once("value").then( (snapshot) => {
            if (snapshot.exists()) {
                let array = [];
                snapshot.forEach(function(childSnapshot) {
                    const item = childSnapshot.val();
                    array.push(item);
                });
                this.setState({myTeams: array});
            }
        });

        this.myProjectsRef.once("value").then( (snapshot) => {
            if (snapshot.exists()) {
                let array = [];
                snapshot.forEach(function(childSnapshot) {
                    const item = childSnapshot.val();
                    array.push(item);
                });
                this.setState({myProjects: array});
            }
        });

    }

    componentWillUnmount() {
        this.teamReqRef.off();
    }

    toggle(collapse) {
        if (collapse === 'teamreq')
            this.setState({ teamRequestCollapse: !this.state.teamRequestCollapse });
        else if (collapse === 'projectreq')
            this.setState({ projectRequestCollapse: !this.state.projectRequestCollapse });
        else if (collapse === 'team')
            this.setState({ myTeamsCollapse: !this.state.myTeamsCollapse });
        else if (collapse === 'project')
            this.setState({ myProjectsCollapse: !this.state.myProjectsCollapse });
    }

    accept(index) {
        //accept a team's request to you
        //to do
        console.log("clicked " + index);

        //remove request from front end teamrequest array - DONE
        let acceptedTeam = this.state.teamRequests[index];
        console.log(acceptedTeam);
        let newArray = this.state.teamRequests.filter(function(e, i){
            return i!==index;
        });
        this.setState({ teamRequests: newArray });

        //remove request from request table - DONE
        let selectedTeam = this.state.teamRequests[index];
        console.log(selectedTeam.teamId);
        let deleteTeamReqRef = database.child("requests/users/" + this.props.uid + "/teams");
        deleteTeamReqRef.remove();

        //push team to your teams list in user table
        let postUserTeamsRef = database.child("users/" + this.props.uid + "/teams/" + selectedTeam.teamId + "/");
        let teamIdAndName = { "name": selectedTeam.name, "teamId": selectedTeam.teamId };
        //console.log(teamIdAndName);
        postUserTeamsRef.push(teamIdAndName);

        //push to front end list of myteams
        let newArr = this.state.myTeams;
        newArr.push(selectedTeam);
        this.setState({ myTeams: newArr });

        //push your id to members list of a team
        //TODO: figure out how to push name to this
        let postTeamMemberRef = database.child("teams/" + selectedTeam.teamId + "/members");
        //console.log(auth.currentUser.displayName);
        postTeamMemberRef.push(this.props.uid);
        //this.ref.child("Victor").setValue("setting custom key when pushing new data to firebase database");


        //increment num members
        let incrNumPeopleRef = database.child("teams/" + selectedTeam.teamId + "/numPeople");
        incrNumPeopleRef.transaction((num) => {
            // If node/clicks has never been set, currentRank will be `null`.
            return (num || 0) + 1;
        });

        //decrement num people seeking
        let decrNumPeopleRef = database.child("teams/" + selectedTeam.teamId + "/seekingNumPeople");
        decrNumPeopleRef.transaction((num) => {
            // If node/clicks has never been set, currentRank will be `null`.
            return (num || 0) + 1;
        });

        //TODO: add curr users skills to skills list of team

    }

    toggleCardModal() {
        this.setState({
            showCardModal: !this.state.showCardModal
        });
    }

    render() {
        return (
            <div  id="sidebar-div" className="ml-auto ml-5 pl-2">
                <p />
                <p>Team Lead For</p>
                <ListGroup className="mr-3 mb-3">
                    <ListGroupItem> {this.state.myTeam || 'None. Create One Below!'} </ListGroupItem>
                </ListGroup>
                <p>Your Team's Current Project</p>
                <ListGroup className="mr-3 mb-3">
                    <ListGroupItem> {this.state.myTeamProject || 'None. Find one to the left!'} </ListGroupItem>
                </ListGroup>
                <p onClick={() => this.toggle('teamreq')}> Team Requests </p>
                <Collapse isOpen={this.state.teamRequestCollapse}>
                    <ListGroup className="mr-3 mb-3">
                        {this.state.teamRequests.map( (req, id) =>
                              <RequestListGroupItem
                                    key={id}
                                    accept={this.accept.bind(this, id)}
                                >
                                    {req.name}
                                </RequestListGroupItem>
                        )}
                    </ListGroup>
                </Collapse>
                <p onClick={() => this.toggle('projectreq')}> Project Requests for {this.state.myTeam} </p>
                <Collapse isOpen={this.state.projectRequestCollapse}>
                    <ListGroup className="mr-3 mb-3">
                        {this.state.projRequests.map((req, id) =>
                            <RequestListGroupItem
                                key={id}
                                accept={() => this.accept()}
                            >
                                {req}
                            </RequestListGroupItem>
                        )}
                    </ListGroup>
                </Collapse>
                <p onClick={() => this.toggle('team')}> My Teams </p>
                <Collapse isOpen={this.state.myTeamsCollapse}>
                    <ListGroup className="mr-3 mb-3">
                        {this.state.myTeams.map( (req, id) =>
                            <ListGroupItem key={id}> {req.name} </ListGroupItem>
                        )}
                    </ListGroup>
                </Collapse>
                <p onClick={() => this.toggle('project')}> My Projects </p>
                <Collapse isOpen={this.state.myProjectsCollapse}>
                    <ListGroup className="mr-3 mb-3">
                        {this.state.myProjects.map( (req, id) =>
                            <ListGroupItem key={id}> {req.name} </ListGroupItem>
                        )}
                    </ListGroup>
                </Collapse>
                <Button className="mb-2" color="secondary" size="lg"
                        onClick={this.props.teamclick}
                        block
                >Create Team</Button>
                <Button className="mb-2" color="secondary" size="lg"
                        onClick={this.props.projectclick}
                        block
                >Create Project</Button>

            </div>
        );
    }
}

export default Sidebar;
