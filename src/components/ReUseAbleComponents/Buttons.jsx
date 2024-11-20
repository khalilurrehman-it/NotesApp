import React from 'react';

// Primary Button Component
export const PrimaryButton = ({ label, className }) => {
  return (
    <button
      className={`bg-primary text-white py-2 px-4 rounded-lg hover:bg-buttonHover transition duration-300 ${className}`}
    >
      {label}
    </button>
  );
};

// Secondary Button Component
export const SecondaryButton = ({ label, className }) => {
  return (
    <button
      className={`bg-secondary text-white py-2 px-4 rounded-lg hover:bg-buttonHover transition duration-300 ${className}`}
    >
      {label}
    </button>
  );
};

// Outline Button Component
export const OutlineButton = ({ label, className }) => {
  return (
    <button
      className={`border border-primary text-primary py-2 px-4 rounded-lg hover:bg-primary hover:text-white transition duration-300 ${className}`}
    >
      {label}
    </button>
  );
};
