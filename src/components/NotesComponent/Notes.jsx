// import React, { useState, useEffect } from 'react';
// import NotesCard from './Content/NotesCard';
// import NotesList from './Content/NotesList';
// import SearchAndFilters from './Content/SearchAndFilters';
// import { db } from '../../../firebaseConfig';

// export default function Notes() {

//   return (
//     <>
//     <div className='max-w-screen-lg mx-auto px-4 '>
//       <SearchAndFilters />
//       <NotesCard />
//       <NotesList />
//       </div>
//     </>
//   );
// }


import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../../../firebaseConfig'; // Firebase config file
import NotesCard from './Content/NotesCard';
import NotesList from './Content/NotesList';
import SearchAndFilters from './Content/SearchAndFilters';

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: '', content: '' });

  // Fetch notes from Firebase
  useEffect(() => {
    const fetchNotes = async () => {
      const querySnapshot = await getDocs(collection(db, 'notes'));
      const notesArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotes(notesArray);
      setFilteredNotes(notesArray); // Set filtered notes initially as all notes
    };
    fetchNotes();
  }, []);

  // Add new note to Firebase
  const handleAddNote = async (event) => {
    event.preventDefault();
    if (!newNote.title || !newNote.content) {
      alert('Both title and content are required!');
      return;
    }

    try {
      const docRef = await addDoc(collection(db, 'notes'), {
        title: newNote.title,
        content: newNote.content,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      const newNoteObj = { id: docRef.id, ...newNote };
      setNotes([...notes, newNoteObj]);
      setFilteredNotes([...filteredNotes, newNoteObj]);
      setNewNote({ title: '', content: '' });
    } catch (error) {
      console.error('Error adding note: ', error);
    }
  };

  // Handle search and filtering
  const handleSearch = (query, searchType) => {
    const filtered = notes.filter((note) =>
      note[searchType]?.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredNotes(filtered);
  };

  const handleSort = (sortType) => {
    const sorted = [...filteredNotes].sort((a, b) => {
      if (sortType === 'dateModified') {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      }
      if (sortType === 'alphabet') {
        return a.title.localeCompare(b.title);
      }
      if (sortType === 'dateCreated') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return 0;
    });
    setFilteredNotes(sorted);
  };

  return (
    <div className="max-w-screen-lg mx-auto px-4">
      {/* Pass search and sort handlers to SearchAndFilters */}
      <SearchAndFilters onSearch={handleSearch} onSort={handleSort} />
      
      {/* Add Note form (passed down to NotesCard) */}
      <NotesCard
        newNote={newNote}
        setNewNote={setNewNote}
        handleAddNote={handleAddNote}
      />
      
      {/* Pass filtered notes to NotesList */}
      <NotesList notes={filteredNotes} />
    </div>
  );
}
