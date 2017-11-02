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
            interestedUsersArray: [],
            userInterest: false
        };

        this.teamIdRef = database.child("users/" + this.props.uid + "/team");

    }


    handleInterestClick() {
        //team object is this.props.obj
        this.setState({
           userInterest: !this.state.userInterest
        });
        if(this.state.userInterest) {
            console.log("expressing interest");
            this.setState({
                interestButtonText: "Interest sent to team!"
            });
        }
        else {
            console.log("unexpressing interest");
            this.setState({
               interestButtonText: "Express interest to team!"
            });
        }

        //get array of team interested users

        //push value onto array

        //update array

    }

    componentDidMount() {
        // this.teamIdRef.once("value").then((teamIdSnapshot) => {
        //     if (teamIdSnapshot.exists()) {
        //         this.setState({myTeamId: teamIdSnapshot.val()});
        //         console.log(teamIdSnapshot.val());
        //
        //         database.child("teams/" + teamIdSnapshot.val() + "/interestedUsers").once("value").then((sp) => {
        //             if(sp.exists()) {
        //                 console.log("reading users interested");
        //                 let array= [];
        //                 sp.forEach(function(childSnapshot) {
        //                     const item = childSnapshot.val();
        //                     arrayIds.push(item);
        //                     // console.log("user interested: " + item);
        //
        //                     //for each interested user, pull their data using uid's and add to array
        //                     database.child("/users/" + item).once("value").then((snapshot) => {
        //                         if(snapshot.exists()) {
        //                             array.push(snapshot.val());
        //                         }
        //
        //                     });
        //
        //                 });
        //                 this.setState({interestedUsersArray: array});
        //                 //sets interested user array in state
        //             }
        //
        //         });
        //     }
        // });
    }

    handleCloseClick() {
        this.props.onclick;

        console.log("closing team card modal");

        //TODO FOR EXPRESSING INTEREST:
            // if user interest is true,
            // add team to user's set of team they're interested in

            //add user to team's array of interested users

        //when mounting - check db to see



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
        );
    }
}
export default TeamCardModal;