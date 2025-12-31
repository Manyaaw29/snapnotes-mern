import React from "react";
import NoteCard from "../../components/Cards/NoteCard";
import { MdAdd } from "react-icons/md";
import Modal from "react-modal";

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = React.useState({
    isOpen : false,
    type: "add",
    data: null,

  });
  return (
    <>
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
        <NoteCard title={"wake up at 6"} date={"30th January 2025"} content={"Remember to set an alarm for 6 AM and have a healthy breakfast"} tags={"morning,routine"} />
        <NoteCard title={"meeting with team"} date={"31st January 2025"} content={"Discuss project milestones and deadlines and assign tasks"} tags={"work,meeting"} />
        <NoteCard title={"grocery shopping"} date={"1st February 2025"} content={"Buy milk, eggs, and bread and also to get some fruits"} tags={"shopping,errands"} />
        <NoteCard title={"doctor appointment"} date={"2nd February 2025"} content={"Annual check-up at 10 AM"} tags={"health,appointment"} />
        <NoteCard title={"exercise"} date={"3rd February 2025"} content={"Go for a 30-minute run"} tags={"fitness,health"} />
        <NoteCard title={"read book"} date={"4th February 2025"} content={"Read 50 pages of a novel"} tags={"leisure,reading"} />
        <NoteCard title={"call mom"} date={"5th February 2025"} content={"Catch up with mom on the phone"} tags={"family,communication"} />
        <NoteCard title={"pay bills"} date={"6th February 2025"} content={"Pay electricity and internet bills"} tags={"finance,errands"} />
        <NoteCard title={"plan vacation"} date={"7th February 2025"} content={"Research destinations and book flights"} tags={"travel,planning"} />
   
   
      </div>
    </div>
 
     <button className="w-16 h-16 flex items-center justify-center rounded-2xl bg-[#2b85ff] hover:bg-blue-600  absolute right-10 bottom-10 fixed " 
     onClick={()=>setOpenAddEditModal({isOpen:true,type:"add",data:null})}
     >
    <MdAdd className="text-[32px] text-white"/>

     </button>

    <Modal 
    isOpen={openAddEditModal.isOpen}
    onRequestClose={()=>{}}
    style={{
      overlay:{
        backgroundColor: "rgba(0,0,0,0.2)"
      }
    }}
    contentLabel=""
    className="w-[40%] max-md:w-[60%] max-sm:w-[70%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 pverflow-scroll "

   >
    <AddEditNotes/>
    
    </Modal>

     </>
  );
};

export default Home;
