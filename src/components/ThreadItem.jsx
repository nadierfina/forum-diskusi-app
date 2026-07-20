import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function ThreadItem({
  id, title, body, category, createdAt, totalComments, user,
  upVotesBy, downVotesBy, authUser, upVote, downVote
}) {
  const date = new Date(createdAt).toLocaleDateString('id-ID', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  const isUpVoted = upVotesBy.includes(authUser);
  const isDownVoted = downVotesBy.includes(authUser);

  return (
    <div className="thread-item">
      <div className="thread-header">
        <span className="thread-category">#{category}</span>
        <p className="thread-date">{date}</p>
      </div>

      <Link to={`/threads/${id}`} className="thread-title-link">
        <h3 className="thread-title">{title}</h3>
      </Link>

      <div className="thread-body" dangerouslySetInnerHTML={{ __html: body }} />

      <div className="thread-footer">
        <div className="thread-author">
          <img src={user.avatar} alt={user.name} />
          <span>{user.name}</span>
        </div>
        <div className="thread-actions" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <button
            onClick={() => upVote(id)}
            style={{ border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', padding: '4px' }}>
            <svg
              width="20" height="20" viewBox="0 0 24 24"
              fill={isUpVoted ? '#3c5a3e' : 'none'}
              stroke={isUpVoted ? '#3c5a3e' : '#7b947c'}
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M12 19V5M5 12l7-7 7 7"/>
            </svg>
            <span style={{ color: isUpVoted ? '#3c5a3e' : '#7b947c', fontWeight: 'bold', fontSize: '14px' }}>
              {upVotesBy.length}
            </span>
          </button>

          <button
            onClick={() => downVote(id)}
            style={{ border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', padding: '4px' }}>
            <svg
              width="20" height="20" viewBox="0 0 24 24"
              fill={isDownVoted ? '#e07a5f' : 'none'}
              stroke={isDownVoted ? '#e07a5f' : '#7b947c'}
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M12 5v14M19 12l-7 7-7-7"/>
            </svg>
            <span style={{ color: isDownVoted ? '#e07a5f' : '#7b947c', fontWeight: 'bold', fontSize: '14px' }}>
              {downVotesBy.length}
            </span>
          </button>

          <Link to={`/threads/${id}`} style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '4px', textDecoration: 'none' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7b947c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            <span style={{ color: '#7b947c', fontWeight: 'bold', fontSize: '14px' }}>
              {totalComments}
            </span>
          </Link>

        </div>
      </div>
    </div>
  );
}

ThreadItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  totalComments: PropTypes.number.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired
  }).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  authUser: PropTypes.string.isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired
};

export default ThreadItem;