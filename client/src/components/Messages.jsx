import { useState, useEffect } from 'react';
import axios from 'axios';

import MessagesTopBar from './MessagesTopBar';
import { generateUniqueId, getDate, loader, typeText } from '../utils/utils';

const Message = ({ id, message, from, time }) => {
  return (
    <div className={`message${from == 'Codex' ? ' message-ai' : ''}`} id={id}>
      <div className='message__body'>{message}</div>
      <div className='message__footer'><span className='message__authoring'>{from}{time}</span></div>
    </div>
  );
};

const hardMessages = [
  { id: 'asdq3edsadfq13r', from: 'An Awesome User', message: 'Hi, how are you doing?', time: ' - 10:30 PM' },
  { id: '51dq3edadfq13r', from: 'Codex', message: 'Stop bothering me with useless questions.', time: ' - 10:31 PM' },
];

const Messages = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(hardMessages);
  let loadInterval;

  const addMessage = (id, from, message, time) => { setMessages([...messages, { id, from, message, time }]) };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.trim().length) {
      alert('You gotta type something you know...');
      return;
    }

    // Users message
    addMessage(generateUniqueId(), 'An Awesome User', input, getDate(new Date()));
    // Reset user input/textarea
    setInput('');

    // Save bots unique id
    const uniqueId = generateUniqueId();
    // Add empty message for bot
    addMessage(uniqueId, 'Codex', ' ', '');
    // Do the . . . loading/typing for bot
    console.log(messages.find((msg) => msg.id === uniqueId));
    // loader()
  };

  useEffect(() => { console.log(messages) }, [messages]); // log messages when theres a change (DEVELOPMENT ONLY)

  return (
    <div className='app-main'>
      <div className='channel-feed'>
        {/* Only Visual Not Functional */}
        <MessagesTopBar />

        {/* Messages Area */}
        <div id='chat_container' className='channel-feed__body'>
          {messages.map((msg) => (
            <Message key={msg.id} {...msg}  />
          ))}
        </div>

        {/* Input / Send Message */}
        <div className='channel-feed__footer'>
          <form className='channel-message-form' onSubmit={(e) => handleSubmit(e)}>
            <div className='form-group'>
              <label className='form-label' htmlFor='message'>
                Message
              </label>
              <div className='form-control'>
                <textarea
                  id='message'
                  className='form-control'
                  name='message'
                  placeholder='Ask Codex...'
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => { if (e.keyCode == 13 && !e.shiftKey) handleSubmit(e); }}></textarea>
              </div>
            </div>
            <div className='form-footer'>
              <button className='button button--primary button--size-xl' type='submit'>
                <span className='button__content'>Send</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Messages;
