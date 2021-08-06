import React from 'react';

import { FaRegStickyNote, FaStar, FaRegStar, FaRegTrashAlt, FaRegMoon } from 'react-icons/fa';
import { FiDownload, FiRefreshCcw, FiSun } from 'react-icons/fi';
import { AiOutlineEye } from 'react-icons/ai';
import { MdContentCopy } from 'react-icons/md';
import { IoFingerPrint, IoSettingsOutline } from 'react-icons/io5';

const EditorFooter = (props) => {
	let updatedDate, date, lastSyncTime;
	if (props.currentNote.lastUpdated) {
		updatedDate = new Date(props.currentNote.lastUpdated);
		date = `${updatedDate.getMonth()}/${updatedDate.getDate()}/${updatedDate.getFullYear()}`;

		lastSyncTime = `${updatedDate.getHours()}:${updatedDate.getMinutes()} on ${date}`;
	}
	else {
		updatedDate = '';
		date = '';
		lastSyncTime = '';
	}


	return (
		<div className="editor-footer">
			<div className="container">
				<div className="icon">
					<AiOutlineEye onClick={props.toggleEditable} />
					<span class="tooltiptext">Toggle Edit</span>
				</div>
				<div className="icon" onClick={() => props.favoriteNote(props.currentNote.id)}>
					{props.currentNote.favorite ? <FaStar /> : <FaRegStar />}
					<span class="tooltiptext">Favorite</span>
				</div>
				<div className="icon" onClick={() => props.deleteNote(props.currentNote.id)}>
					<FaRegTrashAlt />
					<span class="tooltiptext">Delete</span>
				</div>
				<div className="icon" onClick={() => props.downloadNote(props.currentNote)}>
					<FiDownload />
					<span class="tooltiptext">Download</span>
				</div>
				<div className="icon" onClick={() => props.copyNote(props.currentNote.id)}>
					<MdContentCopy />
					<span class="tooltiptext">Copy</span>
				</div>
			</div>

			<div className="container">
				{(props.syncArray.indexOf(props.currentNote.id) > -1) ?
					<div className="icon">
						<span className="sync-status">Unsaved Changes</span>
					</div>
					:
					<div className="icon">
						<span className="sync-status">{lastSyncTime}</span>
					</div>
				}
				<div className="icon" onClick={() => props.syncNote(props.currentNote)} >
					<FiRefreshCcw />
					<span class="tooltiptext">Sync</span>
				</div>
				<div className="icon" onClick={props.toggleNight} >
					{props.nightMode ? <FiSun /> : <FaRegMoon />}
					<span class="tooltiptext">Toggle Night Mode</span>
				</div>
				<div className="icon">
					<IoSettingsOutline />
					<span class="tooltiptext">Settings</span>
				</div>
			</div>
		</div>
	)
}

export default EditorFooter;