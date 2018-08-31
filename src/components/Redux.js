import React, {
    Component
} from 'react'
import { connect } from 'react-redux'


class Redux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newUser: '',
        }
    }
    handleChange = (e) => {
        // 这是不安全的写法
        // this.setState({quantity:this.state.quantity + 1})
        this.setState({ newUser: e.target.value });
    }
    handleClick = () => {
        if (this.state.newUser && this.state.newUser.length > 0) {
            this.context.onAddUser(this.state.newUser);
        }
    }
    componentDidMount() {
        this.textInput.focus();
    }
    render() {
        return (
            <div className="win-popup">
                <input onChange={this.handleChange} value={this.state.newUser} ref={(input) => { this.textInput = input }} />
                <input type="text" value="父组件要通过ref 访问我" ref={this.props.inputRef} />
                <button onClick={this.handleClick}>新增</button>
            </div>
        )

    }
}

let VisRedux = connect(
    mapStateToProps,
    mapDispatchToProps
)(Redux);

export default VisRedux;
