import React from 'react';

const UserForm = (props) => {
    return (
        <div className="user-form-wrapper">
            <h2>Personal Info</h2>
            <span id="user-form">
                <div className="col-left">
                    <div className="form-item">
                        <label>FIRST NAME</label>
                        <input type="text" name='first_name' value={props.user.first_name} onChange={props.onChange} />
                    </div>

                    <div className="form-item">
                        <label>LAST NAME</label>
                        <input type="text" name='last_name' value={props.user.last_name} onChange={props.onChange} />
                    </div>

                    <div className="form-item">
                        <label>EMAIL</label>
                        <input type="text" name='email' value={props.user.email} onChange={props.onChange} />
                    </div>
                </div>

                <div className="col-right">
                    <div className="form-item" >
                        <label>Home Phone</label>
                        <input type="text" name="home_phone" value={props.user.home_phone} onChange={props.onChange} />
                    </div>

                    <div className="form-item" >
                        <label>cell</label>
                        <input type="text" name="cell_phone" value={props.user.cell_phone} onChange={props.onChange} />
                    </div>
                </div>
            </span>
        </div>
    )
}

export default UserForm;