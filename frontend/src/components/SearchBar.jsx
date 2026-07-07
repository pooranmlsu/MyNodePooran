import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className="search-bar-wrapper">
      <form onSubmit={handleSubmit} className="search-bar">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="🔍 Search news by title, author, or tags..."
          className="search-input"
        />
        <button type="submit" className="search-btn">Search</button>
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="clear-btn"
          >
            ×
          </button>
        )}
      </form>
    </div>
  );
};

export default SearchBar;