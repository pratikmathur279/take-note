import React from 'react';
import _, { indexOf } from 'lodash';
import ContentEditable from "react-contenteditable";
import sanitizeHtml from "sanitize-html";
import { v4 as uuid } from 'uuid'
import dayjs from 'dayjs';

import { FaRegStickyNote, FaPlus, FaStar } from 'react-icons/fa';

import EditorFooter from '../../common/editorFooter';
import { welcomeNote as note } from '../../common/welcomeNote';

import Loading from '../../common/loading';
import UserStore from '../../../stores/userStore';
import NoteStore from '../../../stores/noteStore';

import NoteActions from '../../../actions/noteActions';

class Favorites extends React.Component {
	constructor(props) {
		super(props);
		this.wrapperRef = React.createRef();
		this.state = {
			notes: [],
			favorite: [],
			user: {
				email: "pratikmathur279@gmail.com",
				email_verified: true,
				family_name: "Mathur",
				given_name: "Pratik",
				locale: "en-GB",
				name: "Pratik Mathur",
				nickname: "pratikmathur2791",
				picture: "https://lh3.googleusercontent.com/a-/AOh14GiFQTrT7h0FPUIsOHJIhruSxXaRMwnrOBPhdKun_g=s96-c",
				sub: "google-oauth2|112194558552527195279",
				updated_at: "2021-05-10T22:44:06.901Z"
			},
			lastSyncTime: new Date(),
			html: `<p>Hello <b>World</b> !</p><p>Paragraph 2</p>`,
			editable: false,
			loading: false,
			loadingText: "Fetching Data",
			currentNote: {},
			syncArray: [],
			sanitizeConf: {
				allowedTags: ["b", "i", "em", "strong", "a", "p", "h1"],
				allowedAttributes: { a: ["href"] }
			},
			showContextMenu: false,
			clickX: 0,
			clickY: 0
		}

		this.handleChange = this.handleChange.bind(this);
		this.sanitize = this.sanitize.bind(this);
		this.toggleEditable = this.toggleEditable.bind(this);
		this.addNote = this.addNote.bind(this);
		this.favoriteNote = this.favoriteNote.bind(this);
		this.deleteNote = this.deleteNote.bind(this);
		this.downloadNote = this.downloadNote.bind(this);
		this.copyNote = this.copyNote.bind(this);
		this.syncNote = this.syncNote.bind(this);
		this.renameNote = this.renameNote.bind(this);

		this._onChange = this._onChange.bind(this);

		this.actions = new NoteActions();
	}

	async componentWillMount() {
		if (process.env.NODE_ENV == 'production') {
			UserStore.addChangeListener(this._onChange);
			let user = UserStore.getUser();
			console.log(user);
			this.setState({ user: user });
		}

		let state = Object.assign({}, this.state);
		let notes1 = NoteStore.getNotes();

		notes1.all.forEach(el => {
			if (el.favorite) {
				state.notes.push(el);
			}
		});

		this.setState(state);
	}

	componentDidMount() {
		NoteStore.addChangeListener(this._onChange);
	}

	componentWillUnmount() {
		UserStore.removeListener("CHANGE", this._onChange);
		NoteStore.removeListener("CHANGE", this._onChange);
	}

	_onChange = () => {
		let state = Object.assign({}, this.state);
		let notes1 = NoteStore.getNotes();

		state.notes = [];
		state.favorite = [];
		state.currentNote = {};

		console.log(notes1);

		state.favorite = notes1.favorite;

		if (state.favorite.length > 0) {
			notes1.all.forEach(el => {
				if (el.favorite) {
					state.notes.push(el);
				}
			});
		}

		this.setState(state);
	}

	handleChange(evt) {
		let state = Object.assign({}, this.state);

		state.currentNote.text = evt.target.value;

		if (state.syncArray.indexOf(state.currentNote.id) > -1) {

		}
		else {
			state.syncArray.push(state.currentNote.id);
		}

		this.setState(state);
	}

	sanitize() {
		let state = Object.assign({}, this.state);
		state.notes[0].text = sanitizeHtml(state.notes[0].text, this.sanitizeConf);
		this.setState(state);
	}

	toggleEditable() {
		this.setState({ editable: !this.state.editable });
	}

	addNote() {
		let state = Object.assign({}, this.state);

		let newNote = {
			id: uuid(),
			name: 'new note',
			text: '',
			category: '',
			favorite: false,
			created: dayjs().format(),
			lastUpdated: dayjs().format(),
		}

		state.notes.push(newNote);
		state.currentNote = newNote;
		this.setState(state);
	}

	setCurrentNote = (n) => {
		this.setState({ currentNote: n });
	}

	favoriteNote(id) {
		console.log(id);
		this.actions.setFavorite(id);
	}

	deleteNote(id) {
		console.log(id);
	}

	syncNote(note) {
		note.email = 'pratikmathur279@gmail.com';
		this.actions.saveNote(note, (data) => {
			console.log(data);
			this.setState({ currentNote: data });
		});
	}

	downloadNote(id) {
		console.log(id);
	}

	copyNote(id) {
		console.log(id);
	}

	renameNote(id) {
		console.log(this.state.currentNote.id);
	}

	render() {
		const buildNotesList = (n) => {
			return (
				<div className={['note-content', (this.state.currentNote.id === n.id ? 'active' : '')].join(' ')} onClick={() => this.setCurrentNote(n)} >
					<span class="favorite-icon">
						{this.state.favorite.indexOf(n.id) > -1 ? <FaStar /> : null}
					</span>

					<h3>{n.name}</h3>
					<div className="note">
						<FaRegStickyNote />
						<p>Notes</p>
					</div>
				</div>
			)
		}

		return (
			<div className="notes-wrapper">
				{this.state.loading && <Loading loadingText={this.state.loadingText} />}
				<div className="left-container">
					<div className="notes-header">
						<h1>Favorites</h1>
					</div>

					{this.state.notes.length > 0 ? this.state.notes.map(buildNotesList) : null}
				</div>

				<span className="vertical-resizer"></span>

				<div className="right-container">
					{this.state.currentNote ?
						<div className="note-content">
							<ContentEditable
								className="editable"
								tagName="pre"
								html={this.state.currentNote.text} // innerHTML of the editable div
								disabled={!this.state.editable} // use true to disable edition
								onChange={this.handleChange} // handle innerHTML change
								onBlur={this.sanitize}
								style={{ width: "100%;", wordBreak: "break-all" }}
							/>
						</div>
						: null}
					{this.state.currentNote ?
						<EditorFooter
							{...this.state}
							copyNote={this.copyNote}
							downloadNote={this.downloadNote}
							deleteNote={this.deleteNote}
							favoriteNote={this.favoriteNote}
							toggleEditable={this.toggleEditable}
							syncNote={this.syncNote}
						/>
						: null}

				</div>

			</div>
		)
	}
}

export default Favorites;