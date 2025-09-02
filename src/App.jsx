import { BrowserRouter } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// COMPONENTES
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

// PÁGINAS
import Published from './pages/published';
import Publish from './pages/publish';
import Moderate from './pages/moderate';
import LoginForm from './pages/login';
import Tyc from './pages/tyc';
import NotFound from './pages/NotFound';

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Published />} />
        <Route path='/publish' element={<Publish />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/moderate' element={<Moderate />} />
        <Route path='/tyc' element={<Tyc />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;