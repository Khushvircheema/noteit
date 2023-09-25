import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";

function YourNotes({ baseURL }) {
  const { id } = useParams();
  // state to tell if new note is added
  const [isNewNoteAdded, setIsNewNoteAdded] = useState(false);
  // state to tell if item is deleted
  const [isNoteDeleted, setIsNoteDeleted] = useState(false);
  const [note, setNote] = useState([]);
  const link = `${baseURL}notes/` + id;

  // run evertime a new note is added
  useEffect(() => {
    if (isNewNoteAdded || isNoteDeleted) {
      try {
        async function fetchdata() {
          await axios.get(link).then((res) => {
            setNote(res.data);
            console.log(res.data);
          });
        }
        fetchdata();
        setIsNoteDeleted(false);
        setIsNewNoteAdded(false);
      } catch (error) {
        console.log(error.message);
      }
    }
  }, [link, isNewNoteAdded, isNoteDeleted]);

  // Run when Component Mounts first time
  useEffect(() => {
    try {
      async function fetchdata() {
        await axios.get(link).then((res) => {
          setNote(res.data);
          console.log(res.data);
        });
      }
      fetchdata();
    } catch (error) {}
  }, [link]);
  return (
    <div>
      <CreateArea setIsNewNoteAdded={setIsNewNoteAdded} baseURL={baseURL} />
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
            baseURL={baseURL}
          />
        );
      })}
    </div>
  );
}

export default YourNotes;
