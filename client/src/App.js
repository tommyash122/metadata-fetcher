import React, { useState } from 'react';
import Form from './components/form/Form';
import MetadataDisplay from './components/form/MetadataDisplay';
import { fetchMetadata } from './services/api';
import { ToastManager, showErrorToast } from './components/common/ToastManager';
import validator from 'validator';

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

  const handleSubmit = async () => {
    setMetadata([]);
    setIsLoading(true);

    // Validate URLs before submitting
    const invalidUrls = urls.filter(url => !validator.isURL(url));
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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Metadata Fetcher</h1>
      <p className="text-center mb-8">
        Enter the URLs you want to fetch metadata for in the fields below.
        You can add or remove URLs as needed, and when you're ready, click Submit to retrieve the metadata.
      </p>
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
