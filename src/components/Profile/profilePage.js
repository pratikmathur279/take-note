import React from 'react';

import UserPhoto from '../common/userPhoto';
import UserForm from '../common/userForm';
import Upload from '../common/upload';

class ProfilePage extends React.Component {
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
                updated_at: "2021-05-10T22:44:06.901Z",
                home_phone: '',
                cell_phone: ''
            },
        }
    }

    render() {
        return (
            <div className="profile-wrapper">
                <h1 id="section-header">{this.state.user.first_name} {this.state.user.last_name}</h1>
                <div id="photos-top">
                    <UserPhoto src={this.state.user.picture} name={this.state.user.name} />
                    <p>Current Profile Picture</p>
                    <p>To change it, select a new photo below</p>
                    <Upload
                        text="Upload a photo"
                        onChange={this.uploadPhoto}
                        name='photo'
                        multiple={false} />
                </div>


                <UserForm
                    {...this.state}
                />
            </div>
        )
    }
}

export default ProfilePage;