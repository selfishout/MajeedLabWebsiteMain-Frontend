import React, { useEffect, useState } from 'react';
import Preloader from './Preloader';

const Layout = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <Preloader />}
      <div style={{ display: loading ? 'none' : 'block' }}>
        {children}
      </div>
    </>
  );
};

export default Layout;
