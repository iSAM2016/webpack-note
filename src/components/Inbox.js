import React, { Component } from 'react';
class Inbox extends Component {
    constructor(props) {
        super(props);
        this.state = { number: 0 }
    }

    render() {
        console.log('4、render(父组件挂载)');
        return (
            <div className="Inbox">
                <div>
                    <span>i am Inbox</span>
                </div>

            </div>
        );
    }
}

export default Inbox;
