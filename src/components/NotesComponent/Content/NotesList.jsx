import NotesCard from './NotesCard';

const NotesList = ({ notes, onEdit, onDelete }) => {
  return (
    <div className="space-y-6 px-4 py-8 max-w-3xl mx-auto">
      {/* Empty state message */}
      {notes.length === 0 ? (
        <p className="text-center text-xl font-semibold text-gray-600">
          No notes found. Start adding some!
        </p>
      ) : (
        // Displaying notes
        notes.map((note) => {
          // Check if note is valid before passing to NotesCard
          if (!note || !note.title || !note.content) {
            return (
              <p key={note?.id} className="text-center text-gray-500">
                Invalid note data
              </p>
            );
          }
          return (
            <div key={note.id} className="hover:scale-105 transition-transform duration-300 ease-in-out">
              <NotesCard
                note={note}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            </div>
          );
        })
      )}
    </div>
  );
};

export default NotesList;
