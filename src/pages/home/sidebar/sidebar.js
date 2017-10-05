import React, {Component} from 'react';
import {Button, Collapse, ListGroup, ListGroupItem} from 'reactstrap';
import { database, auth } from '../../../firebase/constants';


class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            teamRequestCollapse: false,
            projectRequestCollapse: false,
            myTeamsCollapse: false,
            myProjectsCollapse: false,
            teamRequests: [],
            projRequests: [],
            myTeams: [],
            myProjects: [],
            isMounted: false,
        };
        const user = auth.currentUser;
        this.teamReqRef = database.child("requests/users/mOnTIAFBT8g1ijeglL2KWS3ASHp1");
        this.projReqRef = database.child("requests/teams/TeamUID0");
        this.myTeamsRef = database.child("users/mOnTIAFBT8g1ijeglL2KWS3ASHp1/teams");
        this.myProjectsRef = database.child("users/mOnTIAFBT8g1ijeglL2KWS3ASHp1/projects");


    }


    componentDidMount() {
        const user = auth.currentUser;
        console.log(user);
        if (user) console.log(user.uid);
        else console.log("no user");
        this.teamReqRef.once("value").then( (snapshot) => {
            // You are now in the Promise land (haha get it).
            // Every line the the then() will be executed after the snapshot has been retrieved.

            if (snapshot.exists()) {
                // Create a data structure to store your data
                let array = [];

                // Use the forEach function to get each childSnapshot
                // Operate on the child snapshot as you would a regular snapshot

                snapshot.forEach(function(childSnapshot) {
                    const item = childSnapshot.val();
                    array.push(item);
                });
                this.setState({teamRequests: array});
            }
        });
        this.projReqRef.once("value").then( (snapshot) => {
            // You are now in the Promise land (haha get it).
            // Every line the the then() will be executed after the snapshot has been retrieved.

            if (snapshot.exists()) {
                // Create a data structure to store your data
                let array = [];

                // Use the forEach function to get each childSnapshot
                // Operate on the child snapshot as you would a regular snapshot

                snapshot.forEach(function(childSnapshot) {
                    const item = childSnapshot.val();
                    array.push(item);
                });
                this.setState({projRequests: array});
            }
        });
        this.myTeamsRef.once("value").then( (snapshot) => {
            // You are now in the Promise land (haha get it).
            // Every line the the then() will be executed after the snapshot has been retrieved.

            if (snapshot.exists()) {
                // Create a data structure to store your data
                let array = [];

                // Use the forEach function to get each childSnapshot
                // Operate on the child snapshot as you would a regular snapshot

                snapshot.forEach(function(childSnapshot) {
                    const item = childSnapshot.val();
                    array.push(item);
                });
                this.setState({myTeams: array});
            }
        });
        this.myProjectsRef.once("value").then( (snapshot) => {
            // You are now in the Promise land (haha get it).
            // Every line the the then() will be executed after the snapshot has been retrieved.

            if (snapshot.exists()) {
                // Create a data structure to store your data
                let array = [];

                // Use the forEach function to get each childSnapshot
                // Operate on the child snapshot as you would a regular snapshot

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
        this.projReqRef.off();
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

    render() {
        return (
            <div className="ml-auto ml-5 pl-2">
                <p />
                <p onClick={() => this.toggle('teamreq')}> Team Requests </p>
                <Collapse isOpen={this.state.teamRequestCollapse}>
                    <ListGroup className="mr-3 mb-3">
                        {this.state.teamRequests.map( (req, id) =>
                            <ListGroupItem key={id}> {req} </ListGroupItem>
                        )}
                        <ListGroupItem>Team 1</ListGroupItem>
                        <ListGroupItem>cool Teamsz</ListGroupItem>
                    </ListGroup>
                </Collapse>
                <p onClick={() => this.toggle('projectreq')}> Project Requests </p>
                <Collapse isOpen={this.state.projectRequestCollapse}>
                    <ListGroup className="mr-3 mb-3">
                        {this.state.projRequests.map( (req, id) =>
                            <ListGroupItem key={id}> {req} </ListGroupItem>
                        )}
                        <ListGroupItem>Awesome project</ListGroupItem>
                        <ListGroupItem>super galactic cool projectakjfkljal</ListGroupItem>
                    </ListGroup>
                </Collapse>
                <p onClick={() => this.toggle('team')}> My teams </p>
                <Collapse isOpen={this.state.myTeamsCollapse}>
                    <ListGroup className="mr-3 mb-3">
                        {this.state.myTeams.map( (req, id) =>
                            <ListGroupItem key={id}> {req} </ListGroupItem>
                        )}
                        <ListGroupItem>Look at my teams</ListGroupItem>
                        <ListGroupItem>we are cool teams</ListGroupItem>
                    </ListGroup>
                </Collapse>
                <p onClick={() => this.toggle('project')}> My Projects </p>
                <Collapse isOpen={this.state.myProjectsCollapse}>
                    <ListGroup className="mr-3 mb-3">
                        {this.state.myProjects.map( (req, id) =>
                            <ListGroupItem key={id}> {req.name} </ListGroupItem>
                        )}
                        <ListGroupItem>kabom project</ListGroupItem>
                    </ListGroup>
                </Collapse>
            </div>
        );
    }
}

export default Sidebar;
