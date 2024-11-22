import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signUpWithEmail, signUpWithGoogle  } from '../../Redux/actions/authActions';
import { signInWithPopup } from 'firebase/auth';  
import { auth, provider } from '../../../firebaseConfig';  

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signUpWithEmail({ name, email, password }, navigate));
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      dispatch(signUpWithGoogle(navigate));
    } catch (error) {
      console.error("Google sign-in error: ", error);
    }
  };

  return (
    <div className="relative bg-base1">
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-cover bg-center opacity-50" style={{ backgroundImage: 'url(/Images/MyNotes.jpg)' }}></div>
      <div className="relative z-10 flex justify-center items-center p-4">
        <div className="w-full max-w-lg bg-white bg-opacity-80 p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-center text-primary mb-6">Create Your Account</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-base text-textPrimary mb-2">Full Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-3 border border-base3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition duration-300"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-base text-textPrimary mb-2">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 border border-base3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition duration-300"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-base text-textPrimary mb-2">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 border border-base3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition duration-300"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-primary text-white text-lg rounded-md hover:bg-base4 transition duration-300"
            >
              Sign Up
            </button>
            <div className="flex items-center justify-center space-x-2 mt-4 border-border border-2">
              <button
                onClick={handleGoogleSignIn}
                className="flex items-center justify-center py-2 px-4 w-full border border-base3 rounded-md bg-white hover:bg-base4 transition duration-300"
              >
                <FaGoogle className="w-5 h-5 mx-4" />
                <span>Sign Up with Google</span>
              </button>
            </div>
            <div className="text-center mt-4">
              <p className="text-base text-textPrimary">
                Already have an account? <Link to="/login" className="text-primary hover:underline">Login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
