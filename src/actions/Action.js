import Request from 'superagent';
import ActionTypes from '../constants/actions';
import Dispatcher from '../dispatcher/dispatcher';
import _ from 'lodash';

class Action {
    constructor() {
        this.actions = ActionTypes;
        this.dispatcher = Dispatcher;
    }

    getToken() {
        return document.getElementById('token').getAttribute('content');
    }

    dispatch(actionType, name, object) {
        let action = {};
        action.actionType = ActionTypes[actionType];
        action[name] = object;
        Dispatcher.dispatch(action);
    }

    get(url, callback) {
        Request
            .get(url)
            .set('X-Requested-With', 'XMLHttpRequest')
            .set('Accept', 'application/json')
            .end((err, res) => {
                callback(err, res);
            });
    }

    post(url, data, callback) {
        Request
            .post(url)
            .send(data)
            .set('X-Requested-With', 'XMLHttpRequest')
            .set('Accept', 'application/json')
            .end((err, res) => {
                callback(err, res);
            });
    }

    delete(url, callback) {
        Request
            .delete(url)
            .set('X-Requested-With', 'XMLHttpRequest')
            .set('Accept', 'application/json')
            .end((err, res) => {
                callback(err, res);
            });
    }

    put(url, data, callback) {
        Request
            .put(url)
            .send(data)
            .set('X-Requested-With', 'XMLHttpRequest')
            .set('Accept', 'application/json')
            .end((err, res) => {
                callback(err, res);
            });
    }
}

export default Action;