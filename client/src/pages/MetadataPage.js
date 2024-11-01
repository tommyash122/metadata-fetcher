import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMetadata } from '../hooks/MetadataContext';

const MetadataPage = () => {
  const { index } = useParams();
  const { metadata } = useMetadata();

  const metadataIndex = parseInt(index, 10);
  const item = metadata ? metadata[metadataIndex] : null;

  useEffect(() => {
    console.log(metadata)
  }, [])

  if (!item) {
    return <p className="text-center text-gray-500">Metadata not found.</p>;
  }

  const renderMetadataCard = (title, content) => (
    content && (
      <div className="bg-white p-4 rounded-lg shadow-md w-full mb-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-700">{content}</p>
      </div>
    )
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-screen-md flex flex-col items-center space-y-6">
        <img
          src={item.image}
          alt={item.title}
          className="w-full lg:w-2/3 h-auto object-cover rounded-lg shadow-lg"
        />

        <div className="w-full grid gap-4">
          {renderMetadataCard('Title', item.title)}
          {renderMetadataCard('Description', item.description)}
          {renderMetadataCard('URL', item.url)}
          {renderMetadataCard('Author', item.author)}
          {renderMetadataCard('Date', item.date)}
          {renderMetadataCard('Publisher', item.publisher)}
          {renderMetadataCard('Language', item.lang)}
        </div>
      </div>
    </div>
  );
};

export default MetadataPage;
