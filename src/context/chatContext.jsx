import PropTypes from 'prop-types';
import { createContext, useState } from 'react';
import useMessageCollection from '../hooks/useMessageCollection';

/**
 * ChatContext is a context object that is used to share collection of messages
 * between components
 */
const ChatContext = createContext({
  messages: [],
  addMessage: () => {},
  clearChat: () => {},
  open: true,
  setOpen: () => {}
});

/**
 * ChatContextProvider is a functional component that serves as a provider for the ChatContext.
 * It provides the ChatContext to the components within its subtree.
 *
 * @param {Object} props - The properties passed to the component.
 * @returns {JSX.Element} A ChatContext.Provider element.
 */
const ChatContextProvider = (props) => {
  const { messages, addMessage, clearChat } = useMessageCollection();
  const [open, setOpen] = useState(true);

  return (
    <ChatContext.Provider value={{ messages, addMessage, clearChat, open, setOpen }}>
      {props.children}
    </ChatContext.Provider>
  );
};

export { ChatContext, ChatContextProvider };

ChatContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
