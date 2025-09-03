import React from 'react';
import { Link } from 'react-router-dom';

const SubMenu = () => {
  return (
    <ul className="submenu">
      <Link className="linkCustomB" to="/">SECRETOS PUBLICADOS</Link>
      <Link className="linkCustomA" to="/publish">PUBLICAR SECRETO</Link>
    </ul>
  );
}

export default SubMenu;