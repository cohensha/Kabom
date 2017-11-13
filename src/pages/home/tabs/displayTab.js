import React, {Component} from 'react';
import {TabPane, Row, Col, FormGroup, Label, Input, InputGroup, InputGroupButton, Button} from 'reactstrap';
import DisplayCard from '../cards/displayCard';
import ProjectCardModal from '../../modals/projectCardModal';
import TeamCardModal from '../../modals/teamCardModal';
import PeopleCardModal from '../../modals/peopleCardModal';
import SearchBar from './searchBar';
import { database, auth } from '../../../firebase/constants';

class DisplayTab extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedObj: {name: ''},
            radioButtonNames: ["Name", "Description", "Number of Members Needed", "Skills"],
            searchResults: [],
            originalData: [],
            showProjectModal: false,
            showTeamModal: false,
            showPeopleModal: false,
            currUser: null,
            allSkills: [],
        };
        this.ref = database.child(this.props.type);
        this.userRef = database.child("users/" + auth().currentUser.uid);
    }

    componentDidMount() {
        this.ref.limitToFirst(25).once("value").then((snapshot) => {
            if (snapshot.exists()) {
                // Create a data structure to store your data
                let array = [];
                snapshot.forEach(function (childSnapshot) {
                    //append uid to object stored client side
                    const item = childSnapshot.val();

                    item.itemId = childSnapshot.key;
                    // console.log(item);

                    if (item) {
                        if (item.owner) {
                            database.child("users/" + item.owner + "/name/").once("value").then((snap) => {
                               if (snap.exists()) {
                                   item["ownerName"] = snap.val();
                               }
                            });
                        }
                        item["id"] = childSnapshot.key;
                    }

                    array.push(item);
                });
                this.setState({originalData: array});
                this.setState({searchResults: array});

            }
        });
        this.userRef.once("value").then((sp) => {
            if (sp.exists()) {
                this.setState({ currUser: sp.val() });
            }

        });

        database.child("skills/users").once("value").then((s) => {
           if (s.exists()) {
               let array = [];
               s.forEach((childSnap) => array.push(childSnap.key));
               this.setState({ allSkills: array });
           }
        });

    }

    handleClick(data) {
        console.log(data);
        this.setState({
             selectedObj: data,
        });
        this.toggleCardModal();
    }

    toggleCardModal() {
        if (this.props.type === "projects") {
            this.setState({
                showProjectModal: !this.state.showProjectModal
            });
        } else if (this.props.type === "teams") {
            this.setState({
                showTeamModal: !this.state.showTeamModal
            });
        } else {
            this.setState({
                showPeopleModal: !this.state.showPeopleModal
            });
        }
    }

    searchByName(input) {
        if (input === "") return;
        this.ref.orderByChild("name").equalTo(input).once("value").then( (snapshot) => {
            console.log("in callback");
            let array = [];
            snapshot.forEach(function (childSnapshot) {
                let item = childSnapshot.val();
                if (item) {
                    if (item.owner) {
                        database.child("users/" + item.owner + "/name/").once("value").then((snap) => {
                            if (snap.exists()) {
                                item["ownerName"] = snap.val();
                            }
                        });
                    }
                    item["id"] = childSnapshot.key;
                }
                array.push(item);
            });
            this.setState({searchResults: array});
        });

    }

    /*******
     * Search by project types/categories of interest
     * @param input
     ********/
    searchByCategories(input) {
        this.setState({ searchResults: [] });
        let uniqueMap = new Map();
        input.map((cat) => {
            database.child("projectTypes/" + this.props.type + "/" + cat).once("value").then((snaps) => {
                if (snaps.exists()) {
                    snaps.forEach((s) => {
                        database.child(this.props.type + "/" + s.val()).once("value").then((obj) => {
                            let item = obj.val();
                            if (item) {
                                if (item.owner) {
                                    database.child("users/" + item.owner + "/name/").once("value").then((snap) => {
                                        if (snap.exists()) {
                                            item["ownerName"] = snap.val();
                                        }
                                    });
                                }
                                item["id"] = obj.key;
                            }
                            //result.add(item);
                            //if (result.has)
                            if (!uniqueMap.has(obj.key)) {
                                uniqueMap.set(obj.key, item);
                                this.setState({
                                    searchResults: this.state.searchResults.concat([item]),
                                });
                            }
                        });
                    });
                }
            });
        });
    }

    /********
     * For each skill the user is filtering by, get the uids associated with that skill
     * for each uid, get the user/team/proj object and concat search results array
     * but only if it hasn't been inserted already!
     * @type {Map}
     *********/
    searchBySkills(input) {
        //OLD WAY... NOT sure if needed
        // let set = new Set();
        // input.map((skill) => {
        //     this.ref.orderByChild("skills/"+skill).equalTo(true).on("value", (snapshot) => {
        //         console.log("in callback");
        //         let array = [];
        //         snapshot.forEach(function (childSnapshot) {
        //             let item = childSnapshot.val();
        //             if (item) {
        //                 item["id"] = childSnapshot.key;
        //             }
        //             array.push(item);
        //             console.log(item);
        //         });
        //         this.setState({searchResults: array});
        //     });
        // });

        this.setState({ searchResults: [] });
        let uniqueMap = new Map();
        input.map((skill) => {
           database.child("skills/" + this.props.type + "/" + skill).once("value").then((snaps) => {
              if (snaps.exists()) {
                  snaps.forEach((s) => {
                      database.child(this.props.type + "/" + s.val()).once("value").then((obj) => {
                          let item = obj.val();
                          if (item) {
                              if (item.owner) {
                                  database.child("users/" + item.owner + "/name/").once("value").then((snap) => {
                                      if (snap.exists()) {
                                          item["ownerName"] = snap.val();
                                      }
                                  });
                              }
                              item["id"] = obj.key;
                          }
                          //result.add(item);
                          //if (result.has)
                          if (item && !uniqueMap.has(obj.key)) {
                              uniqueMap.set(obj.key, item);
                              this.setState({
                                  searchResults: this.state.searchResults.concat([item]),
                              });
                          }
                      });
                  });
              }
           });
        });
    }

    /***
     * Queries firebase for matching school field
     * @param input
     */
    searchBySchool(input) {
        this.setState({ searchResults: [] });

        let uniqueMap = new Map();
        input.map((school) => {
            let arr = [];
            this.ref.orderByChild("school").equalTo(school).once("value").then( (snapshot) => {
                snapshot.forEach(function (childSnapshot) {
                    let item = childSnapshot.val();
                    if (item) {
                        if (item.owner) {
                            database.child("users/" + item.owner + "/name/").once("value").then((snap) => {
                                if (snap.exists()) {
                                    item["ownerName"] = snap.val();
                                }
                            });
                        }
                        item["id"] = childSnapshot.key;
                    }
                    if (item && !uniqueMap.has(childSnapshot.key)) {
                        console.log("dup");
                        console.log(childSnapshot.key);
                        uniqueMap.set(childSnapshot.key, item);
                        arr.push(item);
                    }
                });
                this.setState({searchResults: this.state.searchResults.concat(arr)});
            });

        });
    }

    setSeeAll() {
        this.setState({searchResults: this.state.originalData});
    }

    render() {
        return(
            <TabPane tabId={this.props.id} className="mt-3">
                <SearchBar
                    searchByName={(input) => this.searchByName(input)}
                    searchByCategories={(input) => this.searchByCategories(input)}
                    searchBySkills={(input) => this.searchBySkills(input)}
                    searchBySchool={(input) => this.searchBySchool(input)}
                    type={this.props.type}
                    setSeeAll={() => this.setSeeAll()}
                />

                {(this.state.searchResults.length === 0) && <p>Oops! No Results Found.</p>}
                <Row>
                    {this.state.searchResults.map((d, id) =>

                        <Col key={id} className="m-1 d-inline-block">
                            <DisplayCard className="d-inline-block card"
                                         key={id}
                                         name={d.name}
                                         description={d.description}
                                         lookingForMembers={d.lookingForMembers}
                                         src={d}
                                         onclick={ () => this.handleClick(d) }
                            />
                        </Col>
                    )}
                </Row>

                <ProjectCardModal
                    show={this.state.showProjectModal}
                    obj={this.state.selectedObj}
                    onclick={ () => this.toggleCardModal()}
                    currUser={this.state.currUser}
                />

                <TeamCardModal

                    show={this.state.showTeamModal}
                    obj={this.state.selectedObj}
                    onclick={ () => this.toggleCardModal()}
                    currUser={this.state.currUser}
                />

                <PeopleCardModal
                    show={this.state.showPeopleModal}
                    obj={this.state.selectedObj}
                    onclick={ () => this.toggleCardModal()}
                    currUser={this.state.currUser}
                />
            </TabPane>
        );
        }
}

export default DisplayTab;