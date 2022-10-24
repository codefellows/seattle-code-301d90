# Warm-Up Exercise

Your teammate is new to React and has asked for your advice on this code. How would you advise them to break this code into components?

## app.js

```jsx
import React from 'react';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      imageOne:"http://3.bp.blogspot.com/_DBYF1AdFaHw/TE-f0cDQ24I/AAAAAAAACZg/l-FdTZ6M7z8/s1600/Unicorn_and_Narwhal_by_dinglehopper.jpg",
      imageTwo: "https://secure.img1-ag.wfcdn.com/im/17007094/resize-h800%5Ecompr-r85/3589/35892451/Baby+Rhino+Figurine.jpg",
      imageThree: "http://www.zooborns.com/.a/6a010535647bf3970b0223c84d5959200c-800wi",
      imageOneVotes: 0,
      imageTwoVotes: 0,
      imageThreeVotes: 0
    }
  }
  render() {
    return(
      <>
        <h1>Vote on Your Favorite Animal!</h1>
        <p>We have three adorable animals here. Vote on your favorite one and watch their likes go up!</p>
        <div onClick={() => this.setState({ imageOneVotes: this.state.imageOneVotes + 1 })}>
          <h2>UniWhal</h2>
          <span>likes: {this.state.imageOneVotes}</span>
          <img src={this.state.imageOne} />
        </div>
        <div onClick={() => this.setState({ imageTwoVotes: this.state.imageTwoVotes + 1 })}>
          <h2>Baby Rhino</h2>
          <span>likes: {this.state.imageTwoVotes}</span>
          <img src={this.state.imageTwo} />
        </div>
        <div onClick={() => this.setState({ imageThreeVotes: this.state.imageThreeVotes + 1 })}>
          <h2>Baby markhor</h2>
          <span>likes: {this.state.imageThreeVotes}</span>
          <img src={this.state.imageThree} />
        </div>
      </>
    )
  }
}

export default App;
```
