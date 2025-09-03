import { Link } from 'react-router-dom';
import '../../../../styles/SubMenu.css'

const SubMenu = () => {
  return (
    <ul className="submenu">
      <Link className="linkCustom" to="/">SECRETOS PUBLICADOS</Link>
      <Link className="linkCustom" to="/publish">PUBLICAR SECRETO</Link>
      <Link className="linkCustom" to="/login">MODERAR SECRETOS</Link>
    </ul>
  );
}

export default SubMenu;