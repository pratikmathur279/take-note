import React from 'react';

import { Link } from 'react-router-dom';

const Login = (props) => {
    return (
        <Link className="btn blue" to="/login">Log In</Link>
    )
}

export default Login;