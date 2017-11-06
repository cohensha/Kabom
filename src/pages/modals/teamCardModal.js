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
            userInterestOriginal: false,
            userInterestUpdated: false
        };

        //read if user is interested in team from db
        this.teamIdRef = database.child("users/" + this.props.uid + "/team");
        this.handleCloseClick = this.handleCloseClick.bind(this);

        this.interestedUsersRef = database.child("teams/" + this.props.teamId + "/interestedUsers")



    }

    getButtonText() {
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

        this.getButtonText();


    }

    componentDidMount() {

        this.setState({
            userInterestOriginal: false,
            userInterestUpdated: false
        });
        //set userinterestedoriginal and updated

        //look at team's list of users interested
        this.interestedUsersRef.once("value").then((sp)=>

        {
            if(sp.exists()) {

                console.log("reading team interested users to add to set original and buid array to publish to db");

                //for each

                //if value is current user id - then set interested values to true

                //add item to state array
            }
            else {
                console.log("not reading interested users");
            }

        });


        //set text for button


        this.getButtonText();

        //loop through this.props.obj.interestedUsers



    }

    handleCloseClick() {
        console.log("closing team card modal");
       // this.props.onclick;

     if(this.state.userInterestOriginal != this.state.userInterestUpdated) {
         if(this.state.userInterestUpdated) {
             console.log("writing user is interested to db");
         }
         else {

             console.log("writing user is not interested to db");
         }
     }
     else {
        console.log("user interested unchanged");
     }
        this.toggle();

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
        ); //this.handleCloseClick
    }
}
export default TeamCardModal;