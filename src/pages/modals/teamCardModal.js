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
        this.toggle = this.props.onclick;
    }

    dismiss(color) {
        if (color === "red")
            this.setState({ showRedAlert: false });
        if (color === "green")
            this.setState({ showGreenAlert: false });
    }

    request() {
        const currProjID = this.props.currUser.project;
        //check if user is actually a project owner first
        if (!currProjID) {
            this.setState({showRedAlert: true});
            return;
        }

        //TODO: check if proj owner is requesting a team he's part of
        console.log(this.props.currUser.teams);
        // let newArray = this.props.currUser.teams.filter(function(e, obj){
        //     return obj.name!==this.props.obj.name;
        // });
        // let a = this.props.currUser.teams.find((t) => t === this.props.obj.name);
        // if (a.size() === 0) {
        //     this.setState({
        //         errorMsg: "Oops! Project Owners cannot request their own teams.",
        //         showRedAlert: true,
        //     });
        //     return;
        // }

        const teamIdToRequest = this.props.obj.id;
        console.log(teamIdToRequest);
        console.log(currProjID);
        database.child("projects/" + currProjID).once("value").then((sp) => {
           if (sp.exists()) {
               let projName = sp.val().projectName;
               console.log("requests/teams/" + teamIdToRequest);
               let postProjRequest = database.child("requests/teams/" + teamIdToRequest);
               console.log("id " + currProjID);
               postProjRequest.child(currProjID).set(projName);
                   this.setState({
                       showGreenAlert: true,
                       hasRequested: true,
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
                    <Button color="secondary" onClick={this.props.onclick}>Close</Button>
                </ModalFooter>
            </Modal>
        );
    }
}
export default TeamCardModal;