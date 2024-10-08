import React, { useState, useEffect, useRef } from 'react';
import DOMPurify from 'dompurify';
import DropdownMenu from './DropdownMenu';

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
        {metadata.map((data, index) => {
          const currentTitle = editedMetadata[index]?.title || data.title;
          const currentDescription = editedMetadata[index]?.description || data.description;
          const currentImage = editedMetadata[index]?.image || data.image;

          return (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-2xl font-semibold text-gray-800">
                    {isEditing[index] ? (
                      <input
                        type="text"
                        value={currentTitle}
                        onChange={(e) => onEditMetadata(index, 'title', e.target.value)}
                        className="w-full border border-gray-300 rounded p-2"
                      />
                    ) : (
                      DOMPurify.sanitize(currentTitle)
                    )}
                  </h3>
                  <div ref={(el) => (menuRefs.current[index] = el)}>
                    <DropdownMenu
                      isOpen={openMenus[index]}
                      onToggle={() => toggleMenu(index)}
                      onEdit={() => toggleEditMode(index)}
                      onReset={() => resetMetadata(index)}
                      isEditing={isEditing[index]}
                    />
                  </div>
                </div>
                {isEditing[index] ? (
                  <textarea
                    value={currentDescription}
                    onChange={(e) => onEditMetadata(index, 'description', e.target.value)}
                    className="text-gray-600 mb-4 w-full border border-gray-300 rounded p-2"
                  />
                ) : (
                  <p className="text-gray-600 mb-4">{DOMPurify.sanitize(currentDescription)}</p>
                )}
              </div>
              {currentImage && (
                <div className="relative px-4">
                  {isEditing[index] ? (
                    <input
                      type="text"
                      value={currentImage}
                      onChange={(e) => onEditMetadata(index, 'image', e.target.value)}
                      placeholder="Edit image URL"
                      className="bottom-2 left-2 bg-white bg-opacity-75 rounded p-1 text-sm"
                    />
                  ) : (
                    <img
                      src={DOMPurify.sanitize(currentImage)}
                      alt={`Thumbnail for ${currentTitle}`}
                      className="w-full h-auto max-h-60 object-cover border-t border-gray-200"
                    />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MetadataDisplay;
