### react 生命周期

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

### react-router


### 组件

1.在开发react应用的时候，一定要认真考虑哪些组件应该设计成有哪些状态组件。哪些应该设计成无状态组价。应该尽可能多的使用无状态组件。无状态组件不需要关心状态的变化，只聚焦于UI 展示。因而更加容易复用。
2.react组件设计的思路是： 通过定义少数的有状态组件管理整个应用的状态变化，并且将状态通过props传递给其余的无转态组件。由无状态组件完成页面大部分UI 的渲染工作；  

### react-hot-loader
