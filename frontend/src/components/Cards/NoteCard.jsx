import React from "react";
import { MdCreate, MdDelete, MdOutlinePushPin, MdCalendarToday } from "react-icons/md";
import moment from "moment";

const NoteCard = ({
  isPinned,
  onPinNote,
  content,
  tags,
  onDelete,
  onEdit,
  title,
  date,
}) => {
  
  return (
    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all ease-in-out border-l-4 border-l-blue-500">
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-lg font-bold text-gray-900">{title}</h6>
          <span className="text-xs text-blue-600 font-semibold px-2 py-0.5 bg-blue-50 rounded-md flex items-center gap-1 w-fit">
            <MdCalendarToday className="text-xs" />
            {moment(date).format("Do MMMM YYYY")}
          </span>
        </div>
        <MdOutlinePushPin
          className={`icon-btn text-xl ${
            isPinned ? "text-amber-500" : "text-slate-400 hover:text-amber-500"
          }`}
          onClick={onPinNote}
        />
      </div>

      <p className="text-sm text-gray-700 mt-4 leading-relaxed">
        {content ? content.slice(0, 80) : ""}
      </p>
      <div className="flex items-center justify-between mt-5">
        <div className="flex gap-2 flex-wrap">
          {tags.map((item, index) => (
            <span key={index} className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
              #{item}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <MdCreate
            className="icon-btn text-lg text-gray-600 hover:text-green-600"
            onClick={onEdit}
          />
          <MdDelete
            className="icon-btn text-lg text-gray-600 hover:text-red-600"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
