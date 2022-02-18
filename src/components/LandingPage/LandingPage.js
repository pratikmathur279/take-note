import React from 'react';
import { isMobile } from "react-device-detect";

import Login from '../common/login';
import Logout from '../common/logout';

import UserActions from '../../actions/userActions';

import UserStore from '../../stores/userStore';

class LandingPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isDemo: false,
			user: {}
		}

		this.setUser = this.setUser.bind(this);
		this._onChange = this._onChange.bind(this);
		this.logoutUser = this.logoutUser.bind(this);
		this.actions = new UserActions();
	}

	componentWillMount() {
		UserStore.addChangeListener(this._onChange);
	}

	componentWillUnmount() {

	}

	_onChange() {
		let user = UserStore.getUser();
		console.log(user);
		this.setState({ user });
	}

	setUser(data) {
		this.actions.setCurrentUser(data);
	}

	logoutUser() {
		this.actions.logoutUser((data) => {
			console.log(data);
		});
	}

	render() {

		return (
			<section className="landing-page">
				<section className="content">
					<div className="container">
						<div className="lead">
							<img src='/images/logo.png' className="app-logo logo" alt="TakeNote" />
							<h1>The Note Taking App<br /> for Developers</h1>
							<p className="subtitle">A web-based notes app for developers.</p>
							{isMobile ?
								<p className="p-mobile">
									TakeNote is not currently supported for tablet and mobile devices.
								</p>
								:
								<div className="new-signup">
									<div>
										<p>TakeNote is available as a full stack application. Your notes will persist in a cloud, and store the data in a private{' '}<code>takenotes-data</code> repo.</p>
										<Login
											user={this.state.user}
											logoutUser={this.logoutUser}
										/>
									</div>
								</div>
							}
						</div>
					</div>

					<div className="container">
						<img src="/images/screenshot-light.png" alt="TakeNote App" className="screenshot" />
					</div>
				</section>

				<section className="content">
					<div className="container">
						<div className="features">
							<h2 className="text-center">Features</h2>
							<ul>
								<li>
									<strong>Plain text notes</strong> - take notes in an IDE-like environment that makes no assumptions
								</li>
								<li>
									<strong>Markdown preview</strong> - view rendered HTML
								</li>
								<li>
									<strong>Linked notes</strong> - use <code>{`{{uuid}}`}</code> syntax to link to
									notes within other notes
								</li>
								<li>
									<strong>Syntax highlighting</strong> - light and dark mode available (based on the beautiful <a href="https://taniarascia.github.io/new-moon/">New Moon theme</a>)
								</li>
								<li>
									<strong>Keyboard shortcuts</strong> - use the keyboard for all common tasks - creating notes and categories, toggling settings, and other options
								</li>
								<li>
									<strong>Drag and drop</strong> - drag a note or multiple notes to categories, favorites, or trash
								</li>
								<li>
									<strong>Multi-cursor editing</strong> - supports multiple cursors and other{' '} <a href="https://codemirror.net/">Codemirror</a> options
								</li>
								<li>
									<strong>Search notes</strong> - easily search all notes, or notes within a category </li>
								<li>
									<strong>Prettify notes</strong> - use Prettier on the fly for your Markdown
								</li>
								<li>
									<strong>No WYSIWYG</strong> - made for developers, by developers
								</li>
								<li>
									<strong>No database</strong> - notes are only stored in the browser&#39;s local storage and are available for download and export to you alone
								</li>
								<li>
									<strong>No tracking or analytics</strong>
								</li>
								<li>
									<strong>GitHub integration</strong> - self-hosted option is available for auto-syncing to a GitHub repository (not available in the demo)
								</li>
							</ul>
						</div>
					</div>

					<div className="container">
						<img src="/images/screenshot-dark.png" alt="TakeNote App" className="screenshot" />
					</div>
				</section>

				<footer className="footer">
					<div className="container">
						<img src="/images/logo-square-white.svg" alt="TakeNote App" className="logo" />
						<p>
							<strong>TakeNote</strong>
						</p>
						<nav>
							<a href="https://github.com/pratikmathur279/take-note" target="_blank" rel="noopener noreferrer" >Source Code</a>
						</nav>
					</div>
				</footer>
			</section>
		)
	}
}

export default LandingPage;