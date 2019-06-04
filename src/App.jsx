import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx'
import NavBar from './NavBar.jsx'
import MessageList from './MessageList.jsx'
import { generateRandomId } from "./utils";
    const webSocket = new WebSocket("ws://localhost:3001")


class App extends Component {

  constructor(props) {
  super(props);
  this.state = {
  currentUser: {name: "Bob"},
  messages: [
    {
      username: "Bob",
      content: "Has anyone seen my marbles?",
      id: 'kappa123'
    },
    {
      username: "Anonymous",
      content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
      id: 'kappa1234'

    }
  ]
}
// this.addMessage = this.addMessage.bind(this);
this.sendMessage = this.sendMessage.bind(this);


}

sendMessage(message) {
  const msg = {
    username: this.state.currentUser,
    text: message,
    id: generateRandomId()
  };

  webSocket.send(JSON.stringify(msg));

}



// addMessage(message) {

//     webSocket.send(message);

//   const oldMessages = this.state.messages;
//   const newMessages = [
//     ...oldMessages,
//      { username: this.state.currentUser.name, content: message, id: generateRandomId() }
//   ];
//     this.setState({ messages: newMessages });

//   }


componentDidMount() {
    webSocket.addEventListener('open', function (event) {
});
    webSocket.addEventListener('error', function (event){
      console.log(event)
    })
    this.setState({webSocket: webSocket})
  console.log("componentDidMount <App />");
  setTimeout(() => {
    console.log("Simulating incoming message");
    const newMessage = {id: 3, username: "Obi-Wan Kenobi", content: "Hello there!"};
    const messages = this.state.messages.concat(newMessage)
    this.setState({messages: messages})
  }, 1500);
    setTimeout(() => {
    console.log("Simulating incoming message");
    const newMessage = {id: 66, username: "Grievous", content: "General Kenobi!"};
    const messages = this.state.messages.concat(newMessage)
    this.setState({messages: messages})
  }, 3000);
}



  render() {
    return (
    <div>
      <NavBar/>
        <MessageList messages={this.state.messages}/>
      <ChatBar currentUser={this.state.currentUser.name} sendMessage={this.sendMessage}/>
      </div>
    );
  }
}
export default App;
