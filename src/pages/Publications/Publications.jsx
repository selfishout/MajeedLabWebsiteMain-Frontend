import React, { useState, useMemo } from 'react';
import './Publications.css';
import { publicationsData } from '../../data/publicationsData';

function getShortAuthors(authors) {
  if (!authors) return '';
  const arr = authors.split(/,|;/).map(a => a.trim()).filter(Boolean);
  if (arr.length <= 3) return authors;
  return arr.slice(0, 3).join(', ') + ' et al.';
}

export default function Publications() {
  const [expanded, setExpanded] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'year', direction: 'desc' });

  const metrics = useMemo(() => {
    const years = publicationsData
      .map((p) => p.year)
      .filter(Boolean);
    const latestYear = years.length ? Math.max(...years) : '—';

    const totalCitations = publicationsData.reduce((sum, pub) => sum + (pub.citations || 0), 0);
    const averageCitations = publicationsData.length
      ? Math.round(totalCitations / publicationsData.length)
      : 0;

    return {
      total: publicationsData.length,
      latestYear,
      totalCitations,
      averageCitations,
    };
  }, []);

  const handleRowClick = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'asc' };
    });
  };

  const sortedPublications = useMemo(() => {
    const sortable = [...publicationsData];
    if (!sortConfig.key) {
      return sortable;
    }

    return sortable.sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];

      if (sortConfig.key === 'year' || sortConfig.key === 'citations') {
        aVal = parseInt(aVal, 10) || 0;
        bVal = parseInt(bVal, 10) || 0;
      } else {
        if (typeof aVal === 'string') aVal = aVal.toLowerCase();
        if (typeof bVal === 'string') bVal = bVal.toLowerCase();
      }

      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [sortConfig]);

  return (
    <div className="publications-container">
      <h1 className="publications-title">Publications</h1>
      <p className="publications-lede">
        Peer-reviewed articles, conference papers, and award-winning demonstrations from the Majeed Agricultural Robotics Lab.
      </p>

      <section className="publications-metrics">
        <article className="metric-card">
          <h3>{metrics.total}</h3>
          <p>Total Publications</p>
        </article>
        <article className="metric-card">
          <h3>{metrics.totalCitations.toLocaleString()}</h3>
          <p>Total Citations</p>
        </article>
        <article className="metric-card">
          <h3>{metrics.averageCitations}</h3>
          <p>Average Citations</p>
        </article>
        <article className="metric-card">
          <h3>{metrics.latestYear}</h3>
          <p>Most Recent Year</p>
        </article>
      </section>

      <div className="publications-table-wrapper">
        <table className="publications-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('title')}>
                Title {sortConfig.key === 'title' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
              </th>
              <th onClick={() => handleSort('authors')}>
                Authors {sortConfig.key === 'authors' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
              </th>
              <th onClick={() => handleSort('journal')}>
                Journal / Venue {sortConfig.key === 'journal' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
              </th>
              <th onClick={() => handleSort('year')}>
                Year {sortConfig.key === 'year' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
              </th>
              <th onClick={() => handleSort('citations')} className="align-right">
                Citations {sortConfig.key === 'citations' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
              </th>
              <th>Links</th>
            </tr>
          </thead>
          <tbody>
            {sortedPublications.map((pub) => (
              <React.Fragment key={pub.id}>
                <tr
                  className={`table-row${expanded === pub.id ? ' expanded' : ''}`}
                  onClick={() => handleRowClick(pub.id)}
                  title={pub.authors && pub.authors.split(/,|;/).length > 3 ? pub.authors : ''}
                >
                  <td className="primary-cell">{pub.title}</td>
                  <td>
                    {getShortAuthors(pub.authors)}
                    {pub.authors && pub.authors.split(/,|;/).length > 3 && (
                      <span className="more-authors" title={pub.authors}>(hover for all)</span>
                    )}
                  </td>
                  <td>{pub.journal || '—'}</td>
                  <td>{pub.year || '—'}</td>
                  <td className="align-right citations-cell">{pub.citations ?? '—'}</td>
                  <td className="link-cell">
                    {pub.url && (
                      <a href={pub.url} target="_blank" rel="noopener noreferrer" className="table-link">Publisher</a>
                    )}
                    {pub.pdf && (
                      <a href={pub.pdf} target="_blank" rel="noopener noreferrer" className="table-link">PDF</a>
                    )}
                  </td>
                </tr>
                {expanded === pub.id && (
                  <tr className="expanded-row">
                    <td colSpan={6}>
                      <div className="expanded-content">
                        <div className="expanded-header">
                          <h2>{pub.title}</h2>
                          {pub.citations !== undefined && (
                            <span className="citation-badge">{pub.citations} citations</span>
                          )}
                        </div>
                        {pub.authors && (
                          <p><strong>Authors:</strong> {pub.authors}</p>
                        )}
                        {pub.journal && (
                          <p><strong>Journal / Venue:</strong> {pub.journal}</p>
                        )}
                        {pub.year && (
                          <p><strong>Year:</strong> {pub.year}</p>
                        )}
                        {pub.doi && (
                          <p><strong>DOI:</strong> {pub.doi}</p>
                        )}
                        {pub.abstract && (
                          <div className="expanded-abstract">
                            <strong>Abstract:</strong>
                            <p>{pub.abstract}</p>
                          </div>
                        )}
                        {pub.keywords && pub.keywords.length > 0 && (
                          <div className="keywords-chipset">
                            {pub.keywords.map((keyword) => (
                              <span key={keyword} className="keyword-chip">{keyword}</span>
                            ))}
                          </div>
                        )}
                        <div className="expanded-links">
                          {pub.url && (
                            <a href={pub.url} target="_blank" rel="noopener noreferrer" className="table-link">View Publisher Page</a>
                          )}
                          {pub.pdf && (
                            <a href={pub.pdf} target="_blank" rel="noopener noreferrer" className="table-link">Download PDF</a>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
            {sortedPublications.length === 0 && (
              <tr>
                <td colSpan="6" className="empty-state">
                  No publications listed yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}