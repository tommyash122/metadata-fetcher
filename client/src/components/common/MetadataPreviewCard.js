import React from 'react';
import DOMPurify from 'dompurify';
import DropdownMenu from './DropdownMenu';
import { useNavigate } from 'react-router-dom';


function MetadataPreviewCard({
    index,
    data,
    editedMetadata,
    isEditing,
    onEditMetadata,
    toggleEditMode,
    resetMetadata,
    isOpen,
    onToggle,
    menuRef,
}) {
    const navigate = useNavigate();

    const currentTitle = editedMetadata?.title || data.title;
    const currentDescription = editedMetadata?.description || data.description;
    const currentImage = editedMetadata?.image || data.image;

    const handleCardClick = () => {
        navigate(`/metadataPage/${index}`);
    };

    return (
        <div
            className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            onClick={handleCardClick}
        >
            <div className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="p-4">
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="text-2xl font-semibold text-gray-800">
                            {isEditing ? (
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
                        <div ref={menuRef}>
                            <DropdownMenu
                                isOpen={isOpen}
                                onToggle={onToggle}
                                onEdit={() => toggleEditMode(index)}
                                onReset={() => resetMetadata(index)}
                                isEditing={isEditing}
                            />
                        </div>
                    </div>
                    {isEditing ? (
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
                        {isEditing ? (
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
        </div>

    );
}

export default MetadataPreviewCard;
