import React, {Component} from 'react';
import {TabPane, Row, Col, Input, Button, FormGroup, Label, InputGroup, InputGroupButton} from 'reactstrap';
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
            showPeopleModal: false
        };
        this.ref = database.child(this.props.type);
    }

    componentDidMount() {
        this.ref.limitToFirst(10).once("value").then((snapshot) => {
            if (snapshot.exists()) {
                // Create a data structure to store your data
                let array = [];
                snapshot.forEach(function (childSnapshot) {
                    const item = childSnapshot.val();
                    array.push(item);
                });
                this.setState({originalData: array});
                this.setState({searchResults: array});

            }
        });
    }

    handleClick(data) {
        this.setState({
             selectedObj: data
        });
        this.toggleCardModal();
    }

    toggleCardModal() {
        if (this.props.type == "projects") {
            this.setState({
                showProjectModal: !this.state.showProjectModal
            });
        } else if (this.props.type == "teams") {
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
        let array = [];
        this.state.originalData.map( (obj) => {
            if (obj.name && obj.name.toLowerCase().includes(input.toLowerCase())) {
                array.push(obj);
            }
        });
        this.setState({searchResults: array});
    }

    searchByDesc(input) {
        if (input === "") return;
        let array = [];
        this.state.originalData.map( (obj) => {
            if (obj.description && obj.description.toLowerCase().includes(input.toLowerCase())) {
                array.push(obj);
            }
        });
        this.setState({searchResults: array});
    }

    searchBySkills(input) {
        if (input === "") return;
        let array = [];
        this.state.originalData.map( (obj) => {
            if (obj.skillsNeeded && obj.skillsNeeded.includes(input)) {
                array.push(obj);
            }
        });
        this.setState({searchResults: array});
    }

    setSeeAll() {
        this.setState({searchResults: this.state.originalData});
    }

    render() {
        return(
            <TabPane tabId={this.props.id} className="mt-3">
                <SearchBar
                    searchByName={(input) => this.searchByName(input)}
                    searchByDesc={(input) => this.searchByDesc(input)}
                    searchBySkills={(input) => this.searchBySkills(input)}
                    setSeeAll={() => this.setSeeAll()}
                />
                <Row>
                    {this.state.searchResults.map((d, id) =>
                        <Col key={id} className="m-1 d-inline-block">
                            <DisplayCard className="d-inline-block card"
                                         key={id}
                                         name={d.name}
                                         description={d.description}
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
                />

                <TeamCardModal
                    show={this.state.showTeamModal}
                    obj={this.state.selectedObj}
                    onclick={ () => this.toggleCardModal()}
                />

                <PeopleCardModal
                    show={this.state.showPeopleModal}
                    obj={this.state.selectedObj}
                    onclick={ () => this.toggleCardModal()}
                />
            </TabPane>
        );
        }
    };

export default DisplayTab;