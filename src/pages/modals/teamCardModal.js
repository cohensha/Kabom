import React, {Component} from 'react';
import {Modal, ModalBody, Alert, ModalFooter, Button, CardImg, Row} from 'reactstrap';
import { database, auth } from '../../firebase/constants';
import '../home/style.css';
import './viewProjectOrTeamStyle.css';

class TeamCardModal extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.props.onclick;
        this.state = {
            showRedAlert: false,
            showGreenAlert: false,
            hasRequested: false,
            errorMsg: "Oops! Only Project leaders can request teams to work on their project.",
            showInterestRedAlert: false,
            interestErrorMsg: "Oops! You cannot express interest in the team you lead!",
            interestButtonText: "Express interest to team",
            localInterestedUsersArray: [],
            userInterestUpdated: false,
        };
        this.handleCloseClick = this.handleCloseClick.bind(this);

    }

    setButtonText() {

        if(this.state.userInterestUpdated) {
            console.log("unexpressing interest");
            this.setState({
                interestButtonText: "Express interest to team"
            });
        }
        else {
            console.log("expressing interest");
            this.setState({
                interestButtonText: "Interest sent to team"
            });
        }
    }

    handleInterestClick() {
        //team object is this.props.obj

        //if they are the team leader, display erroe message
        if(this.props.obj.teamOwner == auth().currentUser.uid) {
            // console.log(this.state.interestErrorMsg);
                this.setState({showInterestRedAlert: true});
                return;
        }
        else {
            this.setState({
                userInterestUpdated: !this.state.userInterestUpdated
            });

            this.setButtonText();
        }
    }

    handleCloseClick() {

        //if user expresses interest
        //if they are already in team's list, do nothing
        //if they are not, add to list
        //if user clicks not interested
        //if they are already in team's list, delete
        //if they are not, do nothing

        //Currently, when first opening the modal it does not show if user clicked interested
        //in the past, bc we don't know where we can access the team object from inside the modal


        console.log("closing team card modal");
        var currUser = auth().currentUser.uid;

        var localInterestedUsers = [];
        var inList = false;
        if(this.state.userInterestUpdated) {

            //if user is already interested, don't write
            if(this.props.obj.interestedUsers) {
                this.props.obj.interestedUsers.map( (userId) => {
                    localInterestedUsers.push(userId);
                    if(userId === currUser) {
                        inList = true;
                        console.log("1: interested and already in list - nothing");
                    }
                });

            }
            //if team does not have a list of interested users already, or current user not in this list
            if(!inList) {
                console.log("2: interested and not in list - write to db");
                // add user to end of local array
                localInterestedUsers.push(currUser);
            }

        }
        else {
            //if user is already interested, don't write
            if(this.props.obj.interestedUsers) {
                this.props.obj.interestedUsers.map( (userId) => {
                    localInterestedUsers.push(userId);
                    if(userId === currUser) {
                        inList = true;
                        console.log("3: not interested and in list -- delete from db");
                        //TODO delete user from local array
                        var index = localInterestedUsers.indexOf(currUser);
                        localInterestedUsers.splice(index, 1);
                    }
                });

            }
            //if team does not have a list of interested users already, or current user not in this list
            if(!inList) {
                console.log("4: not interested and not in db - nothing");
            }

        }
        //
        //  //push local interested array to db
        console.log("my team id: ",  this.props.obj.id);
        //     database.child('teams' + this.props.teamId)

        database.child('teams/' + this.props.obj.id).update({
            interestedUsers: localInterestedUsers
        });
        this.toggleModal();

    }

    toggleModal() {
        this.setState({
            hasRequested: false,
            showRedAlert: false,
            showGreenAlert: false,
            showInterestRedAlert: false,
        });
        this.props.onclick();
    }

    dismiss(color) {
        if (color === "red")
            this.setState({ showRedAlert: false });

        if (color === "green")
            this.setState({ showGreenAlert: false });
    }

    dismissInterest(color) {
        this.setState({showInterestRedAlert: false});
    }

    request() {
        const currProjID = this.props.currUser.project;
        const teamIdToRequest = this.props.obj.id;

        console.log(currProjID);
        //check if user is actually a project owner first
        if (!currProjID) {
            this.setState({showRedAlert: true});
            return;
        }

        //check if proj owner is requesting a team he's part of
        let currUsersTeams = this.props.currUser.teams;
        if (currUsersTeams && currUsersTeams[teamIdToRequest]) {
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
               if (projectsCurrTeams && projectsCurrTeams[teamIdToRequest]) {
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
            <Modal isOpen={this.props.show} className={this.props.className}>
               
                <ModalBody>
                        <div className="introCard">
                            <CardImg top width = "100%" src={this.props.obj.teamPicture} />
                            <h1 className="name">{this.props.obj.name}</h1>

                            <Alert color="danger" isOpen={this.state.showInterestRedAlert} toggle={() => this.dismissInterest("red")}>
                                {this.state.interestErrorMsg}
                            </Alert>

                            <Alert color="danger" isOpen={this.state.showRedAlert} toggle={() => this.dismiss("red")}>
                                {this.state.errorMsg}
                            </Alert>
                            
                            <Alert color="success" isOpen={this.state.showGreenAlert} toggle={() => this.dismiss("green")}>
                                Nice! You've successfully requested this team.
                            </Alert>

                            <button className="button" onClick={() => this.handleInterestClick()}>{this.state.interestButtonText}</button>
                            <br/>

                            <button className="requestTeamButton" 
                                color="secondary"
                                onClick={() => this.request()}
                                disabled={this.state.hasRequested}
                                block>
                                Request Team For Your Project
                            </button>
                        </div>

                        <div className="information">
                            <h2 >Information</h2> <br/>

                            <h5>Owner</h5>
                            <p className="info">{this.props.obj.owner}</p>

                            <h5>Number of interests</h5>
                            <p className="info">{this.props.obj.noOfInterests}</p>

                            <h5>Date created</h5>
                            <p className="info">{this.props.obj.dateCreated}</p>

                            {/*<h5>Available to work on project?</h5>
                            <p className="info">{this.props.obj.currentlyAvailable}</p>

                            <h5>Looking for more team members</h5>
                            <p className="info">{this.props.obj.lookingForMembers}</p>*/}
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
                            </div> 
                            <br/>
                        </div>
                </ModalBody>

                <ModalFooter>
                    <Button color="secondary" onClick={this.handleCloseClick}>Save and Close</Button>
                </ModalFooter>
            </Modal>
        );
    }
}
export default TeamCardModal;