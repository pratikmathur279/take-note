import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect
} from 'react-router-dom';

import { withAuthenticationRequired } from "@auth0/auth0-react";

import LandingPage from './components/LandingPage/LandingPage';
import Homepage from './components/Homepage/Homepage';
import LoginPage from './components/Auth/loginPage';
import ProfilePage from './components/Profile/profilePage';
import AppMenu from './components/Navigation/appMenu';

import Navigation from './components/Navigation/navigation';


function requireAuth(nextState, replaceState) {
	let loggedIn = localStorage.getItem('sessionId');
	if (!loggedIn) {
		window.location.href = "/login";
		return false;
	}
	else {
		// logged in
		return true;
	}
}

const LayoutComponent = (props) => {
	if (requireAuth()) {
		return (
			<div className="app">
				<AppMenu />
				<Switch>
					<Route path="/profile" component={ProfilePage} />
					<Route path="/app" component={Homepage} />
				</Switch>
			</div>
		)
	}
	else {
		return null;
	}
}

var routes = (
	<Router>
		<Switch>
			<Route exact path="/" component={LandingPage} />
			<Route path="/login" component={LoginPage} />
			<Route component={LayoutComponent} />
		</Switch>
	</Router>
);
export default routes;
