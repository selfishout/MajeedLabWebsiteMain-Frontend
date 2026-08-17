import React, { useState, useEffect } from 'react';
import './NewsEvents.css';
import { newsEventsHelper } from '../../data/newsEventsData';
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaUser,
  FaNewspaper,
  FaCalendarDay
} from 'react-icons/fa';

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

function getExternalLinks(item) {
  if (Array.isArray(item.externalLinks)) {
    return item.externalLinks;
  }
  return item.externalLink ? [item.externalLink] : [];
}

function renderNewsLinks(item, className = '') {
  const links = getExternalLinks(item);
  if (links.length === 0) {
    return null;
  }

  return (
    <div className="news-external-links">
      {links.map((link) => (
        <a
          key={link.url}
          href={link.url}
          className={`news-external-link ${className}`.trim()}
          target="_blank"
          rel="noopener noreferrer"
        >
          {link.label}
        </a>
      ))}
    </div>
  );
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

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(`${dateString}T00:00:00`).toLocaleDateString('en-US', options);
  };

  const getEventDateParts = (dateString) => {
    const eventDate = new Date(`${dateString}T00:00:00`);
    return {
      day: eventDate.toLocaleDateString('en-US', { day: '2-digit' }),
      month: eventDate.toLocaleDateString('en-US', { month: 'short' })
    };
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

  const imageShellClass = (item, base) => {
    if (item.imageLayout === 'contain-dark') {
      return `${base} image-contain-dark`;
    }
    if (item.imageLayout === 'contain') {
      return `${base} image-contain`;
    }
    return base;
  };

  const categories = [...new Set(news.map((item) => item.category))];
  const events = newsEventsHelper.getAllEvents();

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
                  {renderNewsLinks(item)}
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
                      {renderNewsLinks(item, 'news-external-link--inline')}
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
          {events.length > 0 ? (
            <div className="events-list">
              {events.map((event) => {
                const dateParts = getEventDateParts(event.date);

                return (
                  <article key={event.id} className="event-item">
                    <div className="event-date">
                      <span className="event-day">{dateParts.day}</span>
                      <span className="event-month">{dateParts.month}</span>
                    </div>
                    <div className="event-content">
                      <div className="event-meta">
                        <span>{event.type}</span>
                        <span>
                          <FaClock className="meta-icon" />
                          {event.time}
                        </span>
                      </div>
                      <h3 className="event-title">{event.title}</h3>
                      <p className="event-description">{event.description}</p>
                      <div className="event-details">
                        <span className="event-detail">
                          <FaMapMarkerAlt className="detail-icon" />
                          {event.location}
                        </span>
                      </div>
                      {event.registration_link && (
                        <a
                          href={event.registration_link}
                          className="register-link"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {event.registration_required ? 'Register' : 'View event details'}
                        </a>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <p className="events-empty">Upcoming events will be posted here. Check back soon.</p>
          )}
        </div>
      )}
    </div>
  );
}
