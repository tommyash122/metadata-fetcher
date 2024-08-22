import React from 'react';
import { Copy, X } from 'lucide-react';
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
          className="border border-purple-300 rounded p-2 w-full focus:border-purple-700 focus:ring-1 focus:ring-purple-600 focus:outline-none pr-10 opacity-60 hover:opacity-60"
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
          className="border border-red-500 text-red-500 font-bold py-2 px-2 rounded shadow flex items-center justify-center bg-white hover:bg-red-100">
          <X size={20} />
        </button>
      )}
    </div>
  );
}

export default UrlInput;
