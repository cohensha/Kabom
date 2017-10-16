import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { auth } from './firebase/constants';


//add import for other routed components here, just append to the list
import {Home, Login, CreateProfile, Header} from './pages';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authed: false,
        };
    }

    componentDidMount() {
        //this listener check when a user has logged in using onAuthStateChanged
        this.fireBaseListener = auth().onAuthStateChanged((user) => {
            if (user) {
                //if user has logged in, setState of authed to true
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
        //two classes: Route and PrivateRoute
        //PrivateRoute needs this.state.authed to be true in order to go to that page
        //Route is a public route that anyone can access without logging in
        //Route compeonents should be imported at the top, which should be resolved from
        //./pages/index.js --> make sure to list component here to import
        return (
            <Router>
            <div>
                {/*Add Routes Here!*/}
                <Route path="/login/" component={Login} />
                <PrivateRoute authed={this.state.authed} path ="/createprofile" component={CreateProfile}/>
                <PrivateRoute exact authed={this.state.authed} path="/" component={Home} />
            </div>
            </Router>
        );
    }
}

function PrivateRoute ({component: Component, authed, ...rest}) {

    //authed is passed in as a prop and component to route to is passed in as a prop
    //if authed is true, render the component
    //else render login page
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