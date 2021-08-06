import React from 'react';
import _, { indexOf } from 'lodash';
import ContentEditable from "react-contenteditable";
import sanitizeHtml from "sanitize-html";
import { v4 as uuid } from 'uuid'
import dayjs from 'dayjs';

import { FaRegStickyNote, FaPlus, FaStar } from 'react-icons/fa';

import EditorFooter from '../../common/editorFooter';
import { welcomeNote as note } from '../../common/welcomeNote';

import Note from '../common/note';

import Loading from '../../common/loading';
import UserStore from '../../../stores/userStore';
import NoteStore from '../../../stores/noteStore';

import NoteActions from '../../../actions/noteActions';

import ContextMenu from '../../common/contextMenu';

class Notes extends React.Component {
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
			menu: [
				{ "label": "Rename", "callback": this.renameNote },
				{ "label": "Delete", "callback": this.item2Callback },
			],
			lastSyncTime: new Date(),
			html: `<p>Hello <b>World</b> !</p><p>Paragraph 2</p>`,
			editable: true,
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
			clickY: 0,
			nightMode: false,
			editName: ''
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
		this.editNote = this.editNote.bind(this);
		this.handleContextClick = this.handleContextClick.bind(this);
		this.handleClickOutside = this.handleClickOutside.bind(this);
		this.renameNote = this.renameNote.bind(this);
		this.toggleNight = this.toggleNight.bind(this);

		this._onChange = this._onChange.bind(this);

		this.actions = new NoteActions();
	}

	async componentWillMount() {
		if (process.env.NODE_ENV == 'production') {
			UserStore.addChangeListener(this._onChange);
			let user = UserStore.getUser();
			this.setState({ user: user });
		}

		NoteStore.addChangeListener(this._onChange);
		let state = Object.assign({}, this.state);
		let notes1 = NoteStore.getNotes();
		state.notes = notes1.all;
		state.favorite = notes1.favorite;

		this.setState(state);
	}

	componentDidMount() {


		document.addEventListener('mousedown', this.handleClickOutside);
	}

	componentWillUnmount() {
		// UserStore.removeListener("CHANGE", this._onChange);
		document.removeEventListener('mousedown', this.handleClickOutside);
	}

	/**
	 * Alert if clicked on outside of element
	 */
	handleClickOutside = (event) => {
		if (this.wrapperRef.current && !this.wrapperRef.current.contains(event.target)) {
			this.setState({ editName: '' });
		}
	}

	_onChange = () => {
		let state = Object.assign({}, this.state);
		let notes1 = NoteStore.getNotes();
		state.notes = notes1.all;
		state.favorite = notes1.favorite;
		// state.currentNote = state.notes[0];

		console.log(state);
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
		let state = Object.assign({}, this.state);
		let index = _.findIndex(state.notes, (n) => {
			return n.id == id;
		});

		if (index > -1) {
			state.notes[index].favorite = !state.notes[index].favorite;
			this.actions.updateNote(state.notes[index]);
		}

		this.setState(state);
	}

	deleteNote(id) {
		console.log(id);
	}

	toggleNight() {
		this.setState({ nightMode: !this.state.nightMode });
	}

	syncNote(note) {
		note.email = 'pratikmathur279@gmail.com';
		this.actions.saveNote(note, (data) => {
			// console.log(data);
			this.setState({ currentNote: data });
		});
	}

	downloadNote(note) {
		console.log(note);
		if (note.text) {
			this.actions.downloadNote(note, (res) => {
				window.open('/uploads/' + res, "download");
			});
		}

	}

	copyNote(id) {
		console.log(id);
	}

	handleContextClick(event) {
		console.log(event.clickX);
		this.setState({ showContextMenu: true });
	}

	renameNote(id) {
		let state = Object.assign({}, this.state);
		state.notes.forEach(n => {
			if (n.id == id) {
				state.editName = id;
			}
		});
		this.setState(state);
	}

	editNote(e, id) {
		let state = Object.assign({}, this.state);
		let index = _.findIndex(state.notes, (n) => {
			return n.id == id;
		});

		if (index > -1) {
			if (e.keyCode === 13) {
				state.editName = null;
				this.actions.updateNote(state.notes[index]);
			}
			else {
				state.notes[index].name = e.target.value;
			}
		}

		this.setState(state);
	}

	render() {
		const buildNotesList = (n) => {
			return (
				<Note
					{...this.state}
					wrapperRef={this.wrapperRef}
					handleContextClick={this.handleContextClick}
					note={n}
					editNote={this.editNote}
					setCurrentNote={this.setCurrentNote}
					renameNote={this.renameNote}
				/>
			)
		}

		return (
			<div className={['notes-wrapper', (this.state.nightMode ? 'night-active' : '')].join(' ')}>
				{this.state.loading && <Loading loadingText={this.state.loadingText} />}
				<div className="left-container">
					<div className="notes-header">
						<h1>Notes</h1>
						<FaPlus onClick={this.addNote} />
					</div>

					{this.state.notes.length > 0 ? this.state.notes.map(buildNotesList) : null}
				</div>

				<span className="vertical-resizer"></span>

				<div className="right-container">
					{this.state.currentNote ?
						<div className="note-content">
							{!this.state.editable ?
								<ContentEditable
									className="editable"
									tagName="pre"
									html={this.state.currentNote.text} // innerHTML of the editable div
									disabled={!this.state.editable} // use true to disable edition
									onChange={this.handleChange} // handle innerHTML change
									onBlur={this.sanitize}
									style={{ width: "100%", wordBreak: "break-all" }}
								/>
								:
								<div>
									<textarea
										className="editable"
										value={this.state.currentNote.text}
										onChange={this.handleChange}
										onBlur={this.sanitize}
									/>
								</div>
							}
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
							toggleNight={this.toggleNight}
						/>
						: null}

				</div>

			</div>
		)
	}
}

export default Notes;