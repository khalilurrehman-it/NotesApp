// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
// import { getFirestore, setDoc, doc } from "firebase/firestore";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyC-vgO6DBINTiBaknWim8ZmzQ7DDrD8rA8",
//   authDomain: "notespace-4cfed.firebaseapp.com",
//   projectId: "notespace-4cfed",
//   storageBucket: "notespace-4cfed.firebasestorage.app",
//   messagingSenderId: "317026198709",
//   appId: "1:317026198709:web:98590f2c49a72ee7328afc",
//   measurementId: "G-RPD6B4TFQF"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Firebase Authentication
// const auth = getAuth(app);

// // Firebase Firestore
// const db = getFirestore(app);

// // Google Auth provider
// const provider = new GoogleAuthProvider();

// // Exporting necessary functions and values
// export { auth, provider, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect, setDoc, doc };




// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, setDoc, doc, getDoc, updateDoc, deleteDoc, collection, addDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-vgO6DBINTiBaknWim8ZmzQ7DDrD8rA8",
  authDomain: "notespace-4cfed.firebaseapp.com",
  projectId: "notespace-4cfed",
  storageBucket: "notespace-4cfed.firebasestorage.app",
  messagingSenderId: "317026198709",
  appId: "1:317026198709:web:98590f2c49a72ee7328afc",
  measurementId: "G-RPD6B4TFQF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Authentication
const auth = getAuth(app);

// Firebase Firestore
const db = getFirestore(app);

// Google Auth provider
const provider = new GoogleAuthProvider();

// Function to store notes data for a user
const storeUserNotes = async (userId, noteData) => {
  try {
    const notesRef = collection(db, "users", userId, "notes"); // Storing notes under each user
    await addDoc(notesRef, noteData); // Add a new note document
    console.log("Note added successfully!");
  } catch (error) {
    console.error("Error adding note: ", error);
  }
};

// Function to get user notes from Firestore
const getUserNotes = async (userId) => {
  try {
    const notesRef = collection(db, "users", userId, "notes"); // Getting notes for the user
    const snapshot = await getDocs(notesRef);
    const notesList = snapshot.docs.map(doc => doc.data());
    return notesList;
  } catch (error) {
    console.error("Error fetching notes: ", error);
  }
};

// Function to update an existing note
const updateNote = async (userId, noteId, updatedData) => {
  try {
    const noteRef = doc(db, "users", userId, "notes", noteId); // Reference to the specific note
    await updateDoc(noteRef, updatedData);
    console.log("Note updated successfully!");
  } catch (error) {
    console.error("Error updating note: ", error);
  }
};

// Function to delete a note
const deleteNote = async (userId, noteId) => {
  try {
    const noteRef = doc(db, "users", userId, "notes", noteId); // Reference to the note to be deleted
    await deleteDoc(noteRef);
    console.log("Note deleted successfully!");
  } catch (error) {
    console.error("Error deleting note: ", error);
  }
};

// Exporting necessary functions and values
export {
  auth,
  provider,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  storeUserNotes,
  getUserNotes,
  updateNote,
  deleteNote,
};
