import React, {Component} from 'react';
import Message from './Message.jsx'
import Notifications from './Notifications.jsx'

class MessageList extends Component {
  render() {
    const notifications = this.props.notifications
    const messageItems = this.props.messages.map(message => (
      <Message key = {message.id} message={message} />
    ));
    return (
   <div>
     <div> {messageItems} </div>
     <Notifications notifications={notifications}/>
   </div>
    );
  }
}
export default MessageList;

// import React, {Component} from 'react';
// import Message from './Message.jsx'
// import Notifications from './Notifications.jsx'

// class MessageList extends Component {
//   render() {
//     const notifications = this.props.notifications
//     const messageItems = this.props.messages.map(message => (
//       <Message key = {message.id} message={message} notifications={notifications} />
//     ));
//     return (
//    <div>
//      <div> {messageItems} </div>
//    </div>
//     );
//   }
// }
// export default MessageList;

