import React from "react";
import { MdCreate, MdDelete, MdOutlinePushPin } from "react-icons/md";

const NoteCard = ({ isPinned, onPinNote, content, tags, onDelete,onEdit,title,date}) => {
  return (
    <div className="border border-amber-50 rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out">
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-sm font-medium">{title}</h6>
          <span className="text-xs text-green-700">{date}</span>
        </div>
        <MdOutlinePushPin
          className={`icon-btn ${
            isPinned ? "text-[#2B85FF]" : "text-slate-400 hover:text-[#2b85ff]"
          }`}
          onClick={onPinNote}
        />
      </div>

      <p className="text-xs text-slate-800 mt-2">
        {content ? content.slice(0,60) : ""}
      </p>
      <div className="flex items-center justify-between mt-2">
        <div className="text-xs text-slate-500">{tags} </div>

        <div className="flex items-center gap-2">
          <MdCreate
            className="icon-btn hover:text-green-600"
            onClick={onEdit}
          />
          <MdDelete
            className="icon-btn hover:text-red-600"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
