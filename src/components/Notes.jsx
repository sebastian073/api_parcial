// src/components/Notes.jsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  const fetchNotes = async () => {
    const { data, error } = await supabase.from('notes').select('*');
    if (error) console.error(error);
    else setNotes(data);
  };

  const addNote = async () => {
    const { error } = await supabase.from('notes').insert({ content: newNote });
    if (error) console.error(error);
    else {
      setNewNote('');
      fetchNotes();
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div>
      <h2>Notas Personales</h2>
      <input
        type="text"
        placeholder="Nueva nota"
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
      />
      <button onClick={addNote}>Agregar Nota</button>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>{note.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notes;
