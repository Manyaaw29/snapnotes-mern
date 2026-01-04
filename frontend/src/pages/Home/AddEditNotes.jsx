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
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/notes/edit/${noteId}`,
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
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/notes/add`,
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
        className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-5 -right-5 bg-red-500 hover:bg-red-600 transition-colors shadow-lg"
        onClick={onClose}
      >
        <MdClose className="text-xl text-white" />
      </button>
      
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {type === "edit" ? "Edit Note" : "Add New Note"}
        </h2>
        <p className="text-sm text-gray-500 mt-1">Fill in the details below</p>
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Title</label>
        <input
          type="text"
          className="text-lg text-gray-900 outline-none bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
          placeholder="Enter title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      
      <div className="flex flex-col gap-2 mt-5">
        <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Content</label>
        <textarea
          className="text-sm text-gray-900 outline-none bg-blue-50 border border-blue-200 rounded-lg p-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none"
          placeholder="Write your note content here..."
          rows={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        >
          {" "}
        </textarea>
      </div>

      <div className="flex flex-col gap-2 mt-5">
        <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Tags</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>
      
      {Error && <p className="text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg mt-4 border border-red-200">{Error}</p>}
      
      <button
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg mt-6 transition-all shadow-md hover:shadow-lg"
        onClick={handleAddNote}
      >
        {type === "edit" ? "Update Note" : "Add Note"}
      </button>
    </div>
  );
};

export default AddEditNotes;
