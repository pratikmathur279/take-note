import Dispatcher from '../dispatcher/dispatcher';
import ActionTypes from '../constants/actions';
import _ from 'lodash';
import assign from 'object-assign';
import { EventEmitter } from 'events';

var CHANGE_EVENT = 'CHANGE';

var _notes = { all: [], favorite: [] };

var NoteStore = assign({}, EventEmitter.prototype, {

    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    setAllNotes: function (notes) {
        _notes.all = notes;
    },

    getNotes: function () {
        return _notes;
    },

    setFavorite: function (id) {
        _notes.all.forEach(el => {
            if (el.id == id) {
                el.favorite = !el.favorite;
            }
        });
    },

    updateNote: function (note) {
        _notes.all.forEach(el => {
            if (el.id == note.id) {
                el = note;
            }
        });
    }
});


Dispatcher.register(function (action) {
    switch (action.actionType) {
        case ActionTypes.ALL_NOTES:
            NoteStore.setAllNotes(action.notes);
            NoteStore.emitChange();
            break;

        case ActionTypes.SET_FAVORITE:
            NoteStore.setFavorite(action.note);
            NoteStore.emitChange();
            break;

        case ActionTypes.UPDATE_NOTE:
            NoteStore.updateNote(action.note);
            NoteStore.emitChange();
            break;

        default:
    }
});

export default NoteStore;