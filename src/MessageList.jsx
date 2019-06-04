import React, {Component} from 'react';
import Message from './Message.jsx'

class MessageList extends Component {
  render() {
    const messageItems = this.props.messages.map(message => (
      <Message key = {message.id} message={message} />
    ));
    return (
     <div> {messageItems} </div>

    );
  }
}
export default MessageList;
