import React from 'react';

const SignupForm = (props) => {
    return (
        <div className="form-wrapper">
            <div className="form">
                <div className="col-md-6">
                    <input type="text" className="form-control" placeholder="username" name="username" value={props.signup.username} onChange={props.onFormChange} />
                </div>

                <div className="col-md-6">
                    <input type="email" className="form-control" placeholder="email address" name="email" value={props.signup.email} onChange={props.onFormChange} />
                </div>

                <div className="col-md-6">
                    <input type="password" className="form-control" placeholder="password" name="password" value={props.signup.password} onChange={props.onFormChange} />
                </div>

                <div className="col-md-6">
                    <p class="error" >{props.error}</p>
                </div>
            </div>

            <button className="btn green" type="submit" onClick={props.signupUser}>Sign Up</button>
        </div>

    )
}

export default SignupForm;