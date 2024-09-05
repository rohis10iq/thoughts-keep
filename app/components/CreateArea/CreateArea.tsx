'use client';

import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/app/firebase/firebase";
import { getAuth } from "firebase/auth";

interface Note {
  title: string;
  content: string;
}

interface CreateProps {
  onAdd: (note: Note) => void;
}

export function CreateArea({ onAdd }: CreateProps) { 
  const [note, setNote] = useState<Note>({ title: "", content: "" });
  const auth = getAuth();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

  const submitNote = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAdd(note);

    const user = auth.currentUser;
    if (user) {
      try {
        await addDoc(collection(db, "notes"), {
          title: note.title,
          content: note.content,
          uid: user.uid,
          createdAt: new Date(),
        });
        console.log("Note saved to Firebase");
      } catch (error) {
        console.error("Error saving note to Firebase:", error);
      }
    } else {
      console.log("User is not authenticated");
    }

    setNote({ title: "", content: "" });
  };

  return (
    <div>
      <form onSubmit={submitNote}>
        <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
          required
        />
        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={3}
          required
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default CreateArea;