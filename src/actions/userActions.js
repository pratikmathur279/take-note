import Dispatcher from '../dispatcher/dispatcher';
import ActionTypes from '../constants/actions';
import UserStore from '../stores/userStore';
import Request from 'superagent';
import Actions from "./Action";

class UserActions extends Actions {

    getToken() {
        return document.getElementById('token').getAttribute('content');
    }

    checkIfLoggedIn() {
        this.get('/session', (err, res) => {
            console.log(res.body);
        });
    }

    getUser(email) {
        this.get('/users', (err, res) => {
            console.log(res.body);
            let responseText = res.body;

            this.dispatch(ActionTypes.SET_USER, 'user', responseText);
            window.location.href = "/app";
        });
    }

    loginUser(data, callback) {
        this.post('/session', data, (err, res) => {
            let responseText = JSON.parse(res.text);
            if (!err) {
                console.log(responseText);
                localStorage.setItem('sessionId', JSON.stringify(responseText));

                this.getUser(responseText.email);
            }
            else {
                callback(responseText);
            }
        });
    }

    logoutUser(callback) {
        this.delete('/session', (err, res) => {
            let responseText = JSON.parse(res.text);
            console.log(responseText);
            localStorage.removeItem('sessionId');
            this.dispatch(ActionTypes.SET_USER, 'user', {});
            window.location.href = "/";
        });
    }

    createUser(data, callback) {
        this.post('/users', data, (err, res) => {
            let responseText = JSON.parse(res.text);
            if (!err) {
                console.log(responseText);
                callback(responseText);
            }
            else {
                console.log(responseText);
                callback(responseText);
            }
        });
    }

    setCurrentUser(user) {
        Dispatcher.dispatch({
            actionType: ActionTypes.SET_USER,
            user: user
        });
    }

    editUser(user) {
        this.post('/users/edit', user, (err, res) => {
            let responseText = JSON.parse(res.text);
            if (!err) {
                this.dispatch(ActionTypes.SET_USER, 'user', responseText);
            }
            else {
                console.log(responseText);
                alert("Something went wrong");
            }
        });
    }

    uploadPrimaryPhoto(data, callback) {
        this.post('/users/primaryPhoto', data, (err, res) => {
            let responseText = JSON.parse(res.text);
            console.log(responseText);
            // if (!err) {
            //     console.log(responseText);
            //     localStorage.setItem('sessionId', JSON.stringify(responseText));

            //     this.getUser(responseText.email);
            // }
            // else {
            //     callback(responseText);
            // }
        });
    }
}

export default UserActions;
