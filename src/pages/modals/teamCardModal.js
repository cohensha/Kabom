import React, {Component} from 'react';
import {Modal, ModalBody, ModalHeader, ModalFooter, Button, CardImg, Row, Col} from 'reactstrap';
import { database, auth } from '../../firebase/constants';
import '../home/style.css';
import './viewProjectOrTeamStyle.css';

class TeamCardModal extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.props.onclick;

        this.state = {
            interestButtonText: "Express interest to team!",
            localInterestedUsersArray: [],
            userInterestUpdated: false
        };

        //read if user is interested in team from db
      //  this.teamIdRef = database.child("users/" + this.props.uid + "/team");
        this.handleCloseClick = this.handleCloseClick.bind(this);

        // this.interestedUsersRef = database.child("teams/" + this.props.teamId + "/interestedUsers");




    }

    setButtonText() {

        if(this.state.userInterestUpdated) {
            console.log("unexpressing interest");
            this.setState({
                interestButtonText: "Express interest to team!"
            });
        }
        else {
            console.log("expressing interest");
            this.setState({
                interestButtonText: "Interest sent to team!"
            });
        }
    }


    handleInterestClick() {
        //team object is this.props.obj
        this.setState({
           userInterestUpdated: !this.state.userInterestUpdated
        });

        this.setButtonText();

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
         if(this.state.userInterestUpdated) {
           var inList = false;
             //if user is already interested, don't write
             if(this.props.obj.interestedUsers) {
                 this.props.obj.interestedUsers.map( (userId) => {
                     localInterestedUsers.push(userId);
                     if(userId == currUser) {
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

             var inList = false;
             //if user is already interested, don't write
             if(this.props.obj.interestedUsers) {
                 this.props.obj.interestedUsers.map( (userId) => {
                     localInterestedUsers.push(userId);
                     if(userId == currUser) {
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
        console.log("my team id: ",  this.props.obj.itemId);
        //     database.child('teams' + this.props.teamId)

        database.child('teams/' + this.props.obj.itemId).update({
           interestedUsers: localInterestedUsers
        });
        this.toggle();

    }

    render() {
        // console.log("team id: ", this.props.obj.itemId);
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
                            
                            <div className="container">
                                <p>{this.props.obj.members}</p>
                            </div> <br/>
                        </div>

                        <div className="description">
                            <h2 >Description</h2> 
                            
                            <div className="container">
                              <p>{this.props.obj.description}</p>
                            </div> <br/>
                        </div>
                </ModalBody>
                <ModalFooter>
                    <Row>
                        <Col sm="8" md={{size: 7}}>
                            <Button className={"interestButton"} onClick={() => this.handleInterestClick()}>{this.state.interestButtonText}</Button>
                        </Col>
                        <Col sm="12" md={{size: 5}}>
                            <Button color="secondary" onClick={this.handleCloseClick}>Close</Button>
                        </Col>
                    </Row>
                </ModalFooter>
            </Modal>
        ); //this.handleCloseClick
    }
}
export default TeamCardModal;