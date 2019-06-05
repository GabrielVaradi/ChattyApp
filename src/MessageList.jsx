import React, {Component} from 'react';
import Message from './Message.jsx'

class MessageList extends Component {
  render() {
    const messageItems = this.props.messages.map(message => {
        return (
      <Message key = {message.id} message={message} />
        )

    });
    return (
   <div>
     <div> {messageItems} </div>
   </div>
    );
  }
}
export default MessageList;
