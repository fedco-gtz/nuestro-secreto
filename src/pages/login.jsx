import { useState } from 'react';
import { loginUser, loginWithGoogle } from '../services/firebaseActions.js';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import '../styles/Publish.css'
import '../styles/Login.css'

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const user = await loginUser(email, password);

            Cookies.set('userSession', JSON.stringify({
                email: user.email,
                uid: user.uid,
                loginAt: new Date().toISOString()
            }), { expires: 1 });

            navigate('/moderate');
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const user = await loginWithGoogle();

            Cookies.set('userSession', JSON.stringify({
                email: user.email,
                uid: user.uid,
                loginAt: new Date().toISOString()
            }), { expires: 1 });

            navigate('/moderate');
        } catch (error) {
            console.error('Error con Google Login:', error);
        }
    };

    return (
        <form onSubmit={handleLogin} className="loginForm publish-container">
            <div>
                <label>Email:</label>
                <input className="data"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Contraseña:</label>
                <input className="data"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit" disabled={loading}>
                {loading ? 'Ingresando...' : 'Iniciar Sesión'}
            </button>

            <hr style={{ margin: "1rem 0" }} />

            <button type="button" onClick={handleGoogleLogin} className="googleBtn">
                Iniciar sesión con Google
            </button>
        </form>
    );
};

export default LoginForm;
