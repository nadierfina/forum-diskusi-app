import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';
import { asyncToggleUpVoteThread, asyncToggleDownVoteThread } from '../states/threads/action';
import ThreadItem from '../components/ThreadItem';
import '../styles/home.css';

function HomePage() {
  const dispatch = useDispatch();
  const threads = useSelector((state) => state.threads);
  const users = useSelector((state) => state.users);
  const authUser = useSelector((state) => state.authUser);

  const [filterCategory, setFilterCategory] = useState('');

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const onUpVote = (id) => dispatch(asyncToggleUpVoteThread(id));
  const onDownVote = (id) => dispatch(asyncToggleDownVoteThread(id));

  const threadList = threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId) || {
      name: 'Pengguna Anonim',
      avatar: 'https://ui-avatars.com/api/?name=Anonim&background=random'
    }
  }));

  const categories = Array.from(new Set(threads.map((t) => t.category)));

  const filteredThreads = filterCategory
    ? threadList.filter((thread) => thread.category === filterCategory)
    : threadList;

  return (
    <section className="home-page">
      <div className="home-container">
        <h2>Daftar Diskusi</h2>

        <div className="category-filter" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '24px' }}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilterCategory(filterCategory === category ? '' : category)}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: '1.5px solid #d6e3d2',
                background: filterCategory === category ? '#3c5a3e' : 'white',
                color: filterCategory === category ? 'white' : '#2F4F2F',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              #{category}
            </button>
          ))}
        </div>

        <div className="thread-list">
          {filteredThreads.map((thread) => (
            <ThreadItem
              key={thread.id}
              {...thread}
              authUser={authUser?.id || ''}
              upVote={onUpVote}
              downVote={onDownVote}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomePage;