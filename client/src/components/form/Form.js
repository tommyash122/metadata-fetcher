import React, { useEffect } from 'react';
import UrlList from './UrlList';
import { Plus, RotateCcw, Send } from 'lucide-react';
import { ClipLoader } from 'react-spinners';
import { showErrorToast } from '../common/ToastManager';
import { useDispatch } from 'react-redux';
import { addUrl } from '../../services/metadataSlice';

function Form({ onRemoveUrl, onSubmit, error, isLoading, invalidUrls, onReset }) {
  const dispatch = useDispatch();

  const handleAddUrl = () => {
    dispatch(addUrl());
  };

  useEffect(() => {
    if (error) {
      showErrorToast(error);
    }
  }, [error]);

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="space-y-4">
      <UrlList onRemoveUrl={onRemoveUrl} invalidUrls={invalidUrls}/>
      
      <div className="flex justify-center space-x-4">
        <button 
          type="button" 
          onClick={onReset} 
          title="Reset Form"
          className={`border border-purple-500 text-purple-500 font-bold py-2 px-4 rounded shadow flex items-center justify-center bg-white hover:bg-purple-100 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isLoading}
        >
          <RotateCcw size={20} />
        </button>
        <button 
          type="button" 
          onClick={handleAddUrl} 
          title="Add URL"
          className={`border border-purple-500 text-purple-500 font-bold py-2 px-4 rounded shadow flex items-center justify-center bg-white hover:bg-purple-100 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isLoading}
        >
          <Plus size={20} />
        </button>
        
        <button 
          type="submit" 
          title="Submit URLs"
          className="bg-purple-400 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded shadow flex items-center justify-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <ClipLoader size={20} color={"#ffffff"} loading={isLoading} />
          ) : (
            <Send size={20} />
          )}
        </button>
      </div>
    </form>
  );
}

export default Form;
