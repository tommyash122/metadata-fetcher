import React, { useState, useEffect, useRef } from 'react';
import MetadataPreviewCard from '../common/MetadataPreviewCard';

function MetadataDisplay({ metadata, editedMetadata, onEditMetadata, isEditing, toggleEditMode, resetMetadata }) {
  const [openMenus, setOpenMenus] = useState({});
  const menuRefs = useRef([]);

  const toggleMenu = (index) => {
    setOpenMenus((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const handleClickOutside = (event) => {
    menuRefs.current.forEach((menuRef, index) => {
      if (menuRef && !menuRef.contains(event.target)) {
        setOpenMenus((prevState) => ({
          ...prevState,
          [index]: false,
        }));
      }
    });
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="pt-16 px-8">
      <div className="flex items-center justify-center mb-8">
        <div className="w-full border-t border-gray-300"></div>
        <span className="px-4 text-gray-500 text-lg">Results</span>
        <div className="w-full border-t border-gray-300"></div>
      </div>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {metadata.map((data, index) => (
          <MetadataPreviewCard
            key={index}
            index={index}
            data={data}
            editedMetadata={editedMetadata[index]}
            isEditing={isEditing[index]}
            onEditMetadata={onEditMetadata}
            toggleEditMode={toggleEditMode}
            resetMetadata={resetMetadata}
            isOpen={openMenus[index]}
            onToggle={() => toggleMenu(index)}
            menuRef={(el) => (menuRefs.current[index] = el)}
          />
        ))}
      </div>
    </div>
  );
}

export default MetadataDisplay;
