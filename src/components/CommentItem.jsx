import PropTypes from 'prop-types';

function CommentItem({ id, content, createdAt, owner, upVotesBy, downVotesBy, authUser, upVote, downVote }) {
  const date = new Date(createdAt).toLocaleDateString('id-ID', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  const isUpVoted = upVotesBy.includes(authUser);
  const isDownVoted = downVotesBy.includes(authUser);

  return (
    <div className="comment-item">
      <div className="comment-header">
        <img src={owner.avatar} alt={owner.name} />
        <div className="comment-owner-info">
          <strong>{owner.name}</strong>
          <span>{date}</span>
        </div>
      </div>
      <div className="comment-body" dangerouslySetInnerHTML={{ __html: content }} />

      {/* Tombol Interaksi Komentar */}
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginTop: '16px' }}>
        <button
          onClick={() => upVote(id)}
          style={{ border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', padding: '0' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill={isUpVoted ? '#3c5a3e' : 'none'} stroke={isUpVoted ? '#3c5a3e' : '#7b947c'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 19V5M5 12l7-7 7 7"/>
          </svg>
          <span style={{ color: isUpVoted ? '#3c5a3e' : '#7b947c', fontWeight: 'bold', fontSize: '13px' }}>{upVotesBy.length}</span>
        </button>

        <button
          onClick={() => downVote(id)}
          style={{ border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', padding: '0' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill={isDownVoted ? '#e07a5f' : 'none'} stroke={isDownVoted ? '#e07a5f' : '#7b947c'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M19 12l-7 7-7-7"/>
          </svg>
          <span style={{ color: isDownVoted ? '#e07a5f' : '#7b947c', fontWeight: 'bold', fontSize: '13px' }}>{downVotesBy.length}</span>
        </button>
      </div>
    </div>
  );
}

CommentItem.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired
  }).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  authUser: PropTypes.string.isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired
};

export default CommentItem;