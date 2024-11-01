import React from 'react';
import { useParams } from 'react-router-dom';


const MetadataPage = ({ metadata }) => {
  const { index } = useParams();

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-center">Metadata Viewer</h1>
        <p className="text-gray-600 text-center mt-2">View extracted metadata from the URLs provided.</p>
      </header>
      <div className="grid gap-4">
        {metadata.map((data, index) => (
          <p>hello</p>
        ))}
      </div>
    </div>
  );
};

export default MetadataPage;
