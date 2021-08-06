import React from 'react';

import CodeMirror from 'codemirror';

class Scratchpad extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			content: ''
		}

		this.onChange = this.onChange.bind(this);
	}

	componentWillMount() {
		this.setState({ content: '# Scratchpad' })
	}

	onChange(e) {
		let value = e.target.value;
		this.setState({ content: value });
	}

	render() {
		return (
			<div className="editor-wrapper">
				<textarea className="empty-editor" value={this.state.content} onChange={this.onChange}></textarea>
			</div>
		)
	}
}

export default Scratchpad;