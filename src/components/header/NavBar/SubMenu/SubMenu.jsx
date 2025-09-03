import { Link } from 'react-router-dom';
import '../../../../styles/SubMenu.css'

const SubMenu = () => {
  return (
    <ul className="submenu">
      <Link className="linkCustom" to="/">PUBLICADOS</Link>
      <Link className="linkCustom" to="/publish">PUBLICAR</Link>
      <Link className="linkCustom" to="/login">MODERAR</Link>
    </ul>
  );
}

export default SubMenu;