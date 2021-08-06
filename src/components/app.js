import React from 'react';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.props = props;

		this.state = {

		};
	}

	componentWillMount() {

	}

	render() {
		return (
			<div id="main-content">
				{this.props.children}
			</div>
		);
	}
}

export default App;