import React, {Component} from 'react';
import { database, auth } from '../../../firebase/constants';
import {uscSchools, schoolYears} from "../../../constants/lists";


import {Input, FormGroup, Label, DropdownToggle, Button, ButtonDropdown,
    DropdownItem, DropdownMenu, InputGroup, InputGroupButton, Badge, Alert} from 'reactstrap';

class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchInput: "",
            dropdownOpen: false,
            allSkills: [],
            categories: [],
            schools: [],
            selectedFilter: [],
            searchType: '',
            filterDropdownOpen: false,
            selectedItems: [],
            searchNameSelected: true,
            showRedAlert: false,
            errorMsg: '',
            selectedItem: null,

        }
    }

    componentDidMount() {
        database.child("generalSkills").once("value").then((s) => {
            if (s.exists()) {
                let array = [];
                s.forEach((childSnap) => {
                    array.push(childSnap.key);
                });
                this.setState({ allSkills: array });
            }
        });

        database.child("generalProjectTypes").once("value").then((s) => {
            if (s.exists()) {
                let array = [];
                s.forEach((childSnap) => {
                    array.push(childSnap.key);
                });
                this.setState({ categories: array });
            }
        });

        this.setState({ schools: uscSchools });
    }

    dismiss(color) {
        if (color === "red")
            this.setState({ showRedAlert: false });
    }

    // searchByName() {
    //     this.props.searchByName(this.state.searchInput);
    //     this.setState({searchInput: ""});
    // }

    searchByDesc() {
        this.props.searchByDesc(this.state.searchInput);
        this.setState({searchInput: ""});
    }

    // searchBySkills() {
    //     this.props.searchBySkills(this.state.searchInput);
    //     this.setState({searchInput: ""});
    //
    // }

    search(type) {
        if (type === "") {
            this.setState({
                showRedAlert: true,
                errorMsg: "Oops! Please select a search filter."
            });
            return;
        }

        if (type === "Name") {
           this.props.searchByName(this.state.searchInput);
        }

        if (type === "Skills") {
            if (this.state.selectedItems.length === 0) {
                this.setState({
                    showRedAlert: true,
                    errorMsg: "Oops! Please select search attributes."
                });
                return;
            }
            console.log(this.state.selectedItems);
            //TODO FIGURE out this error message ??
            this.props.searchBySkills(this.state.selectedItems);
        }

        if (type === "Categories") {
            if (this.state.selectedItems.length === 0) {
                this.setState({
                    showRedAlert: true,
                    errorMsg: "Oops! Please select search attributes."
                });
                return;
            }
            //console.log(this.state.selectedItems);
            this.props.searchByCategories(this.state.selectedItems);
        }

        if (type === "School") {
            if (this.state.selectedItems.length === 0) {
                this.setState({
                    showRedAlert: true,
                    errorMsg: "Oops! Please select a search attributes."
                });
                return;
            }
            if (this.props.type !== "users") {
                this.setState({
                    showRedAlert: true,
                    selectedItems: [],
                    errorMsg: "Oops! This filter only applies to users."
                });
                return;
            }
            //console.log(this.state.selectedItems);
            this.props.searchBySchool(this.state.selectedItems);

        }
    }

    toggleDropdown() {
        this.setState({dropdownOpen: !this.state.dropdownOpen});
    }


    onSearchChange(event) {
        this.setState({searchInput: event.target.value});
    }

    toggleFilterDropdown() {
        this.setState({filterDropdownOpen: !this.state.filterDropdownOpen});
    }

    showSkills() {
        this.setState({
            searchInput: '',
            searchType: 'Skills',
            searchNameSelected: false,
            selectedItems: [],
            selectedFilter: this.state.allSkills,
        });
    }

    showCategories() {
        this.setState({
            searchInput: '',
            searchType: 'Categories',
            searchNameSelected: false,
            selectedItems: [],
            selectedFilter: this.state.categories,
        });
    }

    showName() {
        this.setState({
            searchInput: '',
            searchType: 'Name',
            selectedItems: [],
            searchNameSelected: true,
        });
    }

    showSchools() {
        this.setState({
            searchInput: '',
            searchType: 'School',
            selectedItems: [],
            searchNameSelected: false,
            selectedFilter: this.state.schools,
        });
    }

    addItem (e) {
        if (e.target.value === 'Click For Options') {
            return;
        }
        else {
            this.setState({
                selectedItems: this.state.selectedItems.concat([e.target.value])
            });
        }
    }

    deleteBadge (index) {
        var newArray = this.state.selectedItems.filter(function (e, i) {
            return i !== index;
        });
        this.setState({selectedItems: newArray});
    }

    setSeeAll() {
        this.setState({
            selectedItems: [],
            searchInput: '',
        });
        this.props.setSeeAll();
    }

    render() {
        return(
            <div>
                {/*<InputGroup className="mb-2">*/}
                    {/*<Input placeholder="Search..." value={this.state.searchInput} onChange={(e) => this.onSearchChange(e)}/>*/}
                    {/*<InputGroupButton>*/}
                        {/*<ButtonDropdown isOpen={this.state.dropdownOpen} toggle={() => this.toggleDropdown()}>*/}
                            {/*<DropdownToggle caret>*/}
                                {/*Search*/}
                            {/*</DropdownToggle>*/}

                            {/*<DropdownMenu className={this.state.dropdownOpen && 'show'}>*/}
                                {/*<DropdownItem onClick={() => this.searchByName()}>Search By Name</DropdownItem>*/}
                                {/*<DropdownItem onClick={() => this.searchBySkills()}>Search By Skills</DropdownItem>*/}
                                {/*<DropdownItem onClick={() => this.searchByDesc()}>Search By Description</DropdownItem>*/}
                            {/*</DropdownMenu>*/}
                        {/*</ButtonDropdown>*/}
                    {/*</InputGroupButton> {' '}*/}
                    {/*<Button className="mr-2" onClick={() => this.props.setSeeAll()}>Reset</Button>*/}
                {/*</InputGroup>*/}

                {/*FILTER*/}
                <FormGroup>
                    <InputGroup>
                        <InputGroupButton>
                            <ButtonDropdown isOpen={this.state.filterDropdownOpen} toggle={() => this.toggleFilterDropdown()}>
                                <DropdownToggle caret>
                                    Search By {' ' + this.state.searchType}
                                </DropdownToggle>

                                <DropdownMenu className={this.state.filterDropdownOpen && 'show'}>
                                    <DropdownItem onClick={() => this.showName()}>Search By Name</DropdownItem>
                                    <DropdownItem onClick={() => this.showSkills()}>Search By Skills</DropdownItem>
                                    <DropdownItem onClick={() => this.showCategories()}>Search By Categories</DropdownItem>
                                    <DropdownItem onClick={() => this.showSchools()}>Search By School</DropdownItem>
                                </DropdownMenu>
                            </ButtonDropdown>
                        </InputGroupButton> {' '}
                        {this.state.searchNameSelected &&
                            <Input placeholder="Search..."
                                   value={this.state.searchInput}
                                   onChange={(e) => this.onSearchChange(e)}
                            />
                        }

                        {!this.state.searchNameSelected &&
                            <Input type="select"
                                //value={this.state.selectedSkill}
                                onChange={(e) => this.addItem(e)}
                            >
                                <option>Click For Options</option>
                                {this.state.selectedFilter.map( (skill, idx) =>
                                    <option key={idx}
                                            value={skill}>
                                        {skill}
                                    </option>
                                )}
                            </Input>
                        }
                        <Button className="mr-2" onClick={() => this.search(this.state.searchType)}>Search</Button>
                    </InputGroup>
                    <Alert color="danger" isOpen={this.state.showRedAlert} toggle={() => this.dismiss("red")}>
                        {this.state.errorMsg}
                    </Alert>
                    {this.state.selectedItems.map( (skill, idx) =>
                        <Badge href="#"
                               key={idx}
                               id={"skillBadge"}
                               color="primary"
                               onClick={this.deleteBadge.bind(this, idx)}>
                            {skill}
                        </Badge>
                    )}
                </FormGroup>
                <Button className="mr-2" onClick={() => this.setSeeAll()} block>Reset Search Filters</Button>

                {/*FILTER*/}

            </div>
        );
    }
}

export default SearchBar;