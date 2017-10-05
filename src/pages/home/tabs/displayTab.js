import React, {Component} from 'react';

import {TabPane, Row, Col, Modal} from 'reactstrap';

import DisplayCard from '../cards/displayCard';
import CardModal from '../../modals/cardModal';


class DisplayTab extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedObj: {name: ''},
            showCardModal: false,
        }
    }

    handleClick(data) {
        console.log("here");
        console.log(data);
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

    render() {
        return(
            <TabPane tabId={this.props.id} className="mt-3">
                <Row>
                    {this.props.data.map((d, id) =>
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