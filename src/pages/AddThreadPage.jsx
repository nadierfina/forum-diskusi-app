import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ThreadInput from '../components/ThreadInput';
import { asyncAddThread } from '../states/threads/action';

function AddThreadPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onAddThread = ({ title, body, category }) => {
    dispatch(asyncAddThread({ title, body, category }));
    navigate('/');
  };

  return (
    <section className="detail-page">
      <div className="detail-container">
        <div className="detail-header">
          <h2>Buat Diskusi Baru</h2>
        </div>
        <ThreadInput addThread={onAddThread} />
      </div>
    </section>
  );
}

export default AddThreadPage;