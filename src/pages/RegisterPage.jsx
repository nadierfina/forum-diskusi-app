import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import RegisterInput from '../components/RegisterInput';
import { asyncRegisterUser } from '../states/users/action';
import '../styles/auth.css';

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onRegister = async ({ name, email, password }) => {
    const isSuccess = await dispatch(asyncRegisterUser({ name, email, password }));
    if (isSuccess) {
      navigate('/login');
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-container">
        <h2>Buat Akun Baru</h2>
        <RegisterInput register={onRegister} />
        <p>Sudah punya akun? <Link to="/login">Masuk di sini</Link></p>
      </div>
    </section>
  );
}

export default RegisterPage;