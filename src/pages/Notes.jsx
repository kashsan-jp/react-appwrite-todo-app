import { useEffect, useState } from 'react'
//import { databases } from '../appwrite/config';
import  db  from "../appwrite/databases"
import NoteForm from '../components/NoteForm';
import { Query } from 'appwrite';
import Note from '../components/Note';



function Notes() {

  const [ notes, setNotes ] = useState([]);

  useEffect(()=> {
    init();
  },[]);



  const init = async() => {
    const response = await db.notes.list(
      [Query.orderDesc('$createdAt')]
    );
    setNotes(response.documents);
  };
  return (
  <>
    <div className='container'>
      <h1 className='kiwi-maru-regular'>📝 僕のメモ用紙</h1>
    </div>
    <div className='form'>
    <NoteForm setNotes={setNotes}/>
    </div>
    <div className='memo'>
      {notes.map((note) => (
        <Note key={note.$id} setNotes={setNotes} noteData={note}/>
      ))}
    </div>
  </>
  )
}

export default Notes