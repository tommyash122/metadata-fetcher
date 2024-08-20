import React from 'react';
import UrlList from './UrlList';

function Form({ urls, onChange, onAddUrl, onRemoveUrl, onSubmit, error }) {
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
      <UrlList urls={urls} onChange={onChange} onRemoveUrl={onRemoveUrl} />
      <button type="button" onClick={onAddUrl}>Add URL</button>
      <button type="submit">Submit</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default Form;
