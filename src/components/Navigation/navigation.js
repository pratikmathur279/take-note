import React from 'react';

import Logo from '../../../public/images//logo-square-color.svg';
import { FaRegStickyNote, FaRegStar, FaRegTrashAlt, FaRegFolder } from 'react-icons/fa';
import { BiNotepad } from 'react-icons/bi';

import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";

import CategoryBuilder from '../Category/categoryBuilder';

class Navigation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}

	render() {
		return (
			<div className="sidebar" >
				{/* <Link to="/" >
					<div className="takenotes-logo">
						<img src={Logo} alt="takenote-logo" />
						<h3>TakeNote</h3>
					</div>
				</Link> */}

				<div className="nav-items">
					<div className={"nav-item " + (this.props.currentStep === 'scratchpad' ? 'active' : '')}>
						<BiNotepad />
						<p onClick={() => this.props.setCurrentStep('scratchpad')}>Scratchpad</p>
					</div>
					<div className={"nav-item " + (this.props.currentStep === 'notes' ? 'active' : '')}>
						<FaRegStickyNote />
						<p onClick={() => this.props.setCurrentStep('notes')}>Notes</p>
					</div>
					<div className={"nav-item " + (this.props.currentStep === 'favorites' ? 'active' : '')}>
						<FaRegStar />
						<p onClick={() => this.props.setCurrentStep('favorites')}>Favorites</p>
					</div>
					<div className={"nav-item " + (this.props.currentStep === 'trash' ? 'active' : '')}>
						<FaRegTrashAlt />
						<p onClick={() => this.props.setCurrentStep('trash')}>Trash</p>
					</div>
				</div>

				<CategoryBuilder />
			</div>
		);
	}
}

export default Navigation;