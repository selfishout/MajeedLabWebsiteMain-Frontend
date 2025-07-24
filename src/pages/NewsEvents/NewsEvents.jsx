import React, { useEffect, useState } from 'react';
import { fetchNews, fetchEvents } from '../../services/api';
import './NewsEvents.css';

export default function NewsEvents() {
  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchNews().then(res => setNews(res.data || []));
    fetchEvents().then(res => setEvents(res.data || []));
  }, []);

  return (
    <div className="news-events-public-container">
      <h1 className="news-events-title">News & Events</h1>
      <div className="news-events-columns">
        <div className="news-list-col">
          <h2 className="section-header">Latest News</h2>
          {news.length === 0 && <div className="empty-msg">No news available.</div>}
          {news.map((item, i) => (
            <div className="news-card fade-in" key={item.id} style={{ animationDelay: `${i * 0.1}s` }}>
              {item.image && <img src={item.image} alt={item.title} className="news-card-img" />}
              <div className="news-card-content">
                <div className="news-card-date">{item.date}</div>
                <div className="news-card-title">{item.title}</div>
                <div className="news-card-desc">{item.description}</div>
                {item.link && <a href={item.link} target="_blank" rel="noopener noreferrer" className="news-card-link">Read more</a>}
              </div>
            </div>
          ))}
        </div>
        <div className="events-list-col">
          <h2 className="section-header">Upcoming Events</h2>
          {events.length === 0 && <div className="empty-msg">No events available.</div>}
          {events.map((item, i) => (
            <div className="event-card fade-in" key={item.id} style={{ animationDelay: `${i * 0.1}s` }}>
              {item.image && <img src={item.image} alt={item.title} className="event-card-img" />}
              <div className="event-card-content">
                <div className="event-card-date">{item.date}</div>
                <div className="event-card-title">{item.title}</div>
                <div className="event-card-desc">{item.description}</div>
                {item.link && <a href={item.link} target="_blank" rel="noopener noreferrer" className="event-card-link">Details</a>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
