# Warm-Up Exercise

Read through this code as if you are the interpreter. Find all of the mistakes in this code and write down the correct syntax for each mistake.

## app.js

```javascript
import Header from './header.js';

class App extends React.Component {
  constructor {
    super(props)
    this.state={
      counter=0
    }
  }

  addCount = () => {
    this.setState({ counter: counter++ });
  }

  render() {
    return(
      <button click={addCount}>Click Me</button>
      <p>this.state.counter<p>
      <Header title="the best counter app in the world!">
    )
  }
}

export App;
```

## header.js

```javascript
class Header extends React.Component {
  render(){
    <h1>{title}</h1>
  }
}

export Header;
```
