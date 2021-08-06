import Dispatcher from '../dispatcher/dispatcher';
import ActionTypes from '../constants/actions';
import UserStore from '../stores/userStore';
import Request from 'superagent';
import Actions from "./Action";

var InitialActions = {

    getToken: function () {
        return document.getElementById('token').getAttribute('content');
    },

    init: function (callback) {
        this.loggedCheck();
        // setInterval(this.loggedCheck.bind(this), 6000);
        callback();
    },

    loggedCheck: function () {
        console.log("loggedCheck");
        Request
            .get('/session')
            .set('X-Requested-With', 'XMLHttpRequest')
            .set('Accept', 'application/json')
            .end(function (err, res) {
                if (err || !res.ok) {
                    window.location.href = "/login?timeout=true";
                }
                else {
                    let responseText = JSON.parse(res.text);
                    Dispatcher.dispatch({
                        actionType: ActionTypes.SET_USER,
                        user: responseText
                    });
                }
            });
    }
}

export default InitialActions;
