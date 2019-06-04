import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx'
import NavBar from './NavBar.jsx'
import MessageList from './MessageList.jsx'


class App extends Component {

  constructor(props) {
  super(props);
  this.state = {
  currentUser: {name: 'Anonymous'},
  messages: []
}
this.addMessage = this.addMessage.bind(this);
this.sendMessage = this.sendMessage.bind(this);
this.webSocket = new WebSocket("ws://localhost:3001")
this.changeUsername = this.changeUsername.bind(this);



}

changeUsername(username) {
  console.log(username);
  console.log(this.state);
  // const user = JSON.parse(username)
  const oldUsername = this.state.currentUser.name;
  const newUsername = {name: username}
    this.setState({ currentUser: newUsername });
  }


sendMessage(message) {
  const msg = {
    username: this.state.currentUser,
    text: message,
  };

  this.webSocket.send(JSON.stringify(msg));

}

addMessage(message) {
  const newMessage = JSON.parse(message)
  const oldMessages = this.state.messages;
  const newMessages = [
    ...oldMessages,
     { username: newMessage.username.name, content: newMessage.text, id: newMessage.id }
  ];
    this.setState({ messages: newMessages });

  }


componentDidMount() {
  this.webSocket.addEventListener('open', function (event) {
});
  this.webSocket.addEventListener('error', function (event){
      console.log(event)
    })
  this.setState({webSocket: this.webSocket})
  console.log("componentDidMount <App />");
  this.webSocket.onmessage = (event) => {
    this.addMessage(event.data);
}
}




  render() {
    return (
    <div>
      <NavBar/>
        <MessageList messages={this.state.messages}/>
      <ChatBar currentUser={this.state.currentUser.name} sendMessage={this.sendMessage} changeUsername={this.changeUsername}/>
      </div>
    );
  }
}
export default App;
