import { Link } from 'react-router-dom';
import '../../../../styles/SubMenu.css'

const SubMenu = () => {
  return (
    <ul className="submenu">
      <Link className="linkCustomB" to="/">SECRETOS PUBLICADOS</Link>
      <Link className="linkCustomA" to="/publish">PUBLICAR SECRETO</Link>
      <Link className="linkCustomA" to="/login">MODERAR SECRETOS</Link>
    </ul>
  );
}

export default SubMenu;