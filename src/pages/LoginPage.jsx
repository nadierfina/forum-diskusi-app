import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import LoginInput from '../components/LoginInput';
import { asyncSetAuthUser } from '../states/authUser/action';
import '../styles/auth.css';
function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
    navigate('/');
  };

  return (
    <section className="auth-page">
      <div className="auth-container">
        <h2>Yuk, Masuk Dulu!</h2>
        <LoginInput login={onLogin} />
        <p>Belum punya akun? <Link to="/register">Daftar di sini</Link></p>
      </div>
    </section>
  );
}

export default LoginPage;