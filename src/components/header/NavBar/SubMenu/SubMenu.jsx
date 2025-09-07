import { Link } from 'react-router-dom';
import '../../../../styles/SubMenu.css'

const SubMenu = ({ user }) => {
  return (
    <ul className="submenu">
      <Link className="linkCustom" to="/">PUBLICADOS</Link>
      <Link className="linkCustom" to="/publish">PUBLICAR</Link>
      
      {!user ? (
        <Link className="linkCustom" to="/login">MODERAR</Link>
      ) : (
        <Link className="linkCustom" to="/moderate">MODERAR</Link>
      )}
    </ul>
  );
}

export default SubMenu;
