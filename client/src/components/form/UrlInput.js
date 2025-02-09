import React, { useState, useEffect } from 'react';
import { Copy, X } from 'lucide-react';
import handleCopy from '../../utils/handleCopy'; 
import { useDispatch } from 'react-redux';
import { removeUrl, setUrls } from '../../services/metadataSlice';

function UrlInput({ index, value, showRemoveButton, isInvalid }) {
  const dispatch = useDispatch();
  const [showInvalidMessage, setShowInvalidMessage] = useState(false);

  const handleChange = (index, value) => {
    dispatch(setUrls({ index, value }));
  }; 

  const handleRemoveUrl = (index) => {
    dispatch(removeUrl(index));
  };
  
  useEffect(() => {
    // Clear the message when the user starts typing
    setShowInvalidMessage(false);

    const handler = setTimeout(() => {
      setShowInvalidMessage(isInvalid);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [value, isInvalid]);


  return (
    <div className="mb-4">
      <div className="flex items-center space-x-2">
        <div className="relative flex-grow">
          <input
            type="text"
            value={value}
            onChange={(e) => handleChange(index, e.target.value)}
            placeholder={`https://example${index + 1}.com`}
            className={`border rounded p-2 w-full focus:outline-none pr-10 ${
              showInvalidMessage ? 'border-red-400 focus:border-red-500' : 'border-purple-300 focus:border-purple-700 focus:ring-1 focus:ring-purple-600'
            }`}
            required
          />
          {value && (
            <button
              type="button"
              title='Copy URL'
              onClick={() => handleCopy(value)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-purple-700">
              <Copy size={20} />
            </button>
          )}
        </div>
        {showRemoveButton && (
          <button
            type="button"
            title='Remove URL'
            onClick={() => handleRemoveUrl(index)}
            className="border border-red-500 text-red-500 font-bold py-2 px-2 rounded shadow flex items-center justify-center bg-white hover:bg-red-100">
            <X size={20} />
          </button>
        )}
      </div>
      {showInvalidMessage && <p className="text-red-400 text-sm mt-1">Invalid URL</p>}
    </div>
  );
}

export default UrlInput;
