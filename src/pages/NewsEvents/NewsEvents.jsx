import React, { useState, useEffect } from 'react';
import './NewsEvents.css';
import { newsEventsHelper } from '../../data/newsEventsData';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaUser, FaNewspaper, FaCalendarDay } from 'react-icons/fa';

export default function NewsEvents() {
  const [news, setNews] = useState([]);
  const [activeTab, setActiveTab] = useState('news');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    setNews(newsEventsHelper.getAllNews());
  }, []);

  const getFilteredNews = () => {
    if (selectedCategory === 'all') {
      return news;
    }
    return newsEventsHelper.getNewsByCategory(selectedCategory);
  };

  const getUpcomingEvents = () => newsEventsHelper.getUpcomingEvents();

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Research': '🔬',
      'Team': '👥',
      'Publications': '📚',
      'Collaboration': '🤝',
      'Projects': '🛠️',
      'Events': '🎉',
      'Recognition': '🏆'
    };
    return icons[category] || '📰';
  };

  const getEventTypeIcon = (type) => {
    const icons = {
      'Workshop': '🛠️',
      'Seminar': '🎓',
      'Meeting': '🤝',
      'Open House': '🏠',
      'Symposium': '📋',
      'Roundtable': '🗣️'
    };
    return icons[type] || '📅';
  };

  const categories = [...new Set(news.map(item => item.category))];

  return (
    <div className="news-events-page">
      <div className="coming-soon-container">
        <div className="coming-soon-content">
          <div className="coming-soon-icon">📰</div>
          <h1 className="coming-soon-title">Coming Soon...</h1>
          <p className="coming-soon-message">
            We're working on bringing you the latest news and events from our lab. 
            Check back soon for updates!
          </p>
        </div>
      </div>

      {/* All sections commented out */}
      {/* <div className="page-header">
        <h1 className="page-title">News & Events</h1>
        <p className="page-subtitle">
          Stay updated with the latest research developments, team news, and upcoming events
        </p>
      </div>

      <div className="tab-navigation">
        <button
          className={`tab-button ${activeTab === 'news' ? 'active' : ''}`}
          onClick={() => setActiveTab('news')}
        >
          <FaNewspaper className="tab-icon" />
          News
        </button>
        <button
          className={`tab-button ${activeTab === 'events' ? 'active' : ''}`}
          onClick={() => setActiveTab('events')}
        >
          <FaCalendarDay className="tab-icon" />
          Events
        </button>
      </div>

      {activeTab === 'news' && (
        <div className="news-section">
          <div className="category-filter">
            <button
              className={`category-btn ${selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('all')}
            >
              All Categories
            </button>
            {categories.map(category => (
              <button
                key={category}
                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {getCategoryIcon(category)} {category}
              </button>
            ))}
          </div>

          <div className="featured-news">
            {newsEventsHelper.getFeaturedNews().map(item => (
              <div key={item.id} className="featured-news-card">
                <div className="featured-news-image">
                  <img src={item.image} alt={item.title} />
                  <div className="featured-badge">Featured</div>
                </div>
                <div className="featured-news-content">
                  <div className="news-meta">
                    <span className="news-category">
                      {getCategoryIcon(item.category)} {item.category}
                    </span>
                    <span className="news-date">
                      <FaCalendarAlt className="meta-icon" />
                      {formatDate(item.date)}
                    </span>
                    <span className="news-author">
                      <FaUser className="meta-icon" />
                      {item.author}
                    </span>
                  </div>
                  <h2 className="featured-news-title">{item.title}</h2>
                  <p className="featured-news-excerpt">{item.content}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="all-news">
            <h3 className="section-title">All News</h3>
            <div className="news-grid">
              {getFilteredNews().map(item => (
                <div key={item.id} className="news-card">
                  <div className="news-image">
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className="news-content">
                    <div className="news-meta">
                      <span className="news-category">
                        {getCategoryIcon(item.category)} {item.category}
                      </span>
                      <span className="news-date">
                        <FaCalendarAlt className="meta-icon" />
                        {formatDate(item.date)}
                      </span>
                    </div>
                    <h4 className="news-title">{item.title}</h4>
                    <p className="news-excerpt">{item.content}</p>
                    <div className="news-author">
                      <FaUser className="meta-icon" />
                      {item.author}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'events' && (
        <div className="events-section">
          <div className="featured-events">
            <h3 className="section-title">Featured Events</h3>
            <div className="featured-events-grid">
              {newsEventsHelper.getFeaturedEvents().map(event => (
                <div key={event.id} className="featured-event-card">
                  <div className="event-image">
                    <img src={event.image} alt={event.title} />
                    <div className="featured-badge">Featured</div>
                  </div>
                  <div className="event-content">
                    <div className="event-meta">
                      <span className="event-type">
                        {getEventTypeIcon(event.type)} {event.type}
                      </span>
                      <span className="event-date">
                        <FaCalendarAlt className="meta-icon" />
                        {formatDate(event.date)}
                      </span>
                    </div>
                    <h3 className="event-title">{event.title}</h3>
                    <p className="event-description">{event.description}</p>
                    <div className="event-details">
                      <div className="event-detail">
                        <FaClock className="detail-icon" />
                        {event.time}
                      </div>
                      <div className="event-detail">
                        <FaMapMarkerAlt className="detail-icon" />
                        {event.location}
                      </div>
                    </div>
                    {event.registration_required && (
                      <a href={event.registration_link} className="register-btn">
                        Register Now
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="upcoming-events">
            <h3 className="section-title">Upcoming Events</h3>
            <div className="events-list">
              {getUpcomingEvents().map(event => (
                <div key={event.id} className="event-item">
                  <div className="event-date">
                    <div className="event-day">{new Date(event.date).getDate()}</div>
                    <div className="event-month">
                      {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                    </div>
                  </div>
                  <div className="event-info">
                    <div className="event-meta">
                      <span className="event-type">
                        {getEventTypeIcon(event.type)} {event.type}
                      </span>
                      <span className="event-time">
                        <FaClock className="meta-icon" />
                        {event.time}
                      </span>
                    </div>
                    <h4 className="event-title">{event.title}</h4>
                    <p className="event-description">{event.description}</p>
                    <div className="event-location">
                      <FaMapMarkerAlt className="meta-icon" />
                      {event.location}
                    </div>
                    {event.registration_required && (
                      <a href={event.registration_link} className="register-link">
                        Register Now
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}
