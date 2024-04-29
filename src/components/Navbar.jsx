import { Link } from 'react-router-dom';
import { frontendURIs } from '../config/routes';

const Navbar = () => {
  return (
    <nav className="bg-red-900">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to={frontendURIs.home} className='flex items-center justify-center'>
              <img
                className="flex lg:hidden h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                alt="theme"
              />
              <img
                className="hidden lg:block h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                alt="theme"
              />
              <span className='font-bold text-xl lg:text-3xl text-white'>
                The Opeyemi&apos;s Affairs
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
