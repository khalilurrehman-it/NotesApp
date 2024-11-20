import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirect
import { FaMoon, FaSun } from 'react-icons/fa'; // React Icons for Dark/Light mode
import { FaUserLarge } from "react-icons/fa6";
import { CiMenuFries } from "react-icons/ci"; // Menu icon
import { IoClose } from "react-icons/io5"; // Close icon
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch for logout action
import { PrimaryButton, OutlineButton } from './ReUseAbleComponents/Buttons'; // Import reusable buttons
import { logout } from '../Redux/actions/authActions'; // Assuming you have a logout action

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false); // Light mode by default
  const [isMenuOpen, setIsMenuOpen] = useState(false); // To track menu open/close
  const user = useSelector((state) => state.auth.user); // Access user data from Redux
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook for redirection

  // Function to toggle Dark/Light mode
  const toggleDarkMode = () => {
    setIsDarkMode(prevState => !prevState);
    // You can also use localStorage or context to persist the theme
  };

  // Function to toggle the menu
  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);
  };

  // Function to handle logout
  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
    navigate('/login'); // Redirect to login page
  };

  return (
    <header className="bg-background text-textPrimary dark:bg-gray-900 dark:text-white p-4 flex justify-between items-center shadow-md">
      {/* Left side: NoteSpace */}
      <div className="flex items-center space-x-3">
        <Link to="/">
          <span className="font-bold text-2xl text-primary">NoteSpace</span>
        </Link>
      </div>

      {/* Center: Navigation Links (hidden on mobile) */}
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

      {/* Right side: Dark/Light Mode Toggle, Avatar, and Logout */}
      <div className="hidden md:flex items-center space-x-6">
        {/* Dark/Light Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full hover:bg-gray-400 dark:hover:bg-gray-600 transition duration-300"
        >
          {isDarkMode ? (
            <FaSun size={24} className="text-yellow-500" />
          ) : (
            <FaMoon size={24} className="text-gray-700" />
          )}
        </button>

        {/* Avatar and Logout (only when logged in) */}
        {user ? (
          <>
            <FaUserLarge size={24} className="rounded-full w-10 h-10 border-2 border-primary" />
            <button
              onClick={handleLogout} // Call the logout function
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

      {/* Mobile Menu Button (Hamburger for mobile screens) */}
      <div className="md:hidden flex items-center space-x-2">
        
        {/* Light/Dark Mode Icon on Mobile */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300"
        >
          {isDarkMode ? (
            <FaSun size={24} className="text-yellow-500" />
          ) : (
            <FaMoon size={24} className="text-gray-700" />
          )}
        </button>

        <button
          onClick={toggleMenu}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300"
        >
          {isMenuOpen ? (
            <IoClose size={24} className="text-primary" /> // Close icon when menu is open
          ) : (
            <CiMenuFries size={24} className="text-primary" /> // Menu icon when menu is closed
          )}
        </button>

      </div>

      {/* Mobile Menu (displayed when menu is open) */}
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

          {/* Avatar and Logout (Mobile) */}
          {user ? (
            <>
              <FaUserLarge size={24} className="rounded-full w-10 h-10 border-2 border-primary" />
              <button
                onClick={handleLogout} // Call the logout function
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
