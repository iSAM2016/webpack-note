import React, {
  Component
} from 'react'

class App extends Component {
  render() {
    const { children } = this.props
    return <section>
      {children}
    </section>
  }
}

export default App;
