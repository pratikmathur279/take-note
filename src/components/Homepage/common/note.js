import React from 'react';

import { FaRegStickyNote, FaPlus, FaStar } from 'react-icons/fa';

const Note = (props) => {
    return (
        <div className={['note-content', (props.currentNote.id === props.note.id ? 'active' : '')].join(' ')} onClick={() => props.setCurrentNote(props.note)} onDoubleClick={() => props.renameNote(props.note.id)}
            ref={props.wrapperRef}
            onContextMenu={props.handleContextClick}
        >
            <span class="favorite-icon">
                {props.note.favorite ? <FaStar /> : null}
            </span>

            {props.editName === props.note.id ?
                <input type="text" value={props.note.name} onChange={(e) => props.editNote(e, props.note.id)} onKeyUp={(e) => props.editNote(e, props.note.id)} />
                :
                <h3>{props.note.name}</h3>
            }

            <div className="note">
                <FaRegStickyNote />
                <p>Notes</p>
            </div>

            {/* {props.showContextMenu ?
						<ContextMenu clickX={props.clickX} clickY={props.clickY} items={props.menu}></ContextMenu>
						: null} */}

        </div>
    )
}

export default Note;