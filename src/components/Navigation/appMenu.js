import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Logo from '../../assets/logo-square-color.svg';
// import Logo from '../../assets/logo.png';

import UserPhoto from '../common/userPhoto';

import UserActions from '../../actions/userActions';

class AppMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
            showProfile: false
        }

        this.userActions = new UserActions();

        this.showProfileMenu = this.showProfileMenu.bind(this);
        this.logoutUser = this.logoutUser.bind(this);
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
                            <img src={Logo} alt="takenote-logo" />
                            <h3>takenote</h3>
                        </div>
                    </Link>

                    <Link to="/app">
                        <h3>Home</h3>
                    </Link>

                    {/* <Link to="/">
                        <h3>TakeNote</h3>
                    </Link> */}
                </div>


                <div className="profile-wrapper">
                    <div className="profile">
                        <Link to="/profile" onMouseEnter={this.showProfileMenu}>
                            <UserPhoto src={this.state.user.picture} name={this.state.user.name} />
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
                            {/* <div className="dropdown-items">

                            </div> */}
                        </div>
                        : null}
                </div>

            </div>
        )
    }
}

export default AppMenu;