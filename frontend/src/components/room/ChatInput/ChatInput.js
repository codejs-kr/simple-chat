import React, { useState, useRef } from 'react';
import './ChatInput.scss';

const ChatInput = () => {
  const textareaEl = useRef(null);
  const [message, setMessage] = useState(null);

  /**
   * TEXTAREA 이벤트 핸들링
   */
  const handleChange = (e) => {
    const message = e.target.value.trim();
    setMessage(message);
  };

  /**
   * 키보드 이벤트 핸들링
   */
  const handleKeyDown = (e) => {
    // console.log('handleKeyDown', e);
    const ENTER = e.key === 'Enter';
    const SHIFT = e.shiftKey;

    if (ENTER && !SHIFT) {
      handleSend();
      e.preventDefault();
    }
  };

  /**
   * 폼 이벤트 핸들링
   */
  const handleSubmit = (e) => {
    handleSend();
    e.preventDefault();
  };

  /**
   * 전송 처리
   */
  const handleSend = () => {
    // const { onSend } = this.props;
    // onSend()

    if (message) {
      alert(message);
      handleReset();
    }
  };

  /**
   * TEXTAREA 리셋
   */
  const handleReset = () => {
    textareaEl.current.value = '';
  };

  return (
    <form id="chat-form" method="post" action="/message" onSubmit={handleSubmit}>
      <textarea
        name="message"
        placeholder="Type message"
        ref={textareaEl}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <button type="submit" className={message ? 'active' : ''}>
        <i className="material-icons">send</i>
      </button>
    </form>
  );
};

export default ChatInput;
