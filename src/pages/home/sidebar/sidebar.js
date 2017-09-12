import React, {Component} from 'react';
import {Card, CardBlock, Collapse, ListGroup, ListGroupItem, Badge} from 'reactstrap';


class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            teamRequestCollapse: false,
            projectRequestCollapse: false,
            myTeamsCollapse: false,
            myProjectsCollapse: false,
        };
    }

    toggle(collapse) {
        if (collapse === 'teamreq')
            this.setState({ teamRequestCollapse: !this.state.teamRequestCollapse });
        else if (collapse === 'projectreq')
            this.setState({ projectRequestCollapse: !this.state.projectRequestCollapse });
        else if (collapse === 'team')
            this.setState({ myTeamsCollapse: !this.state.myTeamsCollapse });
        else if (collapse === 'project')
            this.setState({ myProjectsCollapse: !this.state.myProjectsCollapse });
    }

    render() {
        return (
            <div className="ml-auto ml-5 pl-2">
                <p />
                <p onClick={() => this.toggle('teamreq')}> Team Requests </p>
                <Collapse isOpen={this.state.teamRequestCollapse}>
                    <ListGroup className="mr-3 mb-3">
                        <ListGroupItem>Team 1</ListGroupItem>
                        <ListGroupItem>cool Teamsz</ListGroupItem>
                    </ListGroup>
                </Collapse>
                <p onClick={() => this.toggle('projectreq')}> Project Requests </p>
                <Collapse isOpen={this.state.projectRequestCollapse}>
                    <ListGroup className="mr-3 mb-3">
                        <ListGroupItem>Awesome project</ListGroupItem>
                        <ListGroupItem>super galactic cool projectakjfkljal</ListGroupItem>
                    </ListGroup>
                </Collapse>
                <p onClick={() => this.toggle('team')}> My teams </p>
                <Collapse isOpen={this.state.myTeamsCollapse}>
                    <ListGroup className="mr-3 mb-3">
                        <ListGroupItem>Look at my teams</ListGroupItem>
                        <ListGroupItem>we are cool teams</ListGroupItem>
                    </ListGroup>
                </Collapse>
                <p onClick={() => this.toggle('project')}> My Projects </p>
                <Collapse isOpen={this.state.myProjectsCollapse}>
                    <ListGroup className="mr-3 mb-3">
                        <ListGroupItem>project pro ject</ListGroupItem>
                        <ListGroupItem>kabom project</ListGroupItem>
                    </ListGroup>
                </Collapse>
            </div>
        );
    }
}

export default Sidebar;
