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
    <div className="bg-white rounded-xl p-4 md:p-6 shadow-md hover:shadow-xl transition-all ease-in-out border-l-4 border-l-blue-500">
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-base md:text-lg font-bold text-gray-900">{title}</h6>
          <span className="text-xs text-blue-600 font-semibold px-2 py-0.5 bg-blue-50 rounded-md flex items-center gap-1 w-fit mt-1">
            <MdCalendarToday className="text-xs" />
            {moment(date).format("Do MMMM YYYY")}
          </span>
        </div>
        <MdOutlinePushPin
          className={`text-md cursor-pointer transition ${
            isPinned ? "text-amber-500" : "text-slate-400 hover:text-amber-500"
          }`}
          onClick={onPinNote}
        />
      </div>

      <p className="text-sm text-gray-700 mt-3 md:mt-4 leading-relaxed">
        {content ? content.slice(0, 80) : ""}
      </p>
      <div className="flex items-center justify-between mt-4 md:mt-5">
        <div className="flex gap-1.5 md:gap-2 flex-wrap">
          {tags.map((item, index) => (
            <span key={index} className="text-xs bg-blue-100 text-blue-700 px-2 md:px-3 py-1 rounded-full font-medium">
              #{item}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <MdCreate
            className="text-md text-gray-600 hover:text-green-600 cursor-pointer transition"
            onClick={onEdit}
          />
          <MdDelete
            className="text-md text-gray-600 hover:text-red-600 cursor-pointer transition"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
