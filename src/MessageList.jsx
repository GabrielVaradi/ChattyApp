import React from 'react';
//Import child JSX file
import Message from './Message.jsx';

//Loops through the message array and sends the information to the child component Message
const MessageList = ({messages}) => {
  const messageItems = messages.map(message => {
    return (
      <Message key={message.id} message={message} />
    )
  });
  return (
    <main className="messages">
      <div> {messageItems} </div>
    </main>
  );
};

export default MessageList;
