import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useState } from "react";

function Note({ object, id, title, content, setIsNoteDeleted }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editContent, setEditContent] = useState(content);
  const noteId = String(id);
  const userId = object;
  let link = `https://noteit-api.onrender.com/notes/${userId}/${noteId}`;

  // Function to handle the delete button click
  async function handleClick() {
    async function deleteNote() {
      try {
        // Send a DELETE request to the server to delete the note
        await axios.delete(link).then((res) => console.log(res.data));
      } catch (error) {
        console.log(error.message);
      }
    }
    deleteNote();
    setIsNoteDeleted(true);
  }

  async function handleInputChange(event) {
    const { name, value } = event.target;
    if (name === "title") {
      setEditTitle(value);
    } else if (name === "content") {
      setEditContent(value);
    }
  }

  // function to save changed after editing
  async function handleSave() {
    const updatedNoteData = {
      title: editTitle,
      content: editContent,
    };
    try {
      const response = await axios.patch(
        `https://noteit-api-xy18.onrender.com/${userId}/${noteId}`,
        updatedNoteData
      );
      console.log(response.data);
      setIsEditing(false);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="note">
      {isEditing ? (
        <>
          <input
            type="text"
            name="title"
            value={editTitle}
            onChange={handleInputChange}
          />
          <textarea
            name="content"
            value={editContent}
            onChange={handleInputChange}
          />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          {/* Display note title */}
          <h1>{editTitle}</h1>
          {/* Display note content */}
          <p>{editContent}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}

      <button onClick={handleClick}>
        <DeleteIcon />
      </button>
    </div>
  );
}

export default Note;
