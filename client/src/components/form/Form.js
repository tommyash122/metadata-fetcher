import React from 'react';
import UrlList from './UrlList';
import { Plus } from 'lucide-react';

function Form({ urls, onChange, onAddUrl, onRemoveUrl, onSubmit, error }) {
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="space-y-4">
      <UrlList urls={urls} onChange={onChange} onRemoveUrl={onRemoveUrl} />
      
      <div className="flex justify-center space-x-4">
        <button 
          type="button" 
          onClick={onAddUrl} 
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow flex items-center">
          <Plus size={20} />
        </button>
        
        <button 
          type="submit" 
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded shadow">
          Submit
        </button>
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}
    </form>
  );
}

export default Form;
