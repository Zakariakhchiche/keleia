import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const Markdown = ({ markdownText }) => {
  return (
    <ReactMarkdown
      components={{
        code({ inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || 'language-js');
          return !inline ? (
            <SyntaxHighlighter
              {...props}
              style={atomDark}
              language={match[1]}
              PreTag='div'>
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code {...props} className={className}>
              {children}
            </code>
          );
        },
        strong: ({ node, ...props }) => (
          <span className="font-bold" {...props} />
        ),
        em: ({ node, ...props }) => (
          <span className="italic" {...props} />
        ),
        p: ({ node, ...props }) => (
          <p className="mb-2" {...props} />
        ),
      }}>
      {markdownText}
    </ReactMarkdown>
  );
};

export default Markdown;

Markdown.propTypes = {
  markdownText: PropTypes.string,
};
