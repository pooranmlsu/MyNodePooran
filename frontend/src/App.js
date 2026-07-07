import React, { useState, useEffect } from 'react';
import './App.css';
import NewsList from './components/NewsList';
import AddNews from './components/AddNews';
import SearchBar from './components/SearchBar';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/news';

function App() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch all news
  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setNews(response.data.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch news. Please try again.');
      console.error('Error fetching news:', err);
    } finally {
      setLoading(false);
    }
  };

  // Search news
  const searchNews = async (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      fetchNews();
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/search?q=${query}`);
      setNews(response.data.data);
      setError(null);
    } catch (err) {
      setError('Failed to search news. Please try again.');
      console.error('Error searching news:', err);
    } finally {
      setLoading(false);
    }
  };

  // Add new news
  const addNews = async (newsData) => {
    try {
      const response = await axios.post(API_URL, newsData);
      setNews([response.data.data, ...news]);
      return { success: true };
    } catch (err) {
      console.error('Error adding news:', err);
      return { 
        success: false, 
        error: err.response?.data?.message || 'Failed to add news' 
      };
    }
  };

  // Delete news
  const deleteNews = async (id) => {
    if (!window.confirm('Are you sure you want to delete this news?')) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      setNews(news.filter(item => item._id !== id));
    } catch (err) {
      console.error('Error deleting news:', err);
      alert('Failed to delete news. Please try again.');
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="App">
      <header className="app-header">
        <div className="container">
          <h1>📰 Mini News Platform</h1>
          <p>Share and discover news from around the world</p>
        </div>
      </header>

      <main className="container">
        <div className="app-grid">
          <div className="left-column">
            <AddNews onAddNews={addNews} />
          </div>
          <div className="right-column">
            <SearchBar onSearch={searchNews} />
            {error && <div className="error-message">{error}</div>}
            <NewsList 
              news={news} 
              loading={loading} 
              onDelete={deleteNews}
              searchQuery={searchQuery}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;