import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';

import logo from '../../assets/logo.png';
import Loading from '../common/loading';

import UserActions from '../../actions/userActions';
import LoginForm from '../common/loginForm';
import SignupForm from '../common/signupForm';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: {
                username: "pratikmathur279@gmail.com",
                password: "Pratik@27",
                email: "pratikmathur279@gmail.com"
            },
            signup: {
                username: "pmathur",
                password: "Pratik@27",
                email: "pratikmathur279@gmail.com"
            },
            error: '',
            loading: false,
            currentTab: 'login'
        }
        this.toggleTab = this.toggleTab.bind(this);
        this.signupUser = this.signupUser.bind(this);
        this.loginUser = this.loginUser.bind(this);

        this.actions = new UserActions();
    }

    onFormChange = (e) => {
        console.log('here');
        let state = Object.assign({}, this.state);
        state.login[e.target.name] = e.target.value;

        this.setState(state);
    }

    loginUser() {
        this.setState({ loading: true });
        this.actions.loginUser(this.state.login, (res) => {
            this.setState({ error: res.message, loading: false });
        });
    }

    signupUser() {
        console.log('here');
        this.setState({ loading: true });
        this.actions.createUser(this.state.signup, (res) => {
            this.setState({ error: res.message, loading: false });
        });
    }

    toggleTab(t) {
        this.setState({ currentTab: t });
    }

    render() {
        return (
            <div className="login-wrapper">
                {this.state.loading ? <Loading /> : null}
                <div id="login-form">
                    <div className="header-md-6">
                        <img className="logo" src={logo} />
                        <h2>Take Note</h2>
                    </div>

                    <div id="tabs-container">
                        <div onClick={() => this.toggleTab('login')} id="tab1" className={['tab', (this.state.currentTab === 'login' ? 'active' : '')].join(' ')}>Log In</div>
                        <div onClick={() => this.toggleTab('signup')} id="tab2" className={['tab', (this.state.currentTab === 'signup' ? 'active' : '')].join(' ')}>Sign Up</div>
                    </div>

                    {this.state.currentTab === 'login' ?
                        <LoginForm
                            {...this.state}
                            onFormChange={this.onFormChange}
                            loginUser={this.loginUser}
                            toggleTab={this.toggleTab}
                        />
                        :
                        <SignupForm
                            onFormChange={this.onFormChange}
                            signupUser={this.signupUser}
                            toggleTab={this.toggleTab}
                            {...this.state}
                        />
                    }

                </div>
            </div>
        )
    }
}

export default LoginPage;