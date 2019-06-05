import React from 'react';

//Display the chat bar
const ChatBar = ({sendMessage, changeUsername, currentUser}) => {
   //On submit, call the sendMessage function (send message to the server)
   const onSubmitMessage = event => {
     event.preventDefault();
     const messageInput = event.target.elements.newMessage;
     sendMessage(messageInput.value);
     messageInput.value = "";
 };
   //On submit, call the changeUsername function (change the username)
    const onSubmitName = event => {
     event.preventDefault();
     const usernameInput = event.target.elements.newUsername;
     changeUsername(usernameInput.value);
 };

  return (
    <footer className="chatbar">
      <form onSubmit={onSubmitName}>
        <input className="chatbar-username" name="newUsername" placeholder={currentUser}/>
     </form>
     <form onSubmit={onSubmitMessage}>
       <input type='text' name='newMessage' className="chatbar-message" placeholder="Type a message and hit ENTER" />
     </form>
     </footer>
    );
};

export default ChatBar;










