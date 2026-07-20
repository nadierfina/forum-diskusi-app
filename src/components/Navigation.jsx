import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/navigation.css';

function Navigation({ authUser, logout }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1><Link to="/">Forum Diskusi</Link></h1>
      </div>

      <div className="navbar-menu">
        <Link to="/">Beranda</Link>
        <Link to="/leaderboards">Klasemen</Link>
      </div>

      <div className="navbar-user">
        <img src={authUser.avatar} alt={authUser.name} title={authUser.name} />
        <button type="button" onClick={logout} className="btn-logout">
          Keluar
        </button>
      </div>
    </nav>
  );
}

Navigation.propTypes = {
  authUser: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired
  }).isRequired,
  logout: PropTypes.func.isRequired
};

export default Navigation;