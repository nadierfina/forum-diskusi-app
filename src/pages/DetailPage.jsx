import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  asyncReceiveThreadDetail,
  asyncAddComment,
  asyncToggleUpVoteComment,
  asyncToggleDownVoteComment
} from '../states/detailThread/action';
import CommentInput from '../components/CommentInput';
import CommentItem from '../components/CommentItem';
import '../styles/detail.css';

function DetailPage() {
  const { id } = useParams();
  const detailThread = useSelector((state) => state.detailThread);
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  const onAddComment = (content) => {
    dispatch(asyncAddComment({ threadId: id, content }));
  };

  const onUpVoteComment = (commentId) => {
    dispatch(asyncToggleUpVoteComment(commentId));
  };

  const onDownVoteComment = (commentId) => {
    dispatch(asyncToggleDownVoteComment(commentId));
  };

  if (detailThread === null) {
    return <p className="loading-text">Sedang memuat isi diskusi...</p>;
  }

  return (
    <section className="detail-page">
      <div className="detail-container">

        <header className="detail-header">
          <span className="detail-category">#{detailThread.category}</span>
          <h2>{detailThread.title}</h2>

          <div className="detail-author">
            <img src={detailThread.owner.avatar} alt={detailThread.owner.name} />
            <div className="author-info">
              <strong>{detailThread.owner.name}</strong>
              <span>
                {new Date(detailThread.createdAt).toLocaleDateString('id-ID', {
                  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                })}
              </span>
            </div>
          </div>
        </header>

        <article className="detail-body" dangerouslySetInnerHTML={{ __html: detailThread.body }} />

        <hr className="detail-divider" />
        <div className="detail-comments-section">
          <h3>Komentar ({detailThread.comments.length})</h3>

          {/* Kotak Input Komentar */}
          <CommentInput addComment={onAddComment} />

          {/* Daftar Komentar */}
          <div className="comments-list">
            {detailThread.comments.map((comment) => (
              <CommentItem
                key={comment.id}
                {...comment}
                authUser={authUser.id}
                upVote={onUpVoteComment}
                downVote={onDownVoteComment}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

export default DetailPage;