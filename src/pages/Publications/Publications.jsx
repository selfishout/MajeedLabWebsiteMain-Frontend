import React, { useEffect, useState } from 'react';
import './Publications.css';
import { fetchPublicationData } from '../../services/api';

function getShortAuthors(authors) {
  if (!authors) return '';
  const arr = authors.split(/,|;/).map(a => a.trim()).filter(Boolean);
  if (arr.length <= 3) return authors;
  return arr.slice(0, 3).join(', ') + ' et al.';
}

export default function Publications() {
  const [publicationsData, setPublicationsData] = useState([]);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    fetchPublicationData().then(res => {
      setPublicationsData(res.data || []);
    });
  }, []);

  const handleRowClick = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <div className="publications-container">
      <h1 className="publications-title">Publications</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-xl shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Authors</th>
              <th className="p-3 text-left">Journal/Conf</th>
              <th className="p-3 text-left">Year</th>
              <th className="p-3 text-left">Link</th>
              <th className="p-3 text-left">PDF</th>
              <th className="p-3 text-left">Abstract</th>
            </tr>
          </thead>
          <tbody>
            {publicationsData.map((pub) => (
              <React.Fragment key={pub.id}>
                <tr
                  className={"border-b hover:bg-gray-50 cursor-pointer" + (expanded === pub.id ? ' bg-blue-50' : '')}
                  onClick={() => handleRowClick(pub.id)}
                  title={pub.authors && pub.authors.split(/,|;/).length > 3 ? pub.authors : ''}
                >
                  <td className="p-3 font-semibold">{pub.title}</td>
                  <td className="p-3">
                    {getShortAuthors(pub.authors)}
                    {pub.authors && pub.authors.split(/,|;/).length > 3 && (
                      <span className="ml-1 text-xs text-gray-400" title={pub.authors}>(hover for all)</span>
                    )}
                  </td>
                  <td className="p-3">{pub.journal}</td>
                  <td className="p-3">{pub.year}</td>
                  <td className="p-3">
                    {pub.link ? <a href={pub.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View</a> : <span className="text-xs text-gray-400">N/A</span>}
                  </td>
                  <td className="p-3">
                    {pub.pdf ? (
                      <a href={pub.pdf} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Download</a>
                    ) : (
                      <span className="text-xs text-gray-400">No PDF</span>
                    )}
                  </td>
                  <td className="p-3 max-w-xs truncate" title={pub.abstract}>{pub.abstract && pub.abstract.length > 60 ? pub.abstract.slice(0, 60) + '…' : pub.abstract}</td>
                </tr>
                {expanded === pub.id && (
                  <tr className="bg-blue-50">
                    <td colSpan={7} className="p-5">
                      <div className="text-lg font-bold mb-2">{pub.title}</div>
                      <div className="mb-2"><strong>Authors:</strong> {pub.authors}</div>
                      {pub.journal && <div className="mb-2"><strong>Journal/Conference:</strong> {pub.journal}</div>}
                      {pub.year && <div className="mb-2"><strong>Year:</strong> {pub.year}</div>}
                      {pub.link && <div className="mb-2"><strong>Link:</strong> <a href={pub.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{pub.link}</a></div>}
                      {pub.pdf && <div className="mb-2"><strong>PDF:</strong> <a href={pub.pdf} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Download</a></div>}
                      {pub.abstract && <div className="mb-2"><strong>Abstract:</strong> <div className="mt-1 whitespace-pre-line">{pub.abstract}</div></div>}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
            {publicationsData.length === 0 && (
              <tr>
                <td colSpan="7" className="p-6 text-center text-gray-500">
                  No publications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}