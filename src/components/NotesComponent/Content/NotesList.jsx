import React, { useState } from "react";

const NotesList = ({ notes, onEdit, onDelete, onSave }) => {
  const [isNewNote, setIsNewNote] = useState(false);
  const [editingNote, setEditingNote] = useState(null); 
  const [editingNoteTitle, setEditingNoteTitle] = useState(""); 
  const [editingNoteContent, setEditingNoteContent] = useState(""); 

  const handleSave = (id, title, content) => {
    const updatedNote = { id, title, content }; // Create an object to pass to parent
    onSave(updatedNote);
    setEditingNote(null); 
    setIsNewNote(false); 
  };

  const isValidDate = (date) => {
    return !isNaN(Date.parse(date));
  };

  return (
    <div className="space-y-6 py-8">
      {notes.length === 0 ? (
        <p className="text-center text-xl font-semibold text-gray-600">
          No notes found. Start adding some!
        </p>
      ) : (
        notes.map((note) => (
          <div key={note.id} className="border p-4 rounded-lg shadow-lg ">
            {/* Action Buttons at the top */}
            <div className="flex justify-end gap-4 mb-4">
              <button
                onClick={() => {
                  setEditingNote(note.id); // Set the note being edited
                  setEditingNoteTitle(note.title); // Set the title to the editing state
                  setEditingNoteContent(note.content); // Set the content to the editing state
                }}
                className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-md"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(note.id)}
                className="py-2 px-4 rounded-md bg-red hover:opacity-75 text-white"
              >
                Delete
              </button>
            </div>

            {/* Editable form */}
            {editingNote === note.id ? (
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  value={editingNoteTitle} // Use the state for editing title
                  onChange={(e) => setEditingNoteTitle(e.target.value)} // Update title state
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <textarea
                  value={editingNoteContent} // Use the state for editing content
                  onChange={(e) => setEditingNoteContent(e.target.value)} // Update content state
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  onClick={() => handleSave(note.id, editingNoteTitle, editingNoteContent)} // Pass updated values
                  className="mt-2 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md"
                >
                  Save Changes
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-semibold text-gray-800">
                  {note.title}
                </h2>
                <p className="text-gray-600">{note.content.slice(0, 100)}...</p>
                <p className="text-sm text-gray-500">
                  Last modified:{" "}
                  {isValidDate(note.updatedAt)
                    ? new Date(note.updatedAt).toLocaleString("en-US", {
                        weekday: "short",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })
                    : new Date(note.createdAt).toLocaleString("en-US", {
                        weekday: "short",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                </p>
              </div>
            )}
          </div>
        ))
      )}

      {/* Add New Note Button */}
      {!isNewNote && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setIsNewNote(true)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200"
          >
            + Add New Note
          </button>
        </div>
      )}
    </div>
  );
};

export default NotesList;
