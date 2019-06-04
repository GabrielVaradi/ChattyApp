   import React, {Component} from 'react';

class Message extends Component {
  render() {
    return (
      <main className="messages">

      <div className="message">
        <span className="message-username">{this.props.message.username}</span>
        <span className="message-content">{this.props.message.content}</span>
      </div>
      <div className="message system">

      </div>
      </main>
    );
  }
}
export default Message;


//    import React, {Component} from 'react';
// import Notifications from './Notifications.jsx'
// class Message extends Component {
//   render() {
//     return (
//       <main className="messages">

//       <div className="message">
//         <span className="message-username">{this.props.message.username}</span>
//         <span className="message-content">{this.props.message.content}</span>
//         <Notifications notifications={this.props.notifications}/>
//       </div>
//       <div className="message system">

//       </div>
//       </main>
//     );
//   }
// }
// export default Message;







