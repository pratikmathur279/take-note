import React from 'react';

import Navigation from '../Navigation/navigation';
import RenderComponent from './renderComponent';

import NoteActions from '../../actions/noteActions';
import UserActions from '../../actions/userActions';
import UserStore from '../../stores/userStore';

class Homepage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentStep: 'notes',
			user: {
				email: "pratikmathur279@gmail.com",
				email_verified: true,
				last_name: "Mathur",
				first_name: "Pratik",
				locale: "en-GB",
				name: "Pratik Mathur",
				nickname: "pratikmathur2791",
				username: 'pmathur',
				picture: "https://lh3.googleusercontent.com/a-/AOh14GiFQTrT7h0FPUIsOHJIhruSxXaRMwnrOBPhdKun_g=s96-c",
				sub: "google-oauth2|112194558552527195279",
				updated_at: "2021-05-10T22:44:06.901Z"
			},
		}

		this.setCurrentStep = this.setCurrentStep.bind(this);
		this._onChange = this._onChange.bind(this);

		this.noteActions = new NoteActions();
		this.userActions = new UserActions();
	}

	componentDidMount() {
		UserStore.addChangeListener(this._onChange);
		let user = UserStore.getUser();

		this.setState({ user });

		this.noteActions.getNotes(this.state.user.email);
	}

	componentWillUnmount() {
		UserStore.removeListener("CHANGE", this._onChange);
	}

	_onChange = () => {
		let state = Object.assign({}, this.state);
		let user = UserStore.getUser();

		state.user = user;
		this.setState(state);
	}

	setCurrentStep(step) {
		this.setState({ currentStep: step });
	}

	render() {
		return (
			<div className="homepage">
				<Navigation
					{...this.state}
					setCurrentStep={this.setCurrentStep}
				/>

				<div className="container">
					<RenderComponent
						{...this.state}
					/>
				</div>
			</div>
		);
	}

}

export default Homepage;