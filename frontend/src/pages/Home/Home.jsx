import React from "react";
import NoteCard from "../../components/Cards/NoteCard";
import { MdAdd } from "react-icons/md";
import Modal from "react-modal";
import AddEditNotes from "./AddEditNotes";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import axios, { all } from "axios";
import { toast } from "react-toastify";
import EmptyCard from "../../components/EmptyCard/EmptyCard";
import { set } from "mongoose";


const Home = () => {
  const { currentUser, loading, errorDispatch } = useSelector(
    (state) => state.user
  );

  const [isSearch, setIsSearch] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([]);

  const navigate = useNavigate();
  const [openAddEditModal, setOpenAddEditModal] = React.useState({
    isOpen: false,
    type: "add",
    data: null,
  });

  useEffect(() => {
    if (currentUser === null || !currentUser) {
      navigate("/login");
    } else {
      setUserInfo(currentUser);
      getAllNotes();
    }
  }, []);

  // get all notes

  const getAllNotes = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/notes/all", {
        withCredentials: true,
      });
      if (response.data.success === false) {
        console.log("Failed to fetch notes");
        return;
      }
      setAllNotes(response.data.notes);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Session expired. Please login again.");
        navigate("/login");
      }
    }
  };

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isOpen: true, type: "edit", data: noteDetails });
  }

  //delete note

  const deleteNote = async (data) => {
    const noteId = data._id;
    try {
      const response = await axios.delete(
        "http://localhost:3000/api/notes/delete/" + noteId,
        { withCredentials: true }
      );
      if (response.data.success === false) {
        toast.error("Failed to delete note");
        return;
      }

      toast.success("Note deleted successfully");
      getAllNotes();

    } catch (error) {
      toast(error.message);
    }
  };

  const onSearchNote = async (query) => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/notes/search",
          { 
            params: { query },
            withCredentials: true 
          }
        );
        if (response.data.success === false) {
          toast.error(response.data.message);
          return;
        }
        toast.success("Search completed");

        setAllNotes(response.data.notes);
        setIsSearch(true);
      } catch (error) {
        toast.error(error.message);   
      }
  }

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  };

  const updateIsPinned = async(noteData) => {
    const noteId= noteData._id;
    try {
      const response = await axios.put(
        "http://localhost:3000/api/notes/updateNotePin/" + noteId,
        { isPinned: !noteData.isPinned },
        { withCredentials: true }
      );
      if (response.data.success === false) {
        toast.error(response.data.message);
        return;
      }
      toast.success("Note pin status updated successfully");
      getAllNotes();
    } catch (error) {
      toast.error("Failed to update pin status: " + error.message);
      
    }
  }
  return (
    <>
      <Navbar userInfo={userInfo} onSearchNote={onSearchNote} handleClearSearch={handleClearSearch} />
      <div className="px-8 pt-10 pb-20 min-h-screen bg-gradient-to-br from-slate-100 to-blue-100">
      {allNotes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {allNotes.map((note) => (
            <NoteCard
              key={note._id}
              title={note.title}
              date={note.createdAt}
              content={note.content}
              tags={note.tags}
              isPinned={note.isPinned}
              onEdit={() => {
                handleEdit(note);
              }}
              onDelete={() => {
                deleteNote(note);
              }}
              onPinNote={() => {
                updateIsPinned(note);
              }}
            />
          ))}
        </div>
      ) : (
        <EmptyCard  
          imgSrc={
            isSearch 
              ? "https://hvpnvn.edu.vn/wp-content/uploads/2023/11/no-data-found-8867280-7265556.png"
              : "https://cdni.iconscout.com/illustration/premium/thumb/male-standing-with-empty-notes-illustration-svg-download-png-10920966.png"
          } 
          message={
            isSearch 
              ? "Oops! No notes found matching your search." 
              : "Nothing here yet, but every great idea starts with a single note—add yours and begin."
          } 
        /> 
      )}
      </div>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-lg hover:shadow-xl transition-all absolute right-10 bottom-10 fixed "
        onClick={() =>
          setOpenAddEditModal({ isOpen: true, type: "add", data: null })
        }
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      <Modal
        isOpen={openAddEditModal.isOpen}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.5)",
          },
        }}
        contentLabel=""
        className="w-[45%] max-md:w-[65%] max-sm:w-[85%] max-h-[85vh] bg-white rounded-2xl mx-auto mt-14 p-8 overflow-scroll shadow-2xl border border-gray-200"
      >
        <AddEditNotes
          onClose={() =>
            setOpenAddEditModal({ isOpen: false, type: "add", data: null })
          }
          noteData={openAddEditModal.data}
          type={openAddEditModal.type}
          getAllNotes={getAllNotes}
        />
      </Modal>
    </>
  );
};

export default Home;
