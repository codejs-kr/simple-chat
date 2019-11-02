import React, { useState, useRef, useEffect } from 'react';
import './ChatInput.scss';

const ChatInput = ({ onSend }) => {
  const textareaEl = useRef(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    console.log('렌더링이 완료되었습니다!', message);
  }, [message]);

  /**
   * TEXTAREA 이벤트 핸들링
   */
  const handleChange = (e) => {
    // console.log('handleChange', e);

    const message = e.target.value.trim();
    setMessage(message);
  };

  /**
   * 키보드 이벤트 핸들링
   */
  const handleKeyDown = (e) => {
    console.log('handleKeyDown', e);
    const ENTER = e.key === 'Enter';
    const SHIFT = e.shiftKey;

    if (ENTER && !SHIFT) {
      e.preventDefault();
      handleSend();
    }
  };

  /**
   * 폼 이벤트 핸들링
   */
  const handleSubmit = (e) => {
    console.log('handleSubmit', e);
    e.preventDefault();
    handleSend();
  };

  /**
   * 전송 처리
   */
  const handleSend = () => {
    if (message) {
      onSend(message);
    }
    handleReset();
  };

  /**
   * TEXTAREA 리셋
   */
  const handleReset = () => {
    textareaEl.current.value = '';
    setMessage(null);
  };

  return (
    <form id="chat-form" method="post" action="/message" onSubmit={handleSubmit}>
      <textarea
        name="message"
        placeholder="Type message"
        maxLength="200"
        ref={textareaEl}
        onChange={handleChange}
        onKeyPress={handleKeyDown}
      />
      <button type="submit" className={message ? 'active' : ''}>
        <i className="material-icons">send</i>
      </button>
    </form>
  );
};

export default ChatInput;
