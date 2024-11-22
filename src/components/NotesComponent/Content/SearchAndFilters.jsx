
import React, { useState, useEffect } from 'react';
import { IoAddCircle } from 'react-icons/io5';

const SearchAndFilters = ({ onSearch, onSort, onAdd }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('title'); 
  const [sortType, setSortType] = useState('dateModified'); 

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchQuery, searchType);
    }); 

    return () => clearTimeout(timer);
  }, [searchQuery, searchType, onSearch]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
  };

  const handleSortChange = (event) => {
    const selectedSortType = event.target.value;
    setSortType(selectedSortType);
    onSort(selectedSortType);
  };

  return (
    <div className="my-6 px-6 py-8 space-y-6 sm:space-y-0 flex flex-col sm:flex-row items-center justify-center gap-8 w-full rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
      {/* Search Input */}
      <div className="w-full sm:w-1/3">
        <input
          type="text"
          placeholder="Search notes..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 ease-in-out"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      {/* Search Type Dropdown */}
      <div className="w-full sm:w-1/4">
        <select
          value={searchType}
          onChange={handleSearchTypeChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 ease-in-out"
        >
          <option value="title">Search by Title</option>
          <option value="content">Search by Content</option>
        </select>
      </div>

      {/* Sort Type Dropdown */}
      <div className="w-full sm:w-1/4">
        <select
          value={sortType}
          onChange={handleSortChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 ease-in-out"
        >
          <option value="dateModified">Sort by Date Modified</option>
          <option value="alphabet">Sort by Alphabet</option>
          <option value="dateCreated">Sort by Date Created</option>
        </select>
      </div>

      {/* Add Note Button */}
      <div className="relative sm:w-1/5">
        <button
          onClick={onAdd}
          className="flex items-center justify-center bg-blue-500 hover:bg-blue-700 p-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out w-full"
        >
          <IoAddCircle className="text-3xl mr-2" />
          <span className="text-lg font-semibold">Add Note</span>
        </button>
      </div>
    </div>
  );
};

export default SearchAndFilters;
