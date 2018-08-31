### webpack4

软件开发中遇到的所有问题都可以通过增加一层抽象而得到解决

```
import(): 动态导入
在 webpack 4 中，import() 会返回一个带命名空间(namespace)的对象，这对 ES Module 不会有影响，但对于遵循 commonjs 规范的模块则会加一层包裹：

// webpack 2/3
import("./commonjs").then(exports => {
	...
})

// webpack 4
import("./commonjs").then({default: exports}=> {
	...
})
```


## react 生命周期

1. 挂载阶段
  constructor: 设置组件的初始状态，
  componentWillMount:  挂载DOM之前调用，并且调用一次。操作setState 不会引起页面的刷新。
  render: 返回UI描述
  componentDidMount: 组件被渲染到DOM 中，此时已经有了真的页面元素。发送服务请求数据。
  

2. 更新阶段
  >props 和sate 可以引起组件更新。props 引起的更新，本质是有渲染的组件的父组件引起的。也就是父组件的render的方法调用的时候，组件会发生更新。这个时候组件props的值可能发生变化，也可能没有改变。因为父组件可以使用相同的对象或值为组件的props 赋值。但是，无论props 是否改变。父组件render 方法每调用一次，都会导致组件更新。

  1.componentWillReceiveProps（nextprops）: 这个方法只用在props 引起的更新过程中才会被调用。state 触发并不会触发该方法的执行。但是如果当前nextProps的值，可能和子组件当前props的值相等。因此需要比较nextProps 和 this.props 来决定是否执行props 发生变化后的逻辑。
      * 在这里面调用setState, 只有在组件render之及之后的方法中,this.state. 才是更新之后的state。在render之前的shouldComponentUpdate和componentWillUpdate this.state依然是旧的stae.
      
  2.shouldComponentUpdate(nextPros, nestState): 这个组件决定是否继续执行更新过程。一般是通过nextProps 和 nextState 和组件当前的3.props 和state 决定这个方法的返回结果
    * PureComponent 这个组件决定了方法返回的结果。
    * 不能使用setState
    
  4.componentWillUpdate(nextProps, nextState):   很少用到
    *  不能使用setState

  

3. 卸载阶段
  componentWillUnmount;
![](./life.png)

 
## 组件

1.在开发react应用的时候，一定要认真考虑哪些组件应该设计成有哪些状态组件。哪些应该设计成无状态组价。应该尽可能多的使用无状态组件。无状态组件不需要关心状态的变化，只聚焦于UI 展示。因而更加容易复用。

2.react组件设计的思路是： 通过定义少数的有状态组件管理整个应用的状态变化，并且将状态通过props传递给其余的无转态组件。由无状态组件完成页面大部分UI 的渲染工作；  

## 事件处理的注意点

1使用箭头函数，

```
<div onClcik={(event) => {this.handleClick(e)}}></div>

```

问题： 如果在render方法为元素事件处理函数，最大的问题是每次render调用时，每次都会创建一个新的事件处理函数。带来额外的性能开销。但是问题并不大


### 深入理解组件

####设计合适的state
> 参考hello.js

1. 组件state 必须能代表一个组件UI呈现的完整转态集合。任何UI的改变都能从state 改变来实现。（有一个明显的标志，这个组件不在render中使用，一定不是state）他可以分为
	* 用作渲染组件时使用到的数据的来源
  * 用作组件UI 展现形式的判断依据
2. 没有多余的转态，也不应该从其他状态计算而来的中间状态。

3. 不用state 不用做UI展示的时候我们可以设计为普通属性。

```
 purchaseList:[],
 totalCost: 0,//中间状态
```

#### setState

这个方法是异步的，所以会有危险。

```
this.setState((preState,props) => ({quantity: preState.quantity + 1}))

```

引用类型应该使用结构
```
this.setState((preState,props) => ({owner: {...preState.owner,name: 'isam'}}))
```

### ref

我们可以使用回调函数

```
ref={(input) => { this.textInput = input }}
```

* 父组件访问子组件的DOM 元素。可以通过间接的方式实现

### 高阶组件

使用场景 来实现组件的逻辑的抽象和复用
  

1. 操纵props
2. 通过ref访问组件实例
3. 组件转态提升
4. 用其他元素包装组件，这种情况是为组件增加样式

1. 操纵props
```
// 高阶组件 props
function widthPersistentData(WrappendCompent) {
    return class Hello extends Component {
        constructor(props) {
            super(props);
            this.state = {
                data: 11,
            }
        }
        render() {
            return <WrappendCompent data={this.state.data} {...this.props} />
        }
    }
}

class MyComponent extends Component {
    render() {
        return <div>{this.props.data}</div>
    }
}
const MyComponentWidthData = widthPersistentData(MyComponent)
```

2. 通过ref访问组件实例
```
// 通过ref 访问组件实例
function widthPersistentData(WrappendCompent) {
    return class Hello extends Component {
        constructor(props) {
            super(props);
            this.state = {
                data: 11,
            }
        }
        someMethod() {
            this.wrappedInstance.somemethod();
        }
        render() {
          // 为包装组件添加ref属性从而获取组件实例
          // 这种用法很少用到，但是高阶组件封装的服用逻辑需要被包装组件的方法或属性的协同支持
            return <WrappendCompent ref={(instance) => { this.wrappedInstance = instance }} {...this.props} />
        }
    }
}
class MyComponent extends Component {
    render() {
        return <div>{this.props.data}</div>
    }
}
const MyComponentWidthData = widthPersistentData(MyComponent)
```


3. 组件状态提升

高阶组件可以通过将被包装组件的转态及其相应的转态处理方法提升到高阶组件自身内部实现被包装组件的无状态化。

```
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
```

#### 如何实现

```
 <Twitter username='tylermcginnis33'>
  {(user) => user === null
    ? <Loading />
    : <Badge info={user} />}
</Twitter>
``` 


```
import React, { Component, PropTypes } from 'react'
import fetchUser from 'twitter'
// fetchUser接收用户名返回 promise
// 当得到 用户的数据的时候 ，返回resolve 状态

class Twitter extends Component {
  // 在这里写下你的代码
    constructor(){
        state: null
    }
      componentDidMount () {
        fetchUser(this.props.username)
          .then((user) => this.setState({user}))
      }

    return (){
        return this.props.children(this.state.user)
    }
    

```