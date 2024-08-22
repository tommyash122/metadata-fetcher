import React, { useState } from 'react';
import Form from './components/form/Form';
import MetadataDisplay from './components/form/MetadataDisplay';
import { fetchMetadata } from './services/api';
import { ToastManager, showErrorToast } from './components/common/ToastManager';

function App() {
  const [urls, setUrls] = useState(['', '', '']);
  const [metadata, setMetadata] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (index, value) => {
    const newUrls = [...urls];
    newUrls[index] = value;
    setUrls(newUrls);
  };

  const handleAddUrl = () => {
    setUrls([...urls, '']);
  };

  const handleRemoveUrl = (index) => {
    const newUrls = urls.filter((_, i) => i !== index);
    setUrls(newUrls);
  };

  const isValidUrl = (url) => {
    const urlPattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!urlPattern.test(url);
  };

  const handleSubmit = async () => {
    setMetadata([]);
    setIsLoading(true);

    // Validate URLs before submitting
    const invalidUrls = urls.filter(url => !isValidUrl(url));
    if (invalidUrls.length > 0) {
      showErrorToast('One or more URLs are invalid.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetchMetadata(urls);
      const metadata = response.metadata;

      const errors = metadata.filter(item => item.error);
      if (errors.length > 0) {
        showErrorToast(`Some URLs failed to load: ${errors.map(e => e.error).join(', ')}`);
      }

      setMetadata(metadata.filter(item => !item.error));
    } catch (error) {
      console.error('Error fetching metadata:', error);
      showErrorToast('An error occurred while fetching metadata');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Form
        urls={urls}
        onChange={handleChange}
        onAddUrl={handleAddUrl}
        onRemoveUrl={handleRemoveUrl}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
      <ToastManager />
      {metadata.length > 0 && <MetadataDisplay metadata={metadata} />}
    </div>
  );
}

export default App;
