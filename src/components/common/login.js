import React from 'react';

import { Link } from 'react-router-dom';

const Login = (props) => {
    console.log(props);
    if (props.user.email) {
        return (
            <div>
                <img className="profile-pic" src={props.user.picture} alt={props.user._id} />
                <h3>{props.user.first_name} {props.user.last_name}</h3>
                <a className="btn blue" onClick={props.logoutUser}>Logout</a>
            </div>
        )
    }
    else {
        return (
            <Link className="btn blue" to="/login">Log In</Link>
        )
    }

}

export default Login;