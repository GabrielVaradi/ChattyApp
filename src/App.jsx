import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx'
import NavBar from './NavBar.jsx'
import MessageList from './MessageList.jsx'



class App extends Component {

  constructor(props) {
  super(props);
  this.state = {
    currentUser: {name:'Bob'},
    messages: [
    {
      username: 'Bob',
      content: 'text text text text text',
    }
  ]
}
}
  render() {
    return (
    <div>
      <NavBar/>
        <MessageList/>
      <ChatBar/>
      </div>
    );
  }
}
export default App;
