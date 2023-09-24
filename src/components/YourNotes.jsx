import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";

function YourNotes() {
  const { id } = useParams();
  // state to tell if new note is added
  const [isNewNoteAdded, setIsNewNoteAdded] = useState(false);
  // state to tell if item is deleted
  const [isNoteDeleted, setIsNoteDeleted] = useState(false);
  const [note, setNote] = useState([]);
  const link = "https://noteit-api.onrender.com/notes/" + id;

  // Run when Component Mounts first time
  useEffect(() => {
    async function fetchdata() {
      await axios.get(link).then((res) => {
        setNote(res.data);
        console.log(res.data);
      });
    }
    fetchdata();
  }, [link]);

  // run evertime a new note is added
  useEffect(() => {
    if (isNewNoteAdded || isNoteDeleted) {
      async function fetchdata() {
        await axios.get(link).then((res) => {
          setNote(res.data);
          console.log(res.data);
        });
      }
      fetchdata();
      setIsNoteDeleted(false);
      setIsNewNoteAdded(false);
    }
  }, [link, isNewNoteAdded, isNoteDeleted]);

  return (
    <div>
      <CreateArea setIsNewNoteAdded={setIsNewNoteAdded} />
      {/* Render the list of Note components */}
      {note.map((item) => {
        return (
          <Note
            object={id}
            key={item._id}
            id={item._id}
            title={item.title}
            content={item.content}
            setIsNoteDeleted={setIsNoteDeleted}
          />
        );
      })}
    </div>
  );
}

export default YourNotes;
