import React, {
    Component
} from 'react'
import PropTypes from 'prop-types';

class UserAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newUser: '',
        }
    }
    handleChange = (e: any) => {
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
UserAdd.contextTypes = {
    onAddUser: PropTypes.func
}

class UserList extends Component {
    handleClick = (userId) => {
        if (this.state.newUser && this.state.newUser.length > 0) {
            this.props.onSetCurrentUser(userId);
        }
    }
    render() {
        return (
            <div className="win-popup">
                <ul>
                    {this.props.users.map(function (users, index) {
                        return (
                            <li key={index}>
                                <span>{users.name}</span>
                            </li>
                        )
                    })}
                </ul>
                <UserAdd onAddUser={this.props.onAddUser} inputRef={el => this.inputElement = el} />
            </div>
        )
    }
}

class UserListContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
        }
    }
    getChildContext() {
        return { onAddUser: this.handleAddUser };
    }
    handleAddUser(users) {

        this.setState((preState, props) => ({ users: [...preState.users, { name: users }] }))
    }
    componentDidMount() {
        this.setState({
            users: [{ name: 'isam' }, { name: 'isam2' }]
        })
    }
    render() {
        return (
            <UserList users={this.state.users} />
        )
    }
}
UserListContainer.childContextTypes = {
    onAddUser: PropTypes.func
}


// 通过ref 访问组件实例
function widthPersistentData(WrappendCompent) {
    return class Hello extends Component {
        constructor(props) {
            super(props);
            this.state = {
                value: '',
            }
        }
        handleValueChange(event) {
            this.setState({
                value: event.target.value
            })
        }
        render() {
            const newProps = {
                controlledProps: {
                    value: this.state.value,
                    onChange: this.handleValueChange,
                }
            }
            return <WrappendCompent  {...this.props}  {...newProps} />
        }
    }
}

class MyComponent extends Component {
    render() {
        // MyComponent 为无状态组件，转态由高阶组件维护
        return <input name="sample" {...this.props.controlledProps} />
    }
}

const MyComponentWidthData = widthPersistentData(MyComponent)

class Ref extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 0,
        }
    }
    addNum = () => {
        // 这是不安全的写法
        // this.setState({quantity:this.state.quantity + 1})
        this.setState((preState, props) => ({ quantity: preState.quantity + 1 }))

    }
    render() {
        return (
            <div className="win-popup">
                <button onClick={this.addNum}>增减数量</button>
                <label>数量</label>
                <span>{this.state.quantity}</span>
                <UserListContainer></UserListContainer>
                <MyComponentWidthData quantity={this.state.quantity}></MyComponentWidthData>
            </div>
        )
    }
}

export default Ref
