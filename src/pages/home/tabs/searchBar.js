import React, {Component} from 'react';

import {Input, DropdownToggle, Button, ButtonDropdown, DropdownItem, DropdownMenu, InputGroup, InputGroupButton} from 'reactstrap';

class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchInput: "",
            dropdownOpen: false,
        }
    }

    searchByName() {
        this.props.searchByName(this.state.searchInput);
        this.setState({searchInput: ""});
    }

    searchByDesc() {
        this.props.searchByDesc(this.state.searchInput);
        this.setState({searchInput: ""});
    }

    searchBySkills() {
        this.props.searchBySkills(this.state.searchInput);
        this.setState({searchInput: ""});

    }

    toggleDropdown() {
        this.setState({dropdownOpen: !this.state.dropdownOpen});
    }


    onSearchChange(event) {
        this.setState({searchInput: event.target.value});
        //console.log(this.state.searchInput);
    }


    render() {
        return(
            <div>
                <InputGroup className="mb-2">
                    <Input placeholder="Search..." value={this.state.searchInput} onChange={(e) => this.onSearchChange(e)}/>
                    <InputGroupButton>
                        <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={() => this.toggleDropdown()}>
                            <DropdownToggle caret>
                                Search
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={() => this.searchByName()}>Search By Name</DropdownItem>
                                <DropdownItem onClick={() => this.searchBySkills()}>Search By Skills</DropdownItem>
                                <DropdownItem onClick={() => this.searchByDesc()}>Search By Description</DropdownItem>
                            </DropdownMenu>
                        </ButtonDropdown>
                    </InputGroupButton> {' '}
                    <Button className="mr-2" onClick={() => this.props.reset()}>Reset</Button>
                </InputGroup>
            </div>
        );
    }
};

export default SearchBar;