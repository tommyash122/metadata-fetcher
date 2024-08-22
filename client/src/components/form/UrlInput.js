import React from 'react';

function UrlInput({ index, value, onChange, onRemoveUrl, showRemoveButton }) {
  return (
    <div className="flex items-center space-x-2 mb-4">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(index, e.target.value)}
        placeholder={`https://example${index + 1}.com`}
        className="border border-purple-300 rounded p-2 flex-grow focus:border-purple-700 focus:ring-1 focus:ring-purple-600 focus:outline-none"
        required
      />
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
