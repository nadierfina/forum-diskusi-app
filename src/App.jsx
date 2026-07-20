import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { LoadingBar } from 'react-redux-loading-bar';
import { useEffect } from 'react';
import { asyncPreloadProcess } from './states/isPreload/action';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import AddThreadPage from './pages/AddThreadPage';
import LeaderboardsPage from './pages/LeaderboardsPage';
import Navigation from './components/Navigation';
import { asyncUnsetAuthUser } from './states/authUser/action';

function App() {
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(asyncUnsetAuthUser());
  };

  const isPreload = useSelector((state) => state.isPreload);

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  if (isPreload) {
    return null;
  }

  if (authUser === null) {
    return (
      <>
        <LoadingBar style={{ backgroundColor: '#3c5a3e', height: '5px' }} />
        <main>
          <Routes>
            <Route path="/*" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </main>
      </>
    );
  }

  return (
    <>
      <LoadingBar style={{ backgroundColor: '#3c5a3e', height: '5px', zIndex: 9999 }} />
      <Navigation authUser={authUser} logout={onLogout} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/threads/:id" element={<DetailPage />} />
          <Route path="/new" element={<AddThreadPage />} />
          <Route path="/leaderboards" element={<LeaderboardsPage />} />
        </Routes>

        <a href="/new" style={{
          position: 'fixed', bottom: '30px', right: '30px',
          backgroundColor: '#3c5a3e', color: 'white',
          width: '60px', height: '60px', borderRadius: '50%',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          fontSize: '30px', textDecoration: 'none', boxShadow: '0 8px 25px rgba(60,90,62,0.3)',
          zIndex: 100
        }}>
          +
        </a>
      </main>
    </>
  );
}

export default App;