import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import {Home, Login} from './pages';
import {CreateProfile} from './pages';


const App = () => (
    <Router>
        <div>
            <Route path="/login/" component={Login} />
        	<PrivateRoute authed={false} path ="/createprofile" component={CreateProfile}/>
            <PrivateRoute exact authed={false} path="/" component={Home} />
        </div>
    </Router>
);

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