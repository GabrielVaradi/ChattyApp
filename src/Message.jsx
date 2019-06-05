import React from 'react';

//Display the messages
const Message = ({message}) => {
  const {color, content, id, type, username} = message
  //Styling for the notifications
  const notificationStyle = {
    fontStyle: 'italic',
    fontWeight: 'bold',
  };
  //Styling for the messages
  const messageStyle = {
    color: color,
  };
  //Styling for the images
  const imageStyle = {
    maxWidth: '60%',
    maxHeight: '60%',
    display: 'block',
    marginTop: '10px'
  };
  //RegEx to match an URL ending with jpb, gif or png
  const matchImage = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g;
  //If the message type is postMessage
  const isMessage = type === 'postMessage' ?
    <div>
      <div className="message">
        <span style={messageStyle} className="message-username">{username}</span>
        <span className="message-content">{content}</span>
      </div>
    </div>
  :
   <div className="notification">
      <div className="message system">
        <span style={notificationStyle} className="message-content">{content.match(matchImage) ? <span>{content.replace(matchImage, '')}<img style={imageStyle} src={content.match(matchImage)}/></span> : content}</span>
      </div>
    </div>

return isMessage
};

export default Message;

