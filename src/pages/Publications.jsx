import React, { useState, useEffect } from 'react';
import './Publications.css';
import { publicationsData, publicationsHelper } from '../data/publicationsData';
import { FaExternalLinkAlt, FaQuoteLeft, FaSearch, FaFilter } from 'react-icons/fa';

export default function Publications() {
  const [publications, setPublications] = useState([]);
  const [filteredPublications, setFilteredPublications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedJournal, setSelectedJournal] = useState('all');
  const [sortBy, setSortBy] = useState('year');

  useEffect(() => {
    // Load all publications
    const allPublications = publicationsHelper.getAll();
    setPublications(allPublications);
    setFilteredPublications(allPublications);
  }, []);

  useEffect(() => {
    // Filter publications based on search and filters
    let filtered = publications;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(pub => 
        pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pub.authors.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pub.abstract.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pub.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Year filter
    if (selectedYear !== 'all') {
      filtered = filtered.filter(pub => pub.year === parseInt(selectedYear));
    }

    // Journal filter
    if (selectedJournal !== 'all') {
      filtered = filtered.filter(pub => pub.journal === selectedJournal);
    }

    // Sort publications
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'year':
          return b.year - a.year;
        case 'citations':
          return b.citations - a.citations;
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return b.year - a.year;
      }
    });

    setFilteredPublications(filtered);
  }, [publications, searchTerm, selectedYear, selectedJournal, sortBy]);

  // Get unique years and journals for filters
  const years = [...new Set(publications.map(pub => pub.year))].sort((a, b) => b - a);
  const journals = [...new Set(publications.map(pub => pub.journal))].sort();

  const formatAuthors = (authors) => {
    return authors.split(',').map(author => author.trim()).join(', ');
  };

  const getJournalAbbreviation = (journal) => {
    const abbreviations = {
      'IEEE Robotics and Automation Magazine': 'IEEE RAM',
      'Computers and Electronics in Agriculture': 'Comput. Electron. Agric.',
      'Remote Sensing': 'Remote Sens.',
      'Sensors': 'Sensors',
      'Biosystems Engineering': 'Biosyst. Eng.',
      'Plant Disease': 'Plant Dis.',
      'Sustainability': 'Sustainability',
      'Drones': 'Drones'
    };
    return abbreviations[journal] || journal;
  };

  return (
    <div className="publications-page">
      <div className="publications-header">
        <h1 className="publications-title">Publications</h1>
        <p className="publications-subtitle">
          Our research contributions in agricultural robotics, computer vision, and smart farming technologies
        </p>
      </div>

      {/* Search and Filters */}
      <div className="publications-controls">
        <div className="search-section">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search publications by title, authors, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="filters-section">
          <div className="filter-group">
            <label className="filter-label">
              <FaFilter className="filter-icon" />
              Year:
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Years</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">
              <FaFilter className="filter-icon" />
              Journal:
            </label>
            <select
              value={selectedJournal}
              onChange={(e) => setSelectedJournal(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Journals</option>
              {journals.map(journal => (
                <option key={journal} value={journal}>{getJournalAbbreviation(journal)}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">
              <FaFilter className="filter-icon" />
              Sort By:
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="year">Year (Newest)</option>
              <option value="citations">Citations (High to Low)</option>
              <option value="title">Title (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Publications List */}
      <div className="publications-list">
        {filteredPublications.length === 0 ? (
          <div className="no-results">
            <p>No publications found matching your criteria.</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedYear('all');
                setSelectedJournal('all');
              }}
              className="clear-filters-btn"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          filteredPublications.map((publication) => (
            <div key={publication.id} className="publication-card">
              <div className="publication-header">
                <h3 className="publication-title">
                  <FaQuoteLeft className="quote-icon" />
                  {publication.title}
                </h3>
                <div className="publication-meta">
                  <span className="publication-year">{publication.year}</span>
                  <span className="publication-citations">
                    {publication.citations} citations
                  </span>
                </div>
              </div>

              <div className="publication-authors">
                <strong>Authors:</strong> {formatAuthors(publication.authors)}
              </div>

              <div className="publication-journal">
                <strong>Journal:</strong> {publication.journal}
              </div>

              {publication.doi && (
                <div className="publication-doi">
                  <strong>DOI:</strong> {publication.doi}
                </div>
              )}

              <div className="publication-abstract">
                <strong>Abstract:</strong> {publication.abstract}
              </div>

              <div className="publication-keywords">
                <strong>Keywords:</strong>
                <div className="keyword-tags">
                  {publication.keywords.map((keyword, index) => (
                    <span key={index} className="keyword-tag">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              <div className="publication-actions">
                {publication.url && (
                  <a
                    href={publication.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="publication-link"
                  >
                    <FaExternalLinkAlt className="link-icon" />
                    View Paper
                  </a>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Statistics */}
      <div className="publications-stats">
        <div className="stat-item">
          <span className="stat-number">{publications.length}</span>
          <span className="stat-label">Total Publications</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">
            {publications.reduce((sum, pub) => sum + pub.citations, 0)}
          </span>
          <span className="stat-label">Total Citations</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">
            {Math.max(...publications.map(pub => pub.year))}
          </span>
          <span className="stat-label">Latest Year</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">
            {Math.min(...publications.map(pub => pub.year))}
          </span>
          <span className="stat-label">Earliest Year</span>
        </div>
      </div>
    </div>
  );
}
