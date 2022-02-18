import React from 'react';

import Notes from './steps/notes';
import Scratchpad from './steps/scratchpad';
import Favorites from './steps/favorites';
import Trash from './steps/trash';

class RenderComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		}

		this.getComponent = this.getComponent.bind(this);
	}

	getComponent(currentStep = this.props.currentStep) {
		switch (currentStep) {
			case "notes": return <Notes />;
			case "scratchpad": return <Scratchpad />;
			case "favorites": return <Favorites />;
			case "trash": return <Trash />;
		}
	}
	render() {
		return (
			<div>
				{/* <h2 id='sub-header'>{this.getHeader()}</h2> */}
				{this.getComponent()}
			</div>
		);
	}
}

export default RenderComponent;