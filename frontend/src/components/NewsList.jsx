import React from 'react';
import './NewsList.css';

const NewsList = ({ news, loading, onDelete, searchQuery }) => {
  if (loading) {
    return <div className="loading-spinner">Loading news...</div>;
  }

  if (news.length === 0) {
    return (
      <div className="news-list">
        <div className="empty-state">
          <p>📭 No news articles found</p>
          {searchQuery && <p>Try a different search term</p>}
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="news-list">
      {searchQuery && (
        <div className="search-info">
          Showing results for: <strong>"{searchQuery}"</strong>
          <span className="result-count">({news.length} found)</span>
        </div>
      )}
      
      {news.map((item) => (
        <div key={item._id} className="news-card">
          <div className="news-header">
            <h3 className="news-title">{item.title}</h3>
            <button
              onClick={() => onDelete(item._id)}
              className="delete-btn"
              aria-label="Delete news"
            >
              ×
            </button>
          </div>
          
          <div className="news-meta">
            <span className="news-author">✍️ {item.author}</span>
            <span className="news-category">🏷️ {item.category}</span>
            <span className="news-date">{formatDate(item.publishedDate)}</span>
          </div>
          
          <p className="news-content">{item.content}</p>
          
          {item.tags && item.tags.length > 0 && (
            <div className="news-tags">
              {item.tags.map((tag, index) => (
                <span key={index} className="tag">#{tag}</span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default NewsList;