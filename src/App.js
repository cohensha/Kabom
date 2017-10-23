import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { auth } from './firebase/constants';
import {Home, Login, CreateProfile, ViewProfile, Header, ProjectProfile} from './pages';

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
                console.log("user signed out");
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
                <PrivateRoute exact authed={this.state.authed} path="/" component={Home} />
            </div>
            </Router>
        );
    }
}

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