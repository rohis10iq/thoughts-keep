"use client";

import React, { useState, useEffect } from "react";
import Note from "../components/Note/Note";
import CreateArea from "../components/CreateArea/page";
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
        console.log("User is authenticated:", user.uid);
        setUserId(user.uid);
      } else {
        console.log("User is not authenticated");
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
      console.log("Fetching notes for user:", userId);
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
        console.log("Fetched notes:", fetchedNotes);
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
        console.log("Note added:", { ...newNote, id: docRef.id });
      } else {
        console.error("No user is authenticated, cannot add note");
      }
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const deleteNote = (id: string) => {
    setNotes((prevNotes) => prevNotes.filter((noteItem) => noteItem.id !== id));
    console.log("Note deleted with id:", id);
  };

  return (
    <>
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => (
        <Note
          key={index}
          id={index}
          title={noteItem.title}
          content={noteItem.content}
          onDelete={() => deleteNote(noteItem.id!)}
        />
      ))}
    </>
  );
}
