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


const Home = () => {
  const { currentUser, loading, errorDispatch } = useSelector(
    (state) => state.user
  );

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
    } catch (error) {}
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
  return (
    <>
      <Navbar userInfo={userInfo} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10">
      {allNotes.length === 0 ?
      (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
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
              onPinNote={() => {}}
            />
          ))}
        </div>
      ) :<EmptyCard  imgSrc={"https://cdni.iconscout.com/illustration/premium/thumb/male-standing-with-empty-notes-illustration-svg-download-png-10920966.png"} message={"Nothing here yet, but every great idea starts with a single note—add yours and begin."} /> }
      </div>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-[#2b85ff] hover:bg-blue-600  absolute right-10 bottom-10 fixed "
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
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel=""
        className="w-[40%] max-md:w-[60%] max-sm:w-[70%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll "
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
