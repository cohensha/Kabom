import React, {Component} from 'react';

import {TabPane, Row, Col, Input, Button, FormGroup, Label, InputGroup, InputGroupButton} from 'reactstrap';

import DisplayCard from '../cards/displayCard';
import CardModal from '../../modals/cardModal';
import SearchBar from './searchBar';

import { database, auth } from '../../../firebase/constants';


class DisplayTab extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedObj: {name: ''},
            showCardModal: false,
            radioButtonNames: ["Name", "Description", "Number of Members Needed", "Skills"],
            searchResults: [],
            originalData: [],
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
        this.setState({
            showCardModal: !this.state.showCardModal
        });
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
                            <DisplayCard className="d-inline-block"
                                         key={id}
                                         name={d.name}
                                         description={d.description}
                                         src={d}
                                         onclick={ () => this.handleClick(d) }
                            />
                        </Col>
                    )}
                </Row>
                <CardModal
                    show={this.state.showCardModal}
                    obj={this.state.selectedObj}
                    onclick={ () => this.toggleCardModal() }
                />
            </TabPane>
        );
        }
    };

export default DisplayTab;