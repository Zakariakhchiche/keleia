import PropTypes from 'prop-types';
import { MdComputer, MdPerson } from 'react-icons/md';
import moment from 'moment';
import Markdown from './Markdown';

/**
 * A chat message component that displays a message with a timestamp and an icon.
 *
 * @param {Object} props - The properties for the component.
 */
const Message = ({ text, ai, createdAt }) => {
  return (
    <div
      className={`flex items-start space-x-4 py-4 ${
        ai ? 'bg-neutral-100 dark:bg-neutral-800/50 px-4 -mx-4' : ''
      }`}>
      <div className="flex-shrink-0">
        {ai ? (
          <MdComputer className="w-8 h-8 text-neutral-600 dark:text-neutral-400" />
        ) : (
          <MdPerson className="w-8 h-8 text-neutral-600 dark:text-neutral-400" />
        )}
      </div>
      <div className="flex-1 space-y-2 overflow-hidden">
        <div className={`text-sm sm:text-base leading-relaxed whitespace-pre-wrap break-words ${
          ai ? 'text-neutral-800 dark:text-neutral-100' : 'text-neutral-600 dark:text-neutral-300'
        }`}>
          <Markdown markdownText={text} />
        </div>
        {createdAt && (
          <div className="text-xs text-neutral-500 dark:text-neutral-400">
            {moment(createdAt).calendar()}
          </div>
        )}
      </div>
    </div>
  );
};

Message.propTypes = {
  text: PropTypes.string.isRequired,
  ai: PropTypes.bool,
  createdAt: PropTypes.number
};

Message.defaultProps = {
  ai: false,
  createdAt: null
};

export default Message;
