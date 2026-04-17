import React, { useState, useEffect } from 'react';
import './NewsEvents.css';
import { newsEventsHelper } from '../../data/newsEventsData';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaUser, FaNewspaper, FaCalendarDay } from 'react-icons/fa';

function renderNewsParagraphs(item, className) {
  const body = item.content;
  if (Array.isArray(body)) {
    return body.map((para, i) => (
      <p key={i} className={className}>
        {para}
      </p>
    ));
  }
  return <p className={className}>{body}</p>;
}

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

  /** Featured items only appear in the hero strip, not again in the grid */
  const getNewsForGrid = () => {
    const featuredIds = new Set(newsEventsHelper.getFeaturedNews().map((n) => n.id));
    return getFilteredNews().filter((item) => !featuredIds.has(item.id));
  };

  const getUpcomingEvents = () => newsEventsHelper.getUpcomingEvents();

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getCategoryIcon = (category) => {
    const icons = {
      Research: '🔬',
      Team: '👥',
      Publications: '📚',
      Collaboration: '🤝',
      Projects: '🛠️',
      Events: '🎉',
      Recognition: '🏆'
    };
    return icons[category] || '📰';
  };

  const getEventTypeIcon = (type) => {
    const icons = {
      Workshop: '🛠️',
      Seminar: '🎓',
      Meeting: '🤝',
      'Open House': '🏠',
      Symposium: '📋',
      Roundtable: '🗣️'
    };
    return icons[type] || '📅';
  };

  const imageShellClass = (item, base) => {
    if (item.imageLayout === 'contain-dark') {
      return `${base} image-contain-dark`;
    }
    return base;
  };

  const categories = [...new Set(news.map((item) => item.category))];

  return (
    <div className="news-events-page news-events-page--live">
      <div className="page-header">
        <h1 className="page-title">News & Events</h1>
        <p className="page-subtitle">
          Stay updated with the latest research developments, team news, and upcoming events
        </p>
      </div>

      <div className="tab-navigation">
        <button
          type="button"
          className={`tab-button ${activeTab === 'news' ? 'active' : ''}`}
          onClick={() => setActiveTab('news')}
        >
          <FaNewspaper className="tab-icon" />
          News
        </button>
        <button
          type="button"
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
              type="button"
              className={`category-btn ${selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('all')}
            >
              All Categories
            </button>
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {getCategoryIcon(category)} {category}
              </button>
            ))}
          </div>

          <div className="featured-news">
            {newsEventsHelper.getFeaturedNews().map((item) => (
              <article key={item.id} className="featured-news-card featured-news-card--highlight">
                <div className={imageShellClass(item, 'featured-news-image')}>
                  <img src={item.image} alt={item.imageAlt || item.title} />
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
                  {item.subtitle && <p className="featured-news-subtitle">{item.subtitle}</p>}
                  <div className="featured-news-body">
                    {renderNewsParagraphs(item, 'featured-news-excerpt')}
                  </div>
                  {item.externalLink && (
                    <a
                      href={item.externalLink.url}
                      className="news-external-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.externalLink.label}
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>

          {getNewsForGrid().length > 0 && (
            <div className="all-news">
              <h3 className="section-title">All News</h3>
              <div className="news-grid">
                {getNewsForGrid().map((item) => (
                  <div key={item.id} className="news-card">
                    <div className={imageShellClass(item, 'news-image')}>
                      <img src={item.image} alt={item.imageAlt || item.title} />
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
                      <div className="news-excerpt-wrap">{renderNewsParagraphs(item, 'news-excerpt')}</div>
                      <div className="news-author">
                        <FaUser className="meta-icon" />
                        {item.author}
                      </div>
                      {item.externalLink && (
                        <a
                          href={item.externalLink.url}
                          className="news-external-link news-external-link--inline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.externalLink.label}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'events' && (
        <div className="events-section">
          <div className="featured-events">
            <h3 className="section-title">Featured Events</h3>
            <div className="featured-events-grid">
              {newsEventsHelper.getFeaturedEvents().map((event) => (
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
            {getUpcomingEvents().length === 0 ? (
              <p className="events-empty">No upcoming events right now. Check back soon.</p>
            ) : (
              <div className="events-list">
                {getUpcomingEvents().map((event) => (
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
            )}
          </div>
        </div>
      )}
    </div>
  );
}
