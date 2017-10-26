import React , {Component} from 'react';
import './notfound-style.css';
import {Navbar, NavItem, NavLink, Nav, Button} from 'reactstrap';
import { Redirect } from 'react-router-dom';


class NotFound extends  Component {
    constructor(props) {
        super(props);

        this.redirectHome= this.redirectHome.bind(this);
        this.state = {
            clickedHome: false
        }

    }

    redirectHome() {
        // return ( <Redirect to={'/'}/> );
        this.setState({
            clickedHome: true
        })
    }

    render() {

        if (this.state.clickedHome) {
            return ( <Redirect to={'/'}/> );
        }
      return (
          <div>
              <div id="header">
                    <Navbar>
                        <Nav>
                            <h1 href="/" className="d-inline-block">Kabom</h1>


                        </Nav>
                    </Navbar>
              </div>

            <div id="content">
                <h3>404 page not found</h3>
                <p>We are sorry but the page you are looking for does not exist.</p>

                <Button className={"button"} onClick={this.redirectHome}>Go back home</Button>
            </div>

        </div>
      );
    }
}
// const NotFound = () =>

export default NotFound;