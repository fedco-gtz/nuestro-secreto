import { Link } from 'react-router-dom';
import '../../../styles/NavBar.css';

function NavBar() {
  return (
    <nav className='navbar'>
      <ul>
        <Link className="linkCustom" to="/">SECRETOS PUBLICADOS</Link>
        <Link className="linkCustom" to="/publish">PUBLICAR SECRETO</Link>
        <Link className="linkCustom" to="/moderate">MODERAR SECRETOS</Link>
      </ul>
    </nav>
  );
}

export default NavBar;
