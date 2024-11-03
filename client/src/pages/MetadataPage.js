import React from 'react';
import { useParams } from 'react-router-dom';
import { useMetadata } from '../hooks/MetadataContext';
import { Copy } from 'lucide-react';
import handleCopy from '../utils/handleCopy';

const MetadataPage = () => {
  const { index } = useParams();
  const { metadata } = useMetadata();

  const metadataIndex = parseInt(index, 10);
  const item = metadata ? metadata[metadataIndex] : null;

  if (!item) {
    return <p className="text-center text-gray-500">Metadata not found.</p>;
  }

  const renderMetadataCard = (title, content, isPrimary = false) => (
    content && (
      <div className={`p-4 rounded-lg shadow-md w-full mb-4 ${isPrimary ? 'bg-purple-50' : 'bg-white'}`}>
        <h3 className={`text-lg font-semibold mb-2 ${isPrimary ? 'text-purple-800' : 'text-gray-700'}`}>{title}</h3>
        <p className={`text-gray-700 ${isPrimary ? 'text-xl font-bold' : ''}`}>{content}</p>
      </div>
    )
  );

  const renderMetadataCardWithCopy = (title, content) => (
    content && (
      <div className="flex items-center bg-white p-4 rounded-lg shadow-md w-full mb-4">
        <div className="flex-grow">
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-gray-700">{content}</p>
        </div>
        <button
          type="button"
          title='Copy URL'
          onClick={() => handleCopy(content)}
          className="right-2 transform -translate-y-1/2 text-purple-700">
          <Copy size={20} />
        </button>
      </div>
    )
  );



  return (
    <div className="p-6 bg-gray-50 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-screen-md flex flex-col items-center space-y-6">
        <img
          src={item.image}
          alt={item.title}
          className="w-full lg:w-2/3 h-auto object-cover rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out"
        />

        <div className="w-full grid gap-4">
          {renderMetadataCard('Title', item.title, true)}
          {renderMetadataCard('Description', item.description, true)}
          {renderMetadataCardWithCopy('URL', item.url)}
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
