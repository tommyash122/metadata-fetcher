import React, { useEffect } from 'react';
import UrlInput from './UrlInput';
import { useSelector, useDispatch } from 'react-redux';
import { selectUrls, selectInvalidUrls, setInvalidUrls } from '../../services/metadataSlice';
import validator from 'validator';


function UrlList() {
  const dispatch = useDispatch();
  const urls = useSelector(selectUrls);
  const invalidUrls = useSelector(selectInvalidUrls);

  useEffect(() => {
    const invalids = urls.map(url => url.trim() !== '' && !validator.isURL(url));
    dispatch(setInvalidUrls(invalids));
  }, [urls, dispatch]);

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
