import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../../../styles/NavBar.css';

function NavBar() {
  const navigate = useNavigate();
  const userSession = Cookies.get('userSession');

  const handleLogout = () => {
    Cookies.remove('userSession');
    navigate('/');
  };

  return (
    <nav className='navbar'>
      <ul>
        <Link className="linkCustom" to="/">SECRETOS PUBLICADOS</Link>
        <Link className="linkCustom" to="/publish">PUBLICAR SECRETO</Link>
        {!userSession ? (
          <Link className="linkCustom" to="/login">MODERAR SECRETOS</Link>
        ) : (
          <>
            <Link className="linkCustom" to="/profile">MI PERFIL</Link>
            <button className="linkCustom logoutBtn" onClick={handleLogout}>
              CERRAR SESIÓN
            </button>
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
