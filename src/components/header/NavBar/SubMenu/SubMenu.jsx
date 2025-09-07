import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Cookies from 'js-cookie';
import '../../../../styles/SubMenu.css'

const SubMenu = () => {
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
    <ul className="submenu">
      <Link className="linkCustom" to="/">PUBLICADOS</Link>
      <Link className="linkCustom" to="/publish">PUBLICAR</Link>
      <Link className="linkCustom" to={userSession ? "/moderate" : "/login"}>
        MODERAR
      </Link>
    </ul>
  );
}

export default SubMenu;

