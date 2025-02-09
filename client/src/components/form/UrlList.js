import React from 'react';
import UrlInput from './UrlInput';
import { useSelector } from 'react-redux';
import { selectUrls, selectInvalidUrls } from '../../services/metadataSlice';

function UrlList() {
  const urls = useSelector(selectUrls);
  const invalidUrls = useSelector(selectInvalidUrls);

  return (
    <div className="p-8 pt-16 max-w-6xl mx-auto">
      {urls.map((url, index) => (
        <UrlInput
          key={index}
          index={index}
          value={url}
          showRemoveButton={urls.length > 1}
          isInvalid={invalidUrls[index]}
        />
      ))}
    </div>
  );
}

export default UrlList;
