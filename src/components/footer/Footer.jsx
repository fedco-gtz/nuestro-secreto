import '../../styles/Footer.css'
import logo from '../../images/logoFooter.png';
import facebook from '../../images/Facebook.png';
import instagram from '../../images/Instagram.png';


function Footer() {
    return (
        <>
            <footer className='footer'>
                <section className='footerSection'>
                    <img className='logo' src={logo} alt="Logo El Secreto" width="40%" height="40%" />
                </section>

                <section className='socialNetwork'>
                    <a href="https://www.facebook.com/federico.g.gutierrez2" target="_blank"><img className='socialIcon' alt='Facebook' src={facebook} /></a>&nbsp;&nbsp;&nbsp;
                    <a href="https://www.instagram.com/grrz.fede/" target="_blank"><img className='socialIcon' alt='Instagram' src={instagram} /></a>
                </section>

                <section className='footerSection'>
                    <p><i></i>Contacto: <a href="mailto:gutierrezfedericog@gmail.com">info@nuestro-secreto.com</a></p>
                    <p><a href="/tyc.html" target="_blank" rel="noopener noreferrer">Términos y Condiciones</a></p>
                </section>
            </footer>
            <section className='footerSectionCopy'>
                <p className='copy'>&copy; copyright 2025 - Federico G. Gutierrez</p>
            </section>
        </>
    );
}

export default Footer;

