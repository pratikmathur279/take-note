import React from 'react';

class MyHomepage extends React.Component {

    constructor(props) {
        super(props);
        console.log(props);
    }

    componentWillMount() {

    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }

}
export default MyHomepage;