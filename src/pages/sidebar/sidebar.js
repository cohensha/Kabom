import React, {Component} from 'react';
import {Button, Collapse, ListGroup, ListGroupItem} from 'reactstrap';
import { database, auth } from '../../firebase/constants';
import './style.css';


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
        };
        this.teamReqRef = database.child("requests/users/" + this.props.uid);
        this.myTeamsRef = database.child("users/" + this.props.uid + "/teams");
        this.myProjectsRef = database.child("users/"+ this.props.uid + "/projects");
        this.teamIdRef = database.child("users/" + this.props.uid + "/team");


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

                //get the team requests from team id
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

        this.teamReqRef.once("value").then( (snapshot) => {
            if (snapshot.exists()) {
                let array = [];
                snapshot.forEach(function(childSnapshot) {
                    const item = childSnapshot.val();
                    array.push(item);
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

    backgroundOrange() {
            this.setState({colorTeam: "#FF512F"});
    }

    backgroundWhite() {
        this.setState({colorTeam: "#ffffff"});
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
                            <ListGroupItem key={id}> {req} </ListGroupItem>
                        )}
                    </ListGroup>
                </Collapse>
                <p onClick={() => this.toggle('projectreq')}> Project Requests for {this.state.myTeam} </p>
                <Collapse isOpen={this.state.projectRequestCollapse}>
                    <ListGroup className="mr-3 mb-3">
                        {this.state.projRequests.map( (req, id) =>
                            <ListGroupItem key={id}> {req} </ListGroupItem>
                        )}
                    </ListGroup>
                </Collapse>
                <p onClick={() => this.toggle('team')}> My Teams </p>
                <Collapse isOpen={this.state.myTeamsCollapse}>
                    <ListGroup className="mr-3 mb-3">
                        {this.state.myTeams.map( (req, id) =>
                            <ListGroupItem key={id}> {req} </ListGroupItem>
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
