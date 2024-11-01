import React from 'react';
import UrlInput from './UrlInput';

function UrlList({ urls, onChange, onRemoveUrl, invalidUrls }) {

  return (
    <div className="p-8 pt-16 max-w-6xl mx-auto">
      {urls.map((url, index) => (
        <UrlInput
          key={index}
          index={index}
          value={url}
          onChange={onChange}
          onRemoveUrl={onRemoveUrl}
          showRemoveButton={urls.length > 1}
          isInvalid={invalidUrls[index]}
        />
      ))}
    </div>
  );
}

export default UrlList;
