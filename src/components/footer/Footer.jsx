import '../../styles/Footer.css'
import logo from '../../images/logoFooter.png';
import instagram from '../../images/Instagram.png';
import github from '../../images/Github.png';
import { Link } from "react-router-dom";

function Footer() {
    return (
        <>
            <footer className='footer'>
                <section className='footerSection'>
                    <img className='logo' src={logo} alt="Logo El Secreto" width="40%" height="40%" />
                </section>

                <section className='socialNetwork'>
                    <a href="https://github.com/fedco-gtz" target="_blank"><img className='socialIcon' alt='Github' src={github} /></a>&nbsp;&nbsp;&nbsp;
                    <a href="https://www.instagram.com/grrz.fede/" target="_blank"><img className='socialIcon' alt='Instagram' src={instagram} /></a>
                </section>

                <section className='footerSection'>
                    <p><i></i>Contacto: <a href="mailto:gutierrezfedericog@gmail.com">info@nuestro-secreto.com</a></p>
                    <Link to="/tyc"> Términos y Condiciones </Link>
                </section>
            </footer>
            <section className='footerSectionCopy'>
                <p className='copy'>&copy; copyright 2025 - Federico G. Gutierrez</p>
            </section>
        </>
    );
}

export default Footer;

