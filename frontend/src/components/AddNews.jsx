import React, { useState } from 'react';
import './AddNews.css';

const AddNews = ({ onAddNews }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    category: 'Other',
    tags: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const categories = [
    'Technology',
    'Business',
    'Health',
    'Science',
    'Sports',
    'Entertainment',
    'Politics',
    'Other',
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    // Prepare data
    const newsData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
    };

    const result = await onAddNews(newsData);

    if (result.success) {
      setMessage({ type: 'success', text: 'News added successfully!' });
      setFormData({
        title: '',
        content: '',
        author: '',
        category: 'Other',
        tags: '',
      });
    } else {
      setMessage({ type: 'error', text: result.error });
    }

    setLoading(false);
  };

  return (
    <div className="add-news">
      <h2>📝 Add News</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            maxLength="200"
            placeholder="Enter news title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Content *</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows="5"
            placeholder="Write your news content here..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">Author *</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
            placeholder="Enter author name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="tags">Tags (comma separated)</label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="e.g., tech, innovation, AI"
          />
        </div>

        {message && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Adding...' : 'Add News'}
        </button>
      </form>
    </div>
  );
};

export default AddNews;