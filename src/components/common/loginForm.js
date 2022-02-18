import React from 'react';

import { AiOutlineEye } from 'react-icons/ai';

const LoginForm = (props) => {
    return (
        <div className="form-wrapper">
            <div className="form">
                <div className="col-md-6">
                    <input type="email" className="form-control" placeholder="email address" name="email" value={props.login.email} onChange={props.onFormChange} />
                </div>

                <div className="col-md-6">
                    <input type="password" className="form-control" placeholder="password" name="password" value={props.login.password} onChange={props.onFormChange} />
                    <AiOutlineEye onClick={props.togglePassword} />
                </div>

                <div className="col-md-6">
                    <p class="error" >{props.error}</p>
                </div>

                <div className="col-md-6">
                    <p className="forgot-password">Don't remember your password?</p>
                </div>
            </div >
            <button className="btn green" type="submit" onClick={props.loginUser}>Log In </button>
        </div>

    )
}

export default LoginForm;