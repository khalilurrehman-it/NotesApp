import { Link, useNavigate } from 'react-router-dom'; 
import { FaUserLarge } from "react-icons/fa6";
import { CiMenuFries } from "react-icons/ci"; 
import { IoClose } from "react-icons/io5"; 
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { PrimaryButton, OutlineButton } from './ReUseAbleComponents/Buttons'; 
import { logout } from '../Redux/actions/authActions'; 

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useSelector((state) => state.auth.user); 
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);
  };

  const handleLogout = () => {
    dispatch(logout()); 
    navigate('/login'); 
  };

  return (
    <header className="bg-background text-textPrimary dark:bg-gray-900 dark:text-white p-4 flex justify-between items-center shadow-md">
      
      <div className="flex items-center space-x-3">
        <Link to="/">
          <span className="font-bold text-2xl text-primary">NoteSpace</span>
        </Link>
      </div>

      <div className="hidden md:flex flex-grow justify-center space-x-8">
        <Link
          to="/"
          className="text-lg font-medium hover:text-primary transition duration-300"
        >
          Home
        </Link>
        <Link
          to="/notes"
          className="text-lg font-medium hover:text-primary transition duration-300"
        >
          Notes
        </Link>
        <Link
          to="/contact-us"
          className="text-lg font-medium hover:text-primary transition duration-300"
        >
          Contact Us
        </Link>
      </div>

      <div className="hidden md:flex items-center space-x-6">
  
        {user ? (
          <>
            <FaUserLarge size={24} className="rounded-full w-10 h-10 border-2 border-primary" />
            <button
              onClick={handleLogout}
              className="text-lg font-medium text-red-600 hover:text-red-500 transition duration-300  border-border border-2 rounded-md px-4 py-2"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              <PrimaryButton label="Login" />
            </Link>
            <Link to="/signup">
              <OutlineButton label="Signup" />
            </Link>
          </>
        )}
      </div>



      <div className="md:hidden flex items-center space-x-2">
        

        <button
          onClick={toggleMenu}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300"
        >
          {isMenuOpen ? (
            <IoClose size={24} className="text-primary" /> 
          ) : (
            <CiMenuFries size={24} className="text-primary" /> 
          )}
        </button>

      </div>


      {isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-background dark:bg-gray-900 text-textPrimary dark:text-white p-4 flex flex-col items-start space-y-4 md:hidden h-auto z-50">
          <Link
            to="/"
            className="text-lg font-medium hover:text-primary transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/notes"
            className="text-lg font-medium hover:text-primary transition duration-300"
          >
            Notes
          </Link>
          <Link
            to="/contact-us"
            className="text-lg font-medium hover:text-primary transition duration-300"
          >
            Contact Us
          </Link>

          {user ? (
            <>
              <FaUserLarge size={24} className="rounded-full w-10 h-10 border-2 border-primary" />
              <button
                onClick={handleLogout} 
                className="text-lg font-medium text-red-600 hover:text-red-500 transition duration-300 border-border border-2 rounded-md px-4 py-2"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <PrimaryButton label="Login" />
              </Link>
              <Link to="/signup">
                <OutlineButton label="Signup" />
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
