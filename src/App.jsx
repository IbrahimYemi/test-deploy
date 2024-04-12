import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login';
import LoginRoutes from './routing/LoginRoutes'
import ProtectedRoutes from './routing/ProtectedRoutes'
import ErrorBoundary from './components/ErrorBoundary';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { frontendURIs } from './config/routes';
import ImageHandler from './components/ImageHandler';
import NotFoundPage from './components/404';
import StartupAnimation from './components/StartupAnimation';


function App() {

  return (
    <div className='min-h-screen bg-white max-w-screen-2xl mx-auto'>
      <ErrorBoundary>
        <BrowserRouter>
          <Navbar />
          <StartupAnimation />
        </BrowserRouter>
        <Footer />
      </ErrorBoundary>
    </div >
  )
}

export default App
