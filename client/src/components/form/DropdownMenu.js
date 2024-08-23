import React from 'react';
import { Ellipsis } from 'lucide-react';

function DropdownMenu({ isOpen, onToggle, onEdit, onReset, isEditing }) {
    return (
        <div className="relative">
            <button
                onClick={onToggle}
                className="text-sm text-purple-500 hover:underline hover:bg-purple-100 rounded"
            >
                <Ellipsis size={20} />
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-28 bg-white border border-purple-200 rounded shadow-lg">
                    <ul>
                        <li>
                            <button
                                onClick={onEdit}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-100 w-full text-left"
                            >
                                {isEditing ? 'Save' : 'Edit'}
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={onReset}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-100 w-full text-left"
                            >
                                Reset
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default DropdownMenu;
