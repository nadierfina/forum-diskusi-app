import { useState } from 'react';
import PropTypes from 'prop-types';

function CommentInput({ addComment }) {
  const [content, setContent] = useState('');

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (content.trim()) {
      addComment(content);
      setContent('');
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="comment-form">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Tulis pendapatmu di sini..."
        required
      />
      <button type="submit">Kirim Komentar</button>
    </form>
  );
}

CommentInput.propTypes = {
  addComment: PropTypes.func.isRequired
};

export default CommentInput;