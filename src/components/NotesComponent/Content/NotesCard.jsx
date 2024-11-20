import React from 'react';

const NotesCard = ({ note, onEdit, onDelete }) => {
  if (!note) return null; // Return nothing if note is invalid

  return (
    <div className="p-6 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 ease-in-out">
      {/* Actions (Edit/Delete) */}
      <div className="flex justify-end mb-6 space-x-4">
        <button
          onClick={() => onEdit(note.id)}
          className="text-blue-600 hover:text-blue-800 font-semibold py-2 px-4 border border-blue-500 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(note.id)}
          className="text-red-600 hover:text-red-800 font-semibold py-2 px-4 border border-red-500 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105"
        >
          Delete
        </button>
      </div>

      {/* Title */}
      <h3 className="text-2xl font-semibold text-gray-800 mb-3">{note.title}</h3>

      {/* Content */}
      <p className="text-gray-700 text-base leading-relaxed mb-5">{note.content}</p>

      {/* Footer */}
      <div className="text-sm text-gray-500">
        <span>Created: {note.createdAt || 'Not available'}</span>
      </div>
    </div>
  );
};

// Default prop if `note` is not provided
NotesCard.defaultProps = {
  note: { title: 'Untitled', content: 'No content', createdAt: 'Not available' },
};

export default NotesCard;
