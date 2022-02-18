import React from 'react';
import ReactCrop from 'react-image-crop';

import UserPhoto from '../common/userPhoto';
import UserForm from '../common/userForm';
import Upload from '../common/upload';

import UserActions from '../../actions/userActions';
import UserStore from '../../stores/userStore';

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            isCropping: false,
            cropData: { height: 30, aspect: 4 / 4 },
            file: null,
            img64: ''
        }
        this.userActions = new UserActions();

        this._onChange = this._onChange.bind(this);
        this.onChange = this.onChange.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.cropPhoto = this.cropPhoto.bind(this);
        this.getDataURI = this.getDataURI.bind(this);
        this.uploadPhoto = this.uploadPhoto.bind(this);
        this.deletePhoto = this.deletePhoto.bind(this);
        this.toggleCrop = this.toggleCrop.bind(this);
        this.updateCrop = this.updateCrop.bind(this);
    }

    componentWillMount() {
        UserStore.addChangeListener(this._onChange);
        var user = UserStore.getUser();
        console.log(user);

        this.setState({ user: user, loading: false });
    }

    _onChange() {
        var user = UserStore.getUser();

        this.setState({ user: user, loading: false });
    }

    onChange(e) {
        var key = e.target.name,
            value = e.target.value,
            state = Object.assign({}, this.state);

        state.user[key] = value;
        this.setState(state);
    }

    updateUser() {
        this.userActions.editUser(this.state.user);
    }

    uploadPhoto() {
        console.log(this.state);
        let data = { img64: this.state.img64, cropData: this.state.cropData, file: this.state.file };
        this.userActions.uploadPrimaryPhoto(data);
    }

    cropPhoto(e) {
        e.preventDefault();
        var file = e.target.files[0];
        this.setState({ file: file });
        this.getDataURI(file);
    }

    getDataURI(file, callback) {
        var reader = new FileReader();
        reader.addEventListener('load', function () {
            this.setState({ img64: reader.result, isCropping: true });
        }.bind(this));
        reader.readAsDataURL(file);
    }

    deletePhoto(id) {
        // if (confirm('Are you sure you want to delete this photo?')) {
        //     this.setLoadingTrue();
        //     PhotoActions.deletePhoto(id);
        // }
    }

    updateCrop(data) {
        this.setState({ cropData: data });
    }

    toggleCrop() {
        document.getElementById('photo').value = "";
        this.setState({ isCropping: !this.state.isCropping, img64: '' });
    }

    render() {
        return (
            <div className="profile-wrapper">
                {this.state.isCropping ?
                    <div id="crop-modal">
                        <ReactCrop src={this.state.img64} crop={this.state.cropData} onChange={this.updateCrop} />
                        <div className="crop-buttons">
                            <h2>Crop your image</h2>
                            <div className="btn green" onClick={this.uploadPhoto}>Upload</div>
                            <div className="btn red" onClick={this.toggleCrop}>Cancel</div>
                        </div>
                    </div>
                    : null}
                <h1 id="section-header">{this.state.user.first_name} {this.state.user.last_name}</h1>
                <div id="photos-top">
                    <UserPhoto primaryPhoto={this.state.user.primaryPhoto} name={this.state.user.username} />
                    <p>Current Profile Picture</p>
                    <p>To change it, select a new photo below</p>
                    <Upload
                        text="Upload a photo"
                        onChange={this.cropPhoto}
                        name='photo'
                        multiple={false} />
                </div>

                <UserForm
                    {...this.state}
                    onChange={this.onChange}
                />

                <div className="btn blue" onClick={this.updateUser}>Submit</div>
            </div>
        )
    }
}

export default ProfilePage;