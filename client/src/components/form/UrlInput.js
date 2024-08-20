import React from 'react';

function UrlInput({ index, value, onChange, onRemoveUrl, showRemoveButton }) {
  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(index, e.target.value)}
        placeholder={`URL ${index + 1}`}
        required
      />
      {showRemoveButton && (
        <button type="button" onClick={() => onRemoveUrl(index)}>
          Remove
        </button>
      )}
    </div>
  );
}

export default UrlInput;
