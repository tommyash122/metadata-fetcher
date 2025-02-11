import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import Form from '../components/form/Form';
import MetadataDisplay from '../components/form/MetadataDisplay';
import { fetchMetadata } from '../services/fetchMetadata';
import { showErrorToast } from '../components/common/ToastManager';
import {
  setMetadata,
  setEditedMetadata,
  toggleEditing,
  setLoading,
  selectUrls,
  selectMetadata,
  selectEditedMetadata,
  selectIsEditing,
  selectInvalidUrls,
} from '../services/metadataSlice'

function Home() {
  const dispatch = useDispatch();

  const urls = useSelector(selectUrls);
  const metadata = useSelector(selectMetadata);
  const editedMetadata = useSelector(selectEditedMetadata);
  const isEditing = useSelector(selectIsEditing);
  const invalidUrls = useSelector(selectInvalidUrls);
  
  const handleSubmit = async () => {
    dispatch(setMetadata([]));
    dispatch(setLoading(true));

    if (invalidUrls.some(isInvalid => isInvalid)) {
      showErrorToast('One or more URLs are invalid.');
      dispatch(setLoading(false));
      return;
    }

    try {
      const response = await fetchMetadata(urls);
      const metadata = response.metadata;

      const errors = metadata.filter(item => item.error);
      if (errors.length > 0) {
        showErrorToast(`Some URLs failed to load: ${errors.map(e => e.error).join(', ')}`);
      }

      dispatch(setMetadata(metadata.filter(item => !item.error)));
      localStorage.setItem('metadata', JSON.stringify(metadata.filter(item => !item.error)));
    } catch (error) {
      console.error('Error fetching metadata:', error);
      showErrorToast('An error occurred while fetching metadata');
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <p className="text-center mb-8">
        Enter the URLs you want to fetch metadata for in the fields below.<br />
        You can add or remove URLs as needed, and when you're ready, click Submit to retrieve the metadata.
      </p>
      <Form
        onSubmit={handleSubmit}
      />
      {metadata.length > 0 && (
        <MetadataDisplay
          metadata={metadata}
          editedMetadata={editedMetadata}
          onEditMetadata={(index, field, value) => dispatch(setEditedMetadata({ index, field, value }))}
          isEditing={isEditing}
          toggleEditMode={(index) => dispatch(toggleEditing(index))}
          resetMetadata={(index) => dispatch(setEditedMetadata({ index, field: "reset" }))}
        />
      )}
    </div>
  );
}

export default Home;
