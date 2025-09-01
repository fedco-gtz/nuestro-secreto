import '../../styles/Header.css'
import logo from '../../images/logoHeader.png';
import NavBar from './NavBar/NavBar';

function Header() {
    return (
        <header>
            <NavBar />
            <section className='header'>
            <img className='logo' src={logo} alt="Logo MTM" />
            </section>
        </header>
    );
}

export default Header;