import Dispatcher from '../dispatcher/dispatcher';
import ActionTypes from '../constants/actions';
import _ from 'lodash';
import assign from 'object-assign';
import { EventEmitter } from 'events';

var CHANGE_EVENT = 'CHANGE';

var _user = {};

var UserStore = assign({}, EventEmitter.prototype, {

    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    setUser: function (user1) {
        let user = Object.assign({}, user1);
        _user = user;
    },

    getUser: function () {
        return _user;
    },
});


Dispatcher.register(function (action) {

    switch (action.actionType) {

        case ActionTypes.SET_USER:
            UserStore.setUser(action.user);
            UserStore.emitChange();
            break;

        default:
    }
});

export default UserStore;