import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { auth } from './config/constants';

import {Home, Login} from './pages';
import {CreateProfile} from './pages';
import {ViewProfile} from './pages';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authed: false,
        };
    }

    componentDidMount() {
        this.fireBaseListener = auth().onAuthStateChanged((user) => {
            if (user) {
                console.log('user changed..', user);
                this.setState({ authed : true });
            } else {
                // No user is signed in.
            }
        });
    }

    componentWillUnmount () {
            this.fireBaseListener && this.fireBaseListener();
            this.setState({ authed: false });
    }

    render() {
        return (
            <Router>
            <div>
                <Route path="/login/" component={Login} />
                <PrivateRoute authed={this.state.authed} path ="/createprofile" component={CreateProfile}/>
                <Route path="/viewprofile/" component={ViewProfile} />

                <PrivateRoute exact authed={this.state.authed} path="/" component={Home} />
            </div>
            </Router>
        );
    }
}
                 // <Route path="/createprofile/" component={CreateProfile} />
                                 // <PrivateRoute authed={this.state.authed} path ="/viewprofile" component={viewprofile}/>




function PrivateRoute ({component: Component, authed, ...rest}) {
    return (
        <Route
            {...rest}
            render={(props) => authed === true
                ? <Component {...props} />
                : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
        />
    )
}


export default App;