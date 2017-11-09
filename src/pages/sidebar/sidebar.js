import React, {Component} from 'react';
import {Button, Collapse, ListGroup, ListGroupItem} from 'reactstrap';
import { database, auth } from '../../firebase/constants';
import PeopleCardModal from '../modals/peopleCardModal';
import CreateProjectModal from '../modals/createProjectModal';
import CreateTeamModal from '../modals/createTeamModal';

import {RequestListGroupItem, OwnedListGroupItem} from "./requestListGroupItem";

import './style.css';

//import CardModal from '../modals/cardModal';
import TeamCardModal from "../modals/teamCardModal";
import ProjectCardModal from "../modals/projectCardModal";


class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            teamRequestCollapse: false,
            projectRequestCollapse: false,
            myTeamsCollapse: false,
            myProjectsCollapse: false,
            myTeamInterestsCollapse: false,
            colorTeam: "#ffffff",
            teamRequests: [], //teams requesting me to join their team
            projRequests: [], //projects requesting my team
            myTeams: [], //teams im a part of
            myProjects: [], //list of projects contributed to
            isMounted: false,
            myTeam: null, //team i own
            myTeamProject: null, //my team's project
            myTeamId: '', //my team's id
            myTeamInterestedUsersUID: [],
            myTeamInterestedUsersData: [],
            showProfileModal: false,
            showTeamProfileModal: false,
            selectedObj: {name: ''},
            showCardModal: false,
            currUser: null,
            uid: auth().currentUser.uid,
            showCreateTeamModal: false,
            showCreateProjectModal: false,
            myProject: null, //project that i created
            myProjectName: '',
            showProjProfileModal: false,
        };
        //console.log(auth().currentUser);
        this.teamReqRef = database.child("requests/users/" + this.props.uid);
        this.myTeamsRef = database.child("users/" + this.props.uid + "/teams");
        this.myProjectsRef = database.child("users/"+ this.props.uid + "/projects");
        this.teamIdRef = database.child("users/" + this.props.uid + "/team");


        this.testRef = database.child("teams/members");
        this.userRef = database.child("users/" + auth().currentUser.uid);
    }


    componentDidMount() {
        //console.log(auth().currentUser);
        this.userRef.once("value").then((sp) => {
            if (sp.exists()) {
                const user = sp.val();
                this.setState({ currUser: user });
                database.child("projects/" + user.project).once("value").then((shot) => {
                    if (shot.exists()) {
                        console.log(shot.val());
                        this.setState({
                            myProject: shot.val(),
                            myProjectName: shot.val().name,
                        });
                    }
                });
            }

        });


        this.teamIdRef.once("value").then((teamIdSnapshot) => {
            if (teamIdSnapshot.exists()) {
                this.setState({myTeamId: teamIdSnapshot.val()});
                //console.log(teamIdSnapshot.val());
                //get the team name from team id
                database.child("teams/" + teamIdSnapshot.val() + "/name").once("value").then((sp) => {
                    if (sp.exists()) {
                        this.setState({myTeam: sp.val()});
                    }
                });
                database.child("teams/" + teamIdSnapshot.val() + "/project").once("value").then((sp) => {
                    if (sp.exists()) {
                        database.child("projects/" + sp.val()).once("value").then((s) => {
                            if (s.val()) {
                                console.log(s.val());
                                this.setState({ myTeamProject: s.val()})
                            }
                        });
                    }
                });

                database.child("teams/" + teamIdSnapshot.val() + "/interestedUsers").once("value").then((sp) => {
                   if(sp.exists()) {
                       // console.log("reading users interested");
                       let arrayIds = [];
                       let array= [];
                      sp.forEach(function(childSnapshot) {
                         const item = childSnapshot.val();
                         arrayIds.push(item);
                         // console.log("user interested: " + item);

                         //for each interested user, pull their data using uid's and add to array
                          database.child("/users/" + item).once("value").then((snapshot) => {
                              if(snapshot.exists()) {
                                  array.push(snapshot.val());
                              }

                          });

                      });
                      this.setState({myTeamInterestedUsersUID: arrayIds});
                      this.setState({myTeamInterestedUsersData: array});

                   }
                   else{
                       console.log("can't see users interested");
                   }

                });

                //get the team requests from team id
                //get the project requests for a given team, need to make it so that full proj object is returned
                database.child("requests/teams/" + teamIdSnapshot.val()).once("value").then((projectsSnap) => {
                    if (projectsSnap.exists()) {
                        let array = [];
                        //console.log(snapshot.key);
                        projectsSnap.forEach(function(childSnapshot) {
                            //console.log(childSnapshot.key);
                            database.child("projects/" + childSnapshot.key).once("value").then((sp) => {
                                let item = sp.val();
                                //save the team id to the team object
                                if (item) {
                                    item["projectId"] = childSnapshot.key;
                                    array.push(item);
                                }
                                //console.log(item);
                            });
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
                    database.child("teams/" + childSnapshot.key).once("value").then((s) => {
                       const item = s.val();
                       if (item) {
                           item["teamId"] = childSnapshot.key;
                           array.push(item);
                       }
                    });
                });
                this.setState({myTeams: array});
            }
        });

        this.myProjectsRef.once("value").then( (snapshot) => {
            if (snapshot.exists()) {
                let array = [];
                snapshot.forEach(function(childSnapshot) {
                    database.child("projects/" + childSnapshot.key).once("value").then((s) => {
                        const item = s.val();
                        if (item) {
                            item["projectId"] = childSnapshot.key;
                            array.push(item);
                        }
                    });
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
        else if (collapse === 'teamInterest')
            this.setState({myTeamInterestsCollapse: !this.state.myTeamInterestsCollapse});
    }

    handleProfileClick(data, type) {
        this.setState({
           selectedObj: data
        });
        this.toggleProfileModal(type);
        //console.log("clicked an item to open a profile");
    }

    toggleProfileModal(type) {
        if (type === "teams") {
            this.setState({ showTeamProfileModal: !this.state.showTeamProfileModal });
        }
        if (type === "people") {
            this.setState({
                showProfileModal: !this.state.showProfileModal
            });
        }
        if (type === "projects") {
            this.setState({
                showProjProfileModal: !this.state.showProjProfileModal
            });
        }
    }

    acceptTeam(index) {
        //acceptTeam a team's request to you
        //to do
        // console.log("clicked " + index);

        //remove request from request table - DONE
        let selectedTeam = this.state.teamRequests[index];
        //console.log(selectedTeam.teamId);
        let deleteTeamReqRef = database.child("requests/users/" + this.props.uid + "/" + selectedTeam.teamId);
        deleteTeamReqRef.remove();

        //remove request from front end teamrequest array - DONE
        let newArray = this.state.teamRequests.filter(function(e, i){
            return i!==index;
        });
        this.setState({ teamRequests: newArray });

        //push team to your teams list in user table - DONE
        let postUserTeamsRef = database.child("users/" + this.props.uid + "/teams/");
        postUserTeamsRef.child(selectedTeam.teamId).set(selectedTeam.name);

        //push to front end list of myteams - DONE
        let newArr = this.state.myTeams;
        newArr.push(selectedTeam);
        this.setState({ myTeams: newArr });

        //push your id to members list of a team - DONE
        let postTeamMemberRef = database.child("teams/" + selectedTeam.teamId + "/members");
        postTeamMemberRef.child(this.props.uid).set(this.state.currUser.name);
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
        //
        //add curr users skills to skills list of team - DONE
        let skillsRef = database.child("teams/" + selectedTeam.teamId + "/skills/");
        this.state.currUser.skills.map((skill) => skillsRef.push(skill));
        //skillsRef.push()

    }

    rejectTeam(index) {
        //remove request from request table - DONE
        let selectedTeam = this.state.teamRequests[index];
        //console.log(selectedTeam.teamId);
        //console.log("requests/users/" + this.props.uid + "/" + selectedTeam.id + "/");
        let deleteTeamReqRef = database.child("requests/users/" + this.props.uid + "/" + selectedTeam.teamId + "/");
        deleteTeamReqRef.remove();

        //remove request from front end teamrequest array - DONE
        let newArray = this.state.teamRequests.filter(function(e, i){
            return i!==index;
        });
        this.setState({ teamRequests: newArray });
    }

    acceptProject(index) {
        let arr = this.state.projRequests;
        let selectedProject = arr[index];
        console.log(selectedProject);
        console.log(this.state.myTeam);

        // //delete request from backend request table - DONE
        let deleteProjectReqRef = database.child("requests/teams/" + this.state.myTeamId + "/" + selectedProject.projectId);
        deleteProjectReqRef.remove();
        //
        // //push proj id to my projects array in user obj in backend - DONE
        let postUserProjectsRef = database.child("users/" + this.props.uid + "/projects/");
        postUserProjectsRef.child(selectedProject.projectId).set(selectedProject.projectName)

        //push proj id to team's obj in backend
        let postUserProjectRef = database.child("teams/" + this.state.myTeamId + "/project/");
        postUserProjectRef.set(selectedProject.projectId)

        //push team id to proj object in backend
        let postProjectTeamsRef = database.child("projects/" + selectedProject.projectId + "/teams");
        postProjectTeamsRef.child(this.state.myTeamId).set(this.state.myTeam);

        //add project to my projects ive contributed to list
        //this is under myTeams
        let myProjs = this.state.myProjects;
        myProjs.push(selectedProject);

        //remove project from front end array projRequests
        let newProjReqs = this.state.projRequests.filter(function(e, i){
            return i!==index;
        });

        //list project under "your team is currently working on project" label
        //this is under myTeamProject
        this.setState({
           myProjects: myProjs,
           projRequests: newProjReqs,
           myTeamProject: selectedProject,
        });
    }

    rejectProject(index) {
        let arr = this.state.projRequests;
        let selectedProject = arr[index];
        //console.log(selectedProject);
        //console.log(this.state.myTeam);

        // //delete request from backend request table - DONE
        let deleteProjectReqRef = database.child("requests/teams/" + this.state.myTeamId + "/" + selectedProject.projectId);
        deleteProjectReqRef.remove();

        //remove project from front end array projRequests
        let projReqs = this.state.projRequests.filter(function(e, i){
            return i!==index;
        });
        this.setState({
            projRequests: projReqs,
        });
    }

    //unused
    // toggleCardModal() {
    //     this.setState({
    //         showCardModal: !this.state.showCardModal,
    //         hasRequested: false,
    //     });
    // }

    getUserNameFromId(userid) {
        var name = null;
        database.child("users/" + userid + "/name").once("value").then((sp) => {
            if (sp.exists()) {
               name = sp.val();
            }
        });

        return name;
    }

    toggleCreateTeam() {
        console.log("hey");
        this.setState({
            showCreateTeamModal: !this.state.showCreateTeamModal
        });
    }

    toggleCreateProject() {
        this.setState({
            showCreateProjectModal: !this.state.showCreateProjectModal
        });
    }

    updateTeams(team) {
        //console.log("called");
        console.log(team);
        let arr = this.state.myTeams;
        arr.push(team);
        this.setState({
            myTeam: team.name,
            myTeams: arr,
        })
    }

    contact() {
        console.log("contacted");
    }

    render() {
        return (
            <div  id="sidebar-div" className="ml-auto ml-5 pl-2">
                <p />
                {/*YOUR TEAM INFO*/}
                <p>Team Lead For</p>

                <ListGroup className="mr-3 mb-3">
                    <ListGroupItem> {this.state.myTeam || 'None. Create One Below!'} </ListGroupItem>
                </ListGroup>

                <p onClick={() => this.toggle('teamInterest')}> Users interested in {this.state.myTeam}: {this.state.myTeamInterestedUsersUID.length}</p>
                <Collapse isOpen={this.state.myTeamInterestsCollapse}>
                    <ListGroup className="mr-3 mb-3">
                        {this.state.myTeamInterestedUsersData.map( (req, id) =>

                            <ListGroupItem key={id} onClick={ () => this.handleProfileClick(req) }> {req.firstName}</ListGroupItem>
                        )}
                    </ListGroup>
                </Collapse>

                <p>Your Team's Current Project</p>

                <ListGroup className="mr-3 mb-3">
                    <ListGroupItem> {(this.state.myTeamProject && this.state.myTeamProject.name) || 'None. Find one to the left!'} </ListGroupItem>
                </ListGroup>

                <p onClick={() => this.toggle('projectreq')}> Project Requests For Your Team</p>

                <Collapse isOpen={this.state.projectRequestCollapse}>
                    <ListGroup className="mr-3 mb-3">
                        {this.state.projRequests.map((req, id) =>
                            <RequestListGroupItem
                                key={id}
                                onclick={() => this.handleProfileClick(req, "projects")}
                                accept={this.acceptProject.bind(this, id)}
                                reject={this.rejectProject.bind(this,id)}
                            >
                                {req.name}
                            </RequestListGroupItem>
                        )}
                    </ListGroup>
                </Collapse>

                {/*END OF YOUR OWN TEAM INFO */}

                <p>___________________________________</p>

                {/*JOINING OTHERS' TEAMS*/}
                <p onClick={() => this.toggle('teamreq')}> Teams Requesting You </p>

                <Collapse isOpen={this.state.teamRequestCollapse}>
                    <ListGroup className="mr-3 mb-3">
                        {this.state.teamRequests.map( (req, id) =>
                              <RequestListGroupItem
                                    key={id}
                                    onclick={() => this.handleProfileClick(req, "teams")}
                                    accept={this.acceptTeam.bind(this, id)}
                                    reject={this.rejectTeam.bind(this, id)}
                                >
                                    {req.name}
                                </RequestListGroupItem>
                        )}
                    </ListGroup>
                </Collapse>

                <p onClick={() => this.toggle('team')}> Teams I'm A Part Of </p>

                <Collapse isOpen={this.state.myTeamsCollapse}>
                    <ListGroup className="mr-3 mb-3">
                        {this.state.myTeams.map( (req, id) =>
                            <OwnedListGroupItem
                                key={id}
                                onclick={() => this.handleProfileClick(req, "teams")}
                                contact={() => this.contact()}
                            >
                                {req.name}
                            </OwnedListGroupItem>
                        )}
                    </ListGroup>
                </Collapse>
                {/*END OF JOINING OTHERS' TEAMS*/}

                <p>___________________________________</p>

                {/*YOUR PROJECT (OWNER) INFO*/}
                <p>Project Owner Of</p>

                <ListGroup className="mr-3 mb-3">
                    <ListGroupItem> {this.state.myProjectName || 'None. Create One Below!'} </ListGroupItem>
                </ListGroup>

                <p onClick={() => this.toggle('project')}> Projects I've Contributed To </p>

                <Collapse isOpen={this.state.myProjectsCollapse}>
                    <ListGroup className="mr-3 mb-3">
                        {this.state.myProjects.map( (req, id) =>
                            <OwnedListGroupItem
                                key={id}
                                onclick={() => this.handleProfileClick(req, "projects")}
                                contact={() => this.contact()}
                            >
                                {req.name}
                            </OwnedListGroupItem>
                        )}
                    </ListGroup>
                </Collapse>
                {/*END OF PROJECT OWNER INFO*/}

                <Button className="mb-2" color="secondary" size="lg"
                        onClick={() => this.toggleCreateTeam()}
                        block
                >Create Team
                </Button>

                <Button className="mb-2" color="secondary" size="lg"
                        onClick={() => this.toggleCreateProject()}
                        block
                >Create Project</Button>


                <PeopleCardModal
                    show={this.state.showProfileModal}
                    obj={this.state.selectedObj}
                    onclick={ () => this.toggleProfileModal("people")}
                />

                <TeamCardModal
                    show={this.state.showTeamProfileModal}
                    obj={this.state.selectedObj}
                    onclick={ () => this.toggleProfileModal("teams")}
                    currUser={this.state.currUser}
                />
                <ProjectCardModal
                    show={this.state.showProjProfileModal}
                    obj={this.state.selectedObj}
                    onclick={ () => this.toggleProfileModal("projects")}
                    currUser={this.state.currUser}
                />
                <CreateTeamModal show={this.state.showCreateTeamModal}
                                 onclick={() => this.toggleCreateTeam()}
                                 uid={this.state.uid}
                                 updateTeamsUI={() => this.updateTeams()}
                />
                <CreateProjectModal show={this.state.showCreateProjectModal}
                                    onclick={() => this.toggleCreateProject()}
                                    uid={this.state.uid}/>
            </div>
        );
    }
}

export default Sidebar;
