import React, { useState } from "react";
import { FaRegSave } from "react-icons/fa";

const NotesCard = ({ onSave }) => {
  const [noteTitle, setNoteTitle] = useState(""); 
  const [noteDescription, setNoteDescription] = useState("");

  const handleSave = () => {
    if (!noteTitle.trim() || !noteDescription.trim()) {
      return alert("Both title and content are required!");
    }

    onSave({ title: noteTitle, content: noteDescription }); // Pass the note as an object
    setNoteTitle(""); // Clear the title
    setNoteDescription(""); // Clear the description
  };

  return (
    <div className="mx-auto p-4 bg-white shadow-lg rounded-lg">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <input
            type="text"
            placeholder="Add Note Title Here"
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={handleSave}
            className="mt-2 md:mt-0 flex justify-center items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <FaRegSave />
            Save
          </button>
        </div>

        <textarea
          placeholder="Enter your note description"
          value={noteDescription}
          onChange={(e) => setNoteDescription(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          rows="6"
        />
      </div>
    </div>
  );
};

export default NotesCard;
