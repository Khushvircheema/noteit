import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import { useParams } from "react-router-dom";

function CreateArea({ setIsNewNoteAdded }) {
  const { id } = useParams();

  // State to hold the title and content of the new note
  const [valueis, setValue] = useState({
    title: "",
    content: "",
  });

  // Function to handle input changes
  function handleChange(event) {
    const { name, value } = event.target;
    setValue((prevNote) => {
      return { ...prevNote, [name]: value };
    });
  }

  // Function to add a new note to the database
  async function addItem(evt) {
    evt.preventDefault();
    // Convert valueis object to a JSON string
    let stringify = JSON.stringify(valueis);

    try {
      // Send POST request to add the note to the database
      const response = await fetch("https://note-it.onrender.com/notes/" + id, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: stringify,
      });
      const data = await response.json(); // Parse response JSON data
      console.log("Note added successfully:", data); // Handle the response data
    } catch (error) {
      console.error("Error creating New Note:", error.message);
    }

    setIsNewNoteAdded(true);
    // Clear input fields
    setValue({
      title: "",
      content: "",
    });
  }

  // State to manage showing input fields
  const [show, setShow] = useState(false);

  // Function to show input fields when clicking
  function showIt() {
    setShow((prev) => (prev = true));
  }

  return (
    <div>
      <form className="create-note" onSubmit={addItem}>
        {/* Input for title */}
        <input
          name="title"
          value={valueis.title}
          placeholder="Title"
          onChange={handleChange}
          spellCheck="false"
          style={{ display: show ? "" : "none" }}
        />
        {/* Textarea for content */}
        <textarea
          name="content"
          value={valueis.content}
          placeholder="Take a note ..."
          rows={show ? 3 : 1}
          spellCheck="false"
          onChange={handleChange}
          onClick={showIt}
        />
        {/* Zoom effect on the Add button */}
        <Zoom in={true}>
          <Fab onClick={addItem} style={{ display: show ? "" : "none" }}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
