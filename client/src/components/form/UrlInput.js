import React from 'react';
import { Copy } from 'lucide-react';
import { showToast } from '../common/ToastManager';

function UrlInput({ index, value, onChange, onRemoveUrl, showRemoveButton }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    showToast('Copied to clipboard!');
  };

  return (
    <div className="flex items-center space-x-2 mb-4">
      <div className="relative flex-grow">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(index, e.target.value)}
          placeholder={`https://example${index + 1}.com`}
          className="border border-purple-300 rounded p-2 w-full focus:border-purple-700 focus:ring-1 focus:ring-purple-600 focus:outline-none pr-10"
          required
        />
        {value && (
          <button
            type="button"
            onClick={handleCopy}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-purple-700">
            <Copy size={20} />
          </button>
        )}
      </div>
      {showRemoveButton && (
        <button
          type="button"
          onClick={() => onRemoveUrl(index)}
          className="bg-gray-500 text-white px-6 py-2 rounded">
          Remove
        </button>
      )}
    </div>
  );
}

export default UrlInput;
