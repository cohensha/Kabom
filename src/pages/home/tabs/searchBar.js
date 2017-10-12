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
        if (this.state.searchInput === "") return;
        let array = [];
        this.props.data.map( (obj) => {
           if (obj.name && obj.name.toLowerCase().includes(this.state.searchInput.toLowerCase())) {
               array.push(obj);
           }
        });
        this.props.setresults(array);
        this.setState({searchInput: ""});


    }

    searchByDesc() {
        if (this.state.searchInput === "") return;
        let array = [];
        this.props.data.map( (obj) => {
            if (obj.description && obj.description.toLowerCase().includes(this.state.searchInput.toLowerCase())) {
                array.push(obj);
            }
        });
        this.props.setresults(array);
        this.setState({searchInput: ""});


    }

    searchBySkills() {
        if (this.state.searchInput === "") return;
        let array = [];
        this.props.data.map( (obj) => {
            if (obj.skillsNeeded && obj.skillsNeeded.includes(this.state.searchInput)) {
                array.push(obj);
                console.log(obj.name);
            }
        });
        this.props.setresults(array);
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
                    <Button className="mr-2" onClick={() => this.props.setSeeAll()}>See All</Button>
                </InputGroup>
            </div>
        );
    }
};

export default SearchBar;