import React, { useEffect } from 'react';
import UrlList from './UrlList';
import { Plus } from 'lucide-react';
import { ClipLoader } from 'react-spinners';
import { showErrorToast } from '../common/ToastManager';

function Form({ urls, onChange, onAddUrl, onRemoveUrl, onSubmit, error, isLoading }) {

  useEffect(() => {
    if (error) {
      showErrorToast(error);
    }
  }, [error]);

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="space-y-4">
      <UrlList urls={urls} onChange={onChange} onRemoveUrl={onRemoveUrl} />
      
      <div className="flex justify-center space-x-4">
        <button 
          type="button" 
          onClick={onAddUrl} 
          className={`border border-purple-500 text-purple-500 font-bold py-2 px-4 rounded shadow flex items-center justify-center bg-white hover:bg-purple-100 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isLoading}
        >
          <Plus size={20} />
        </button>
        
        <button 
          type="submit" 
          className="bg-purple-400 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded shadow flex items-center justify-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <ClipLoader size={20} color={"#ffffff"} loading={isLoading} />
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </form>
  );
}

export default Form;
