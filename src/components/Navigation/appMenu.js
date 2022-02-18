import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Logo from '../../../public/images//logo-square-color.svg';
// import Logo from '../../../public/images//logo.png';

import UserPhoto from '../common/userPhoto';

import UserActions from '../../actions/userActions';
import UserStore from '../../stores/userStore';

class AppMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            showProfile: false
        }

        this.userActions = new UserActions();

        this.showProfileMenu = this.showProfileMenu.bind(this);
        this.logoutUser = this.logoutUser.bind(this);
        this._onChange = this._onChange.bind(this);
    }

    componentWillMount() {
        UserStore.addChangeListener(this._onChange);
    }

    _onChange() {
        let user = UserStore.getUser();

        this.setState({ user });
    }

    showProfileMenu(e) {
        this.setState({ showProfile: true });
    }

    logoutUser() {
        this.userActions.logoutUser((data) => {
            console.log(data);
        });
    }

    render() {
        return (
            <div className="app-menu">
                <div className="left-menu">
                    <Link to="/app">
                        <div className="takenote-logo">
                            <img src="/images/logo-square-color.svg" alt="takenote-logo" />
                            <h3>takenote</h3>
                        </div>
                    </Link>

                    <Link to="/app">
                        <h3>Home</h3>
                    </Link>
                </div>

                <div className="profile-wrapper">
                    <div className="profile">
                        <Link to="/profile" onMouseEnter={this.showProfileMenu}>
                            <UserPhoto primaryPhoto={this.state.user.primaryPhoto} name={this.state.user.username} />
                        </Link>
                    </div>
                    {this.state.showProfile ?
                        <div className="profile-menu" onMouseLeave={(e) => this.setState({ showProfile: false })}>
                            <div className="dropdown-items">
                                <Link to="/profile" >
                                    <p>Visit my profile</p>
                                </Link>
                            </div>
                            <div className="dropdown-items" onClick={this.logoutUser}>
                                <p>Logout</p>
                            </div>
                        </div>
                        : null}
                </div>

            </div>
        )
    }
}

export default AppMenu;