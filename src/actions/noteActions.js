import Dispatcher from '../dispatcher/dispatcher';
import ActionTypes from '../constants/actions';
import UserStore from '../stores/userStore';
import Request from 'superagent';
import Actions from "./Action";

class NoteActions extends Actions {

    constructor() {
        super();
    }

    getToken() {
        return document.getElementById('token').getAttribute('content');
    }

    getNotes(email) {
        console.log(email);
        this.get('/api/notes/' + email, (err, res) => {
            if (!err) {
                let responseText = JSON.parse(res.text);

                if (responseText.Items.length > 0) {
                    console.log(responseText.Items);
                    this.dispatch(ActionTypes.ALL_NOTES, 'notes', responseText.Items);
                }

            }
        });
    }

    setFavorite(note) {
        Dispatcher.dispatch({
            actionType: ActionTypes.SET_FAVORITE,
            note: note
        });
    }


    saveNote(data, callback) {
        console.log(data)
        this.post('/api/notes', data, (err, res) => {
            if (!err) {
                let responseText = JSON.parse(res.text);
                callback(responseText);
            }
        });
    }

    updateNote(data, callback) {
        console.log(data)
        this.put('/api/notes', data, (err, res) => {
            if (!err) {
                let responseText = JSON.parse(res.text);
                console.log(responseText);
                this.dispatch(ActionTypes.UPDATE_NOTE, 'note', responseText);
                // callback(responseText);

            }
        });
    }

    downloadNote(note, callback) {
        console.log(note)
        this.post('/api/download-note', note, (err, res) => {
            if (!err) {
                callback(res.text);
            }
        });
    }

    setCurrentUser(user) {
        Dispatcher.dispatch({
            actionType: ActionTypes.SET_USER,
            user: user
        });
    }
}

export default NoteActions;
