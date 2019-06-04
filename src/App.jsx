import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx'
import NavBar from './NavBar.jsx'
import MessageList from './MessageList.jsx'
import { generateRandomId } from "./utils";





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
this.addMessage = this.addMessage.bind(this);

}



addMessage(message) {

  console.log(message)
  const oldMessages = this.state.messages;
  const newMessages = [
    ...oldMessages,
     { username: this.state.currentUser.name, content: message, id: generateRandomId() }
  ];
    this.setState({ messages: newMessages });

  }


componentDidMount() {
    const webSocket = new WebSocket("ws://localhost:3001")
    console.log(webSocket)
    webSocket.addEventListener('open', function (event) {
      console.log(webSocket);
    webSocket.send('Hello Server!');
});
    webSocket.addEventListener('error', function (event){
      console.log(event)
    })
    this.setState({webSocket: webSocket})
  console.log("componentDidMount <App />");
  setTimeout(() => {
    console.log("Simulating incoming message");
    // Add a new message to the list of messages in the data store
    const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    const messages = this.state.messages.concat(newMessage)
    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
    this.setState({messages: messages})
  }, 3000);
}



  render() {
    return (
    <div>
      <NavBar/>
        <MessageList messages={this.state.messages}/>
      <ChatBar currentUser={this.state.currentUser.name} addMessage={this.addMessage}/>
      </div>
    );
  }
}
export default App;
