import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-base1 p-8 md:p-16 text-center">
        <h1 className="text-3xl font-extrabold mb-4">Welcome to NoteSpace</h1>
        <p className="text-lg mb-6">Your go-to platform for organizing and managing your notes efficiently.</p>
        <Link to="/signup">
          <button className="bg-primary text-white py-2 px-6 rounded-full text-lg hover:bg-base4 transition duration-300">
            Get Started
          </button>
        </Link>
      </section>

      {/* Features Section */}
      <section className="bg-base2 text-textPrimary p-8 md:p-16 text-center">
        <h2 className="text-2xl font-semibold mb-6">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 bg-base3 rounded-lg shadow-md border border-base4">
            <h3 className="text-xl font-semibold mb-4">Cloud Sync</h3>
            <p className="text-base">
              Keep your notes synced across devices. Access them anywhere, anytime.
            </p>
          </div>
          <div className="p-6 bg-base3 rounded-lg shadow-md border border-base4">
            <h3 className="text-xl font-semibold mb-4">Dark Mode</h3>
            <p className="text-base">
              Switch between light and dark modes to suit your preference.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action (CTA) Section */}
      <section className="bg-primary text-white text-center p-8 md:p-16">
        <h2 className="text-2xl font-semibold mb-4">Ready to take control of your notes?</h2>
        <Link to="/signup">
          <button className="bg-white text-primary py-2 px-6 rounded-full text-lg hover:bg-base4 transition duration-300">
            Sign Up Now
          </button>
        </Link>
      </section>
    </div>
  );
};

export default Home;
