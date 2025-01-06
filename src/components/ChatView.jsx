import { useState, useRef, useEffect, useContext } from 'react';
import Message from './Message';
import { ChatContext } from '../context/chatContext';
import Thinking from './Thinking';
import { MdSend } from 'react-icons/md';
import { replaceProfanities } from 'no-profanity';
import { davinci } from '../utils/davinci';

const options = ['E-da-IA'];
const template = [
  {
    title: 'Quelles sont les conditions pour qu\'une prière soit acceptée ?',
    prompt: 'Quelles sont les conditions essentielles pour qu\'une prière soit valide et acceptée en Islam ?',
  },
  {
    title: 'Quels sont les actes qui invalident le jeûne ?',
    prompt: 'Pouvez-vous expliquer en détail les différents actes qui peuvent invalider le jeûne du Ramadan ?',
  },
  {
    title: 'Quelles sont les conditions d\'un mariage islamique valide ?',
    prompt: 'Quelles sont les conditions requises pour qu\'un mariage soit considéré comme valide selon la loi islamique ?',
  },
  {
    title: 'Quelle est la meilleure manière de lire et mémoriser le Coran ?',
    prompt: 'Quelles sont les méthodes recommandées pour une lecture efficace et une mémorisation durable du Coran ?',
  },
];

const ChatView = () => {
  const messagesEndRef = useRef();
  const inputRef = useRef();
  const [formValue, setFormValue] = useState('');
  const [thinking, setThinking] = useState(false);
  const [selected, setSelected] = useState(options[0]);
  const [textareaHeight, setTextareaHeight] = useState(0);
  const { messages, addMessage, open } = useContext(ChatContext);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, thinking]);

  const sendMessage = async (e) => {
    e.preventDefault();

    const prompt = replaceProfanities(formValue);
    
    if (!prompt.trim()) return;

    setThinking(true);
    setFormValue('');
    addMessage({
      id: messages.length + 1,
      createdAt: Date.now(),
      text: prompt,
      ai: false,
    });

    try {
      const response = await davinci(prompt);
      if (response) {
        addMessage({
          id: messages.length + 2,
          createdAt: Date.now(),
          text: response,
          ai: true,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      addMessage({
        id: messages.length + 2,
        createdAt: Date.now(),
        text: "Désolé, une erreur s'est produite. Veuillez réessayer.",
        ai: true,
      });
    } finally {
      setThinking(false);
    }
  };

  return (
    <main className={`relative flex flex-col h-screen bg-white dark:bg-neutral-800 ${open ? 'ml-72' : 'ml-16'} transition-all duration-300`}>
      <div className="flex-1 overflow-hidden">
        <div className="flex h-full flex-col justify-between space-y-1 overflow-hidden">
          <div className="overflow-y-auto overflow-x-hidden p-4">
            {messages.length === 0 ? (
              <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2">
                {template.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setFormValue(item.prompt)}
                    className="flex flex-col gap-2 rounded-lg border border-neutral-200 p-4 text-left hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-700/50"
                  >
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-300">{item.prompt}</p>
                  </button>
                ))}
              </div>
            ) : (
              messages.map((message) => (
                <Message
                  key={message.id}
                  text={message.text}
                  ai={message.ai}
                  createdAt={message.createdAt}
                />
              ))
            )}
            {thinking && <Thinking />}
            <div ref={messagesEndRef} />
          </div>
          
          <form
            onSubmit={sendMessage}
            className="flex flex-col items-center space-y-3 border-t border-neutral-200 p-4 dark:border-neutral-700 sm:px-4 md:px-6 md:py-3"
          >
            <div className="flex w-full flex-col items-center space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
              <select
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
                className="w-full select select-bordered rounded-lg text-sm sm:w-40"
              >
                <option>{options[0]}</option>
              </select>
              <div className="relative flex h-full flex-1 items-stretch md:flex-grow">
                <textarea
                  ref={inputRef}
                  className="w-full resize-none rounded-xl border border-neutral-300 bg-transparent px-4 py-3 pr-10 text-sm focus:outline-none dark:border-neutral-700"
                  style={{
                    resize: 'none',
                    bottom: `${textareaHeight}px`,
                    maxHeight: '400px',
                    overflow: `${textareaHeight > 400 ? 'auto' : 'hidden'}`,
                  }}
                  placeholder="Posez votre question sur l'Islam..."
                  value={formValue}
                  rows={1}
                  onChange={(e) => {
                    const textarea = e.target;
                    setFormValue(textarea.value);
                    textarea.style.height = 'auto';
                    textarea.style.height = textarea.scrollHeight + 'px';
                    setTextareaHeight(textarea.scrollHeight);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage(e);
                    }
                  }}
                />
                <button
                  type="submit"
                  disabled={!formValue.trim()}
                  className="absolute bottom-2 right-2 rounded-lg p-1 text-neutral-800 opacity-60 hover:bg-neutral-200 hover:opacity-100 disabled:opacity-30 dark:text-neutral-100 dark:hover:bg-neutral-700"
                >
                  <MdSend size={20} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default ChatView;
