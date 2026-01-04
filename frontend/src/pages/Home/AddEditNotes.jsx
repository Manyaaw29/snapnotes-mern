import React from "react";
import { MdClose } from "react-icons/md";
import TagInput from "../../components/Input/TagInput";
import axios from "axios";
import { useState } from "react";
 import {  toast } from 'react-toastify';

const AddEditNotes = ({ onClose, noteData, type, getAllNotes }) => {
  const [title, setTitle] = useState(noteData ? noteData.title : "");
  const [content, setContent] = useState(noteData ? noteData.content : "");
  const [tags, setTags] = useState(noteData ? noteData.tags : []);
  const [Error, setError] = useState(null);

  const editNote = async () => {
    const noteId = noteData._id;
    try {
      const response = await axios.put("http://localhost:3000/api/notes/edit/" + noteId,
       { title, content, tags },
       { withCredentials: true }
      );
      if (response.data.success === false) {
        setError(response.data.message);
        toast.error(response.data.message);
        return;
      }
      toast.success("Note edited successfully");
      getAllNotes();
      onClose();
    } catch (error) {
      toast.error("Failed to edit note: " + error.message);
      console.log(error.message);
      setError(error.message);
    }

  };

  const addNewNote = async () => {
     try {
      const response = await axios.post("http://localhost:3000/api/notes/add",
       { title, content, tags },
       { withCredentials: true }
      );

      if (response.data.success === false) {
        setError(response.data.message);
        toast.error(response.data.message);
        return;
      }
      toast.success("Note added successfully");
     getAllNotes();
      onClose();
     } catch (error) {
      toast.error("Failed to add note: " + error.message);
        console.log(error.message);
        setError(error.message);
     }
  };
  const handleAddNote = () => {
    if (!title) {
      setError("Please enter the title");
      return;
    }
    if (!content) {
      setError("Please enter the content");
      return;
    }

    setError("");

    if (type == "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };
  return (
    <div className="relative">
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50"
        onClick={onClose}
      >
        <MdClose className="text-xl text-slate-400" />
      </button>
      <div className="flex flex-col gap-2 mt-2 ">
        <label className="input-label  text-red-400 uppercase"> Title </label>
        <input
          type="text"
          className="text-xl text-slate-950 outline-none bg-slate-100"
          placeholder="Title here..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label  text-red-400 uppercase"> Content </label>
        <textarea
          className="text-sm text-slate-950 outline-none bg-slate-100 p-2 rounded"
          placeholder="Description Here..."
          rows={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        >
          {" "}
        </textarea>
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label  text-red-400 uppercase"> Tags </label>
        <TagInput tags={tags} setTags={setTags} />
      </div>
      {Error && <p className="text-xs text-red-500 pt-4"> {Error} </p>}
      <button
        className="btn-primary font-medium mt-5 p-3"
        onClick={handleAddNote}
      >
        
        {type === "edit" ? "EDIT" : "ADD"}
      </button>
      
    </div>
  );
};

export default AddEditNotes;
