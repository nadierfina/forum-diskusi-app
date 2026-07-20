import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { asyncReceiveLeaderboards } from '../states/leaderboards/action';
import '../styles/leaderboard.css';

function LeaderboardsPage() {
  const dispatch = useDispatch();
  const leaderboards = useSelector((state) => state.leaderboards);

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  return (
    <section className="leaderboard-page">
      <div className="leaderboard-container">
        <h2>Klasemen Pengguna Aktif</h2>
        <div className="leaderboard-list">
          {leaderboards.map(({ user, score }, index) => (
            <div key={user.id} className="leaderboard-item">
              <div className="user-info">
                <span className="rank">#{index + 1}</span>
                <img src={user.avatar} alt={user.name} />
                <strong>{user.name}</strong>
              </div>
              <span className="score">{score} Poin</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LeaderboardsPage;