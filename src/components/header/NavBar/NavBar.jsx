import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../../../styles/NavBar.css';
import SubMenu from './SubMenu/SubMenu'

function NavBar() {
  const navigate = useNavigate();
  const userSession = Cookies.get('userSession');
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const handleLogout = () => {
    Cookies.remove('userSession');
    navigate('/');
  };

  const toggleSubmenu = () => {
    setSubmenuOpen(!submenuOpen);
  };

  return (
    <nav className='navbar'>
      <ul>
        <Link className="linkCustom linkMobile" to="/">SECRETOS PUBLICADOS</Link>
        <Link className="linkCustom linkMobile" to="/publish">PUBLICAR SECRETO</Link>
        <Link to="/sub" onClick={toggleSubmenu} className={`linkCustom ${submenuOpen ? 'active' : ''} linkDesktop`}>MENÚ{submenuOpen}&nbsp;{submenuOpen ? '▲' : '▼'}</Link>
        {!userSession ? (
          <Link className="linkCustom linkMobile" to="/login">MODERAR SECRETOS</Link>
        ) : (
          <>
            <Link className="linkCustom linkMobile" to="/moderate">MODERAR SECRETOS</Link>
            <Link className="linkCustom" to="/profile">MI PERFIL</Link>
            <button className="logoutBtn" onClick={handleLogout}>
              CERRAR SESIÓN
            </button>
          </>
        )}
      </ul>
      {submenuOpen && <SubMenu />}
    </nav>
  );
}

export default NavBar;
