import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import {Home, Login} from './pages';
import {CreateProfile} from './pages';


const App = () => (
    <Router>
        <div>
            <Route exact path="/" component={Home} />
            <Route path="/login/" component={Login} />
        	<Route path ="/createprofile" component={CreateProfile}/>
        </div>
    </Router>
);

export default App;