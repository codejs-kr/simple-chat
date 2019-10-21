import React, { Component } from 'react';
import './ChatInput.scss';

class ChatInput extends Component {
  constructor(props) {
    super(props);

    this.form = React.createRef();
    this.state = {
      message: null,
    };
  }

  /**
   * TEXTAREA 이벤트 핸들링
   */
  handleChange = (e) => {
    const message = e.target.value.trim();

    this.setState({
      message,
    });
  };

  /**
   * 키보드 이벤트 핸들링
   */
  handleKeyDown = (e) => {
    // console.log('handleKeyDown', e);
    const ENTER = e.key === 'Enter';
    const SHIFT = e.shiftKey;

    if (ENTER && !SHIFT) {
      this.handleSend();
      e.preventDefault();
    }
  };

  /**
   * 폼 이벤트 핸들링
   */
  handleSubmit = (e) => {
    this.handleSend();
    e.preventDefault();
  };

  /**
   * 전송 처리
   */
  handleSend = () => {
    const { onSend } = this.props;
    const { message } = this.state;

    if (message) {
      alert(message);
      // onSend()
    }
  };

  render() {
    const { message } = this.state;
    const { handleSubmit, handleChange, handleKeyDown } = this;

    return (
      <form id="chat-form" method="post" action="/message" onSubmit={handleSubmit} ref={this.form}>
        <textarea name="message" placeholder="Type message" onChange={handleChange} onKeyDown={handleKeyDown} />
        <button type="submit" className={message ? 'active' : ''}>
          <i className="material-icons">send</i>
        </button>
      </form>
    );
  }
}

export default ChatInput;
