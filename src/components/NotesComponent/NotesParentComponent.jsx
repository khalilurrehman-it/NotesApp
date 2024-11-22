import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import NotesList from "./Content/NotesList";
import SearchAndFilters from "./Content/SearchAndFilters";
import NotesCard from "./Content/NotesCard";

export default function NotesParentComponent() {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [showNotesCard, setShowNotesCard] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "notes"));
        const notesArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNotes(notesArray);
        setFilteredNotes(notesArray);
      } catch (error) {
        console.error("Error fetching notes: ", error);
      }
    };
    fetchNotes();
  }, []);

  // Handle adding a new note
  const handleAddNote = async (newNote) => {
    if (!newNote.title.trim() || !newNote.content.trim()) {
      return alert("Both title and content are required!");
    }

    try {
      const docRef = await addDoc(collection(db, "notes"), {
        ...newNote,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      const addedNote = { id: docRef.id, ...newNote };
      setNotes((prev) => [...prev, addedNote]);
      setFilteredNotes((prev) => [...prev, addedNote]);
      setShowNotesCard(false); // Hide NotesCard after adding the note
    } catch (error) {
      console.error("Error adding note: ", error);
    }
  };

  const handleSave = async (updatedNote) => {
    await handleEditNote(updatedNote.id, updatedNote.title, updatedNote.content);
  };

  // Handle editing an existing note
  const handleEditNote = async (noteId, updatedTitle, updatedContent) => {
    try {
      const noteRef = doc(db, "notes", noteId);
      await updateDoc(noteRef, {
        title: updatedTitle,
        content: updatedContent,
        updatedAt: new Date().toISOString(),
      });
      const updatedNotes = notes.map((note) =>
        note.id === noteId
          ? { ...note, title: updatedTitle, content: updatedContent, updatedAt: new Date().toISOString() }
          : note
      );
      setNotes(updatedNotes);
      setFilteredNotes(updatedNotes);
    } catch (error) {
      console.error("Error updating note: ", error);
    }
  };

  // Delete a note from Firebase
  const handleDeleteNote = async (noteId) => {
    try {
      await deleteDoc(doc(db, "notes", noteId));
      const remainingNotes = notes.filter((note) => note.id !== noteId);
      setNotes(remainingNotes);
      setFilteredNotes(remainingNotes);
    } catch (error) {
      console.error("Error deleting note: ", error);
    }
  };

  const handleSearch = (query, searchType) => {
    const filtered = notes.filter((note) =>
      note[searchType]?.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredNotes(filtered);
  };

  // Handle sorting functionality
  const handleSort = (sortType) => {
    const sorted = [...filteredNotes].sort((a, b) => {
      if (sortType === "dateModified")
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      if (sortType === "alphabet") return a.title.localeCompare(b.title);
      if (sortType === "dateCreated")
        return new Date(b.createdAt) - new Date(a.createdAt);
      return 0;
    });
    setFilteredNotes(sorted);
  };

  // Show the NotesCard when Add Note button is clicked
  const handleShowNotesCard = () => {
    setShowNotesCard(true);
  };

  return (
    <div className="max-w-screen-lg mx-auto px-4">
      <SearchAndFilters
        onSearch={handleSearch}
        onSort={handleSort}
        onAdd={handleShowNotesCard} // Pass the function to handle Add Note
      />
      {showNotesCard && (
        <NotesCard
          onSave={handleAddNote} // Pass the handleAddNote function
          isNew={true}
        />
      )}
      <NotesList
        notes={filteredNotes}
        onEdit={handleEditNote}
        onDelete={handleDeleteNote}
        onSave={handleSave}
      />
    </div>
  );
}
