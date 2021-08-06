import Dispatcher from '../dispatcher/dispatcher';
import ActionTypes from '../constants/actions';
import UserStore from '../stores/userStore';
import Request from 'superagent';
import Actions from "./Action";

class UserActions extends Actions {

    getToken() {
        return document.getElementById('token').getAttribute('content');
    }

    loginUser(data, callback) {
        this.post('/session', data, (err, res) => {
            let responseText = JSON.parse(res.text);
            if (!err) {
                console.log(responseText);
                localStorage.setItem('sessionId', responseText.userId);
                this.dispatch(ActionTypes.SET_USER, 'user', responseText);
                window.location.href = "/app";
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

    testApp(callback) {
        this.get('/api/ping', (err, res) => {
            callback(res.body);
        });
    }

    setCurrentUser(user) {
        Dispatcher.dispatch({
            actionType: ActionTypes.SET_USER,
            user: user
        });
    }


}

export default UserActions;
