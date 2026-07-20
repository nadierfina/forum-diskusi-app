import { useState } from 'react';
import PropTypes from 'prop-types';

function RegisterInput({ register }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = (event) => {
    event.preventDefault();
    register({ name, email, password });
  };

  return (
    <form onSubmit={onSubmitHandler} className="auth-form">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nama"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Daftar</button>
    </form>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired
};

export default RegisterInput;