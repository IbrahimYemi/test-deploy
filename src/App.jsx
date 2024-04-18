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
import AdminPage from './pages/Admin';
import RegisterPage from './pages/Register';


function App() {

  return (
    <div className='min-h-screen bg-white max-w-screen-2xl mx-auto font-mono overflow-x-hidden'>
      <ErrorBoundary>
        <BrowserRouter>
          <Navbar />
          <div className='relative'>
            <img src="/wine-flower.jpg" alt="peach flower" className='absolute inset-0 w-full h-full object-cover opacity-10 z-0' />
            <div className='min-h-screen relative z-10 p-4 bg-gray-300 bg-opacity-10'>
              <Routes>
                {/* public routes */}
                <Route path={frontendURIs.home} element={<StartupAnimation />} />
                <Route path={frontendURIs.gallery} element={<ImageHandler />} />

                {/* auth route */}
                <Route element={<LoginRoutes />}>
                  <Route path={frontendURIs.login} element={<LoginPage />} />
                  <Route path={frontendURIs.register} element={<RegisterPage />} />
                </Route>

                {/*  auth protected routes */}
                <Route element={<ProtectedRoutes />}>
                  <Route path={frontendURIs.admin} element={<AdminPage />} />
                </Route>
                <Route path={frontendURIs.notFound} element={<NotFoundPage />} />
              </Routes>
            </div>
          </div>

        </BrowserRouter>
        <Footer />
      </ErrorBoundary>
    </div >
  )
}

export default App
