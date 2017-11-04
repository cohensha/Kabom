import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { auth } from './firebase/constants';
import {Home, Login, CreateProfile, Header, NotFound, SearchPage} from './pages';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authed: false,
        };
    }

    componentDidMount() {
        console.log("1");
        console.log(this.state.authed);
        this.fireBaseListener = auth().onAuthStateChanged((user) => {
            if (user) {
                console.log('user changed..', user);
                this.setState({ authed : true });
                console.log("2");
            } else {
                // No user is signed in.
                console.log("user signed out");
            }
        });
    }

    componentWillUnmount () {
        console.log("3");
            this.fireBaseListener && this.fireBaseListener();
        console.log("4");
            this.setState({ authed: false });
    }

    render() {
        return (
            <Router>
            <div>
                <Switch>
                    <Route path="/login/" component={Login} />
                    <PrivateRoute authed={this.state.authed} path ="/createprofile" component={CreateProfile}/>
                    <PrivateRoute exact authed={this.state.authed} path="/" component={Home} />
                    <PrivateRoute authed={this.state.authed} path ='/searchpage' component={SearchPage}/>
                    {/*<Route component={SearchPage}/>*/}
                    <Route component={NotFound} />
                </Switch>
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