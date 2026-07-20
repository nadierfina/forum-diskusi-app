import { useState } from 'react';
import PropTypes from 'prop-types';

function ThreadInput({ addThread }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [body, setBody] = useState('');

  const onSubmitHandler = (event) => {
    event.preventDefault();
    addThread({ title, body, category });
  };

  return (
    <form className="comment-form" onSubmit={onSubmitHandler}>
      <input
        type="text"
        placeholder="Judul Diskusi"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        style={{ padding: '16px', borderRadius: '16px', border: '1.5px solid #d6e3d2', marginBottom: '12px', outline: 'none' }}
      />
      <input
        type="text"
        placeholder="Kategori (Opsional)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={{ padding: '16px', borderRadius: '16px', border: '1.5px solid #d6e3d2', outline: 'none' }}
      />
      <textarea
        placeholder="Apa yang ingin kamu diskusikan?"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        required
      />
      <button type="submit">Buat Diskusi</button>
    </form>
  );
}

ThreadInput.propTypes = {
  addThread: PropTypes.func.isRequired
};

export default ThreadInput;