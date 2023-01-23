import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const socket = io('http://localhost:3000');
    socket.on('chat message', msg => {
      setMessages(prevMessages => [...prevMessages, msg]);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    const socket = io('http://localhost:3000');
    socket.emit('chat message', message);
    setMessage('');
  };

  return (
    <div>
      <h2>Chat</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Enter your message"
        />
        <button type="submit">Send</button>
      </form>
      <div>
        {messages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
    </div>
  );
}

export default Chat;
