'use client';

import React, { useEffect, useState } from 'react';

const HomePage = () => {
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    const fetchReport = async () => {
      const response = await fetch('/api/generate-report');
      if (response.ok) {
        const html = await response.text();
        setHtmlContent(html);
      } else {
        alert('Failed to generate report');
      }
    };

    fetchReport();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Generated Report</h1>
      <div
        dangerouslySetInnerHTML={{ __html: htmlContent }}
        style={{ border: '1px solid #ccc', padding: '20px' }}
      />
    </div>
  );
};

export default HomePage;
