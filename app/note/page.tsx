"use client";

import React, { useState, useEffect } from "react";
import Note from "../components/Note/Note";
import CreateArea from "../components/CreateArea/CreateArea";
import { db, auth } from "../firebase/firebase";
import { collection, addDoc, onSnapshot, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

interface Note {
  title: string;
  content: string;
  id?: string;
}

export default function Page() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
        setNotes([]); // Clear notes if the user logs out
      }
    });

    return () => {
      unsubscribeAuth();
    };
  }, []);

  useEffect(() => {
    if (userId) {
      const q = query(
        collection(db, "notes"),
        where("userId", "==", userId)
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const fetchedNotes: Note[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          content: doc.data().content,
        }));
        setNotes(fetchedNotes);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [userId]);

  const addNote = async (newNote: { title: string; content: string }) => {
    try {
      if (userId) {
        const docRef = await addDoc(collection(db, "notes"), {
          title: newNote.title,
          content: newNote.content,
          userId,
          createdAt: new Date(),
        });

        setNotes((prevNotes) => [
          ...prevNotes,
          { ...newNote, id: docRef.id },
        ]);
      }
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const deleteNote = (id: string) => {
    setNotes((prevNotes) => prevNotes.filter((noteItem) => noteItem.id !== id));
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <CreateArea onAdd={addNote} />
      <div className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2 lg:grid-cols-3">
        {notes.map((noteItem, index) => (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={() => deleteNote(noteItem.id!)}
          />
        ))}
      </div>
    </div>
  );
}
