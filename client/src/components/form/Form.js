import React from 'react';
import UrlList from './UrlList';

function Form({ urls, onChange, onAddUrl, onRemoveUrl, onSubmit, error }) {
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="space-y-4">
      <UrlList urls={urls} onChange={onChange} onRemoveUrl={onRemoveUrl} />
      <div className="space-x-2">
        <button 
          type="button" 
          onClick={onAddUrl} 
          className="bg-blue-500 text-white px-4 py-2 rounded">
          Add URL
        </button>
        <button 
          type="submit" 
          className="bg-green-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}

export default Form;
