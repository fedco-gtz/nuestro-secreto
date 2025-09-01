import '../styles/Header.css'
import notFound from '../images/notFound.png';
import { Link } from 'react-router-dom';

function NotFound() {

    return (
        <>
            <img className='underConstruction' src={notFound} alt="Página no encontrada" />
            <ul>
                <li>
                    <Link className="notFoundContainer" to="/">VOLVER AL INICIO</Link>
                </li>
            </ul>
        </>
    )
}

export default NotFound