import React from 'react';

class ContextMenu extends React.Component {
    constructor(props) {
        super(props);
        this.contextRef = React.createRef();
        this.returnMenu = this.returnMenu.bind(this);

        this.state = {
            visible: false,
            x: 0,
            y: 0
        };

    }

    componentDidMount() {
        var self = this;
        document.addEventListener('contextmenu', function (event) {
            const clickX = event.clientX;
            const clickY = event.clientY;
            if (clickX > 300) {
                event.preventDefault();

                console.log(clickX + " " + clickY);
                self.setState({ visible: true, x: clickX, y: clickY });
            }


        });
        document.addEventListener('click', function (event) {
            console.log(self.contextRef);
            if (self.contextRef.current.id == 'customcontext') {
                self.click(event.target.getAttribute('index'));
            }
            event.preventDefault();
            self.setState({ visible: false, x: 0, y: 0 });
        });
    }


    click(index) {
        if (this.props.items[index].callback)
            this.props.items[index].callback();
        else {
            console.log("callback not registered for the menu item")
        }
    }

    returnMenu(items) {
        var myStyle = {
            'position': 'absolute',
            'top': `${this.state.y}px`,
            'left': `${this.state.x + 5}px`
        }

        var self = this;
        return <div className='custom-context' id='customcontext' style={myStyle} ref={this.contextRef}>
            {items.map((item, index, arr) => {

                if (arr.length - 1 == index) {
                    return <div key={index} className='custom-context-item-last' index={index} >{item.label}</div>
                } else {
                    return <div key={index} className='custom-context-item' index={index}>{item.label}</div>
                }
            })}
        </div>;
    }

    render() {
        return (<div id='cmenu'>
            {this.state.visible ? this.returnMenu(this.props.items) : null}
        </div>
        )
    }
}

export default ContextMenu;