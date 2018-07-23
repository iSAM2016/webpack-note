import React, { Component } from 'react';
class About extends Component {
    constructor(props) {
        super(props);
        this.state = { number: 0 }
    }

    render() {
        console.log('4、render(父组件挂载)');
        return (
            <div className="About">
                <div>
                    <span>i am about</span>
                </div>

            </div>
        );
    }
}

export default About;
