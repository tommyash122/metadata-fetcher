import React from 'react';
import { useParams } from 'react-router-dom';
import { useMetadata } from '../hooks/MetadataContext';

const MetadataPage = () => {
  const { index } = useParams();
  const { metadata } = useMetadata();

  const metadataIndex = parseInt(index, 10);
  const item = metadata ? metadata[metadataIndex] : null;

  if (!item) {
    return <p className="text-center text-gray-500">Metadata not found.</p>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex flex-col lg:flex-row items-start lg:items-center lg:justify-center space-y-4 lg:space-y-0 lg:space-x-6">
        
        <img
          src={item.image}
          alt={item.title}
          className="w-full lg:w-1/3 h-auto object-cover rounded-lg shadow-lg mb-4 lg:mb-0"
        />

        <div className="bg-white p-4 rounded-lg shadow-md w-full lg:w-1/3 mt-4 lg:mt-0">
          <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
          <p className="text-gray-700">{item.description}</p>
        </div>
      </div>
    </div>
  );
};

export default MetadataPage;
