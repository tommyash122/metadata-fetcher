import React from 'react';
import UrlInput from './UrlInput';

function UrlList({ urls, onChange, onRemoveUrl }) {
  return (
    <div>
      {urls.map((url, index) => (
        <UrlInput
          key={index}
          index={index}
          value={url}
          onChange={onChange}
          onRemoveUrl={onRemoveUrl}
          showRemoveButton={urls.length > 3}
        />
      ))}
    </div>
  );
}

export default UrlList;
