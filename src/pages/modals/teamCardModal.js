import React, {Component} from 'react';
import {Modal, ModalBody, ModalHeader, Alert, ModalFooter, Button, CardImg} from 'reactstrap';
import { database, auth } from '../../firebase/constants';
import '../home/style.css';
import './viewProjectOrTeamStyle.css';

class TeamCardModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showRedAlert: false,
            showGreenAlert: false,
            hasRequested: false,
            errorMsg: "Oops! Only Project leaders can request teams to work on their project.",
        };
    }

    toggleModal() {
        this.setState({ hasRequested: false });
        this.props.onclick();
    }

    dismiss(color) {
        if (color === "red")
            this.setState({ showRedAlert: false });
        if (color === "green")
            this.setState({ showGreenAlert: false });
    }

    request() {
        const currProjID = this.props.currUser.project;
        const teamIdToRequest = this.props.obj.id;

        //check if user is actually a project owner first
        if (!currProjID) {
            this.setState({showRedAlert: true});
            return;
        }

        //check if proj owner is requesting a team he's part of
        let currUsersTeams = this.props.currUser.teams;
        if (currUsersTeams[teamIdToRequest]) {
            this.setState({
                errorMsg: "Oops! You can't request a team you are a part of.",
                hasRequested: true,
                showRedAlert: true,
            });
            return;
        }

        database.child("projects/" + currProjID).once("value").then((sp) => {
           if (sp.exists()) {
               let projName = sp.val().name || sp.val().projectName;
               let projectsCurrTeams = sp.val().teams;
               //look through projects current teams,
               //if the team i'm requesting is already working on my project, return
               if (projectsCurrTeams[teamIdToRequest]) {
                   this.setState({
                       errorMsg: "Oops! You're already working with this team.",
                       showRedAlert: true,
                       hasRequested: true,
                   });
                   return;
               }
               let postProjRequest = database.child("requests/teams/" + teamIdToRequest);
               //check if i've already requested this user
               postProjRequest.child(currProjID).once("value").then((s) => {
                   if (s.exists()) {
                       //if i've already requested this team
                       this.setState({
                           errorMsg: "Oops! You've already requested this team.",
                           showRedAlert: true,
                           hasRequested: true,
                       });
                   }
                   else {
                       //if not, push my request
                       postProjRequest.child(currProjID).set(projName);
                       this.setState({
                           showGreenAlert: true,
                           hasRequested: true,
                       });
                   }
               });
           }
        });

    }

    render() {
        return (
            <Modal isOpen={this.props.show} toggle={this.toggle} className={this.props.className}>
               
                <ModalBody>
                        <div className="introCard">
                            <CardImg top width = "100%" src="https://i.imgur.com/GWUyCqu.gif" alt={"Cover Image"}/>
                            <h1 className="name">{this.props.obj.name}</h1>
                        </div>

                        <div className="information">
                            <h2 >Information</h2> <br/>

                            <h5>Number of interests</h5>
                            <p className="info">{this.props.obj.noOfInterests}</p>
                        </div>

                        <div className="description">
                            <h2> Members </h2>


                            {this.props.obj.members &&
                            <div className="container">
                                {Object.keys(this.props.obj.members).map((k, i) =>
                                    <p key={i}>{this.props.obj.members[k]}</p>


                                )}
                            </div>}

                            <br/>
                        </div>

                        <div className="description">
                            <h2 >Description</h2> 
                            
                            <div className="container">
                              <p>{this.props.obj.description}</p>
                            </div> <br/>
                        </div>
                </ModalBody>
                <ModalFooter>
                    <Alert color="danger" isOpen={this.state.showRedAlert} toggle={() => this.dismiss("red")}>
                        {this.state.errorMsg}
                    </Alert>
                    <Alert color="success" isOpen={this.state.showGreenAlert} toggle={() => this.dismiss("green")}>
                        Nice! You've successfully requested this team.
                    </Alert>
                    <Button
                        color="secondary"
                        onClick={() => this.request()}
                        disabled={this.state.hasRequested}
                    >
                        Request
                    </Button>
                    <Button color="secondary" onClick={() => this.toggleModal()}>Close</Button>
                </ModalFooter>
            </Modal>
        );
    }
}
export default TeamCardModal;