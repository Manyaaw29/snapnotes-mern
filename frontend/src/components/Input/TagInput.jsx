import React from "react";
import { MdClose, MdAdd } from "react-icons/md";

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = React.useState("");
  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addNewTag();
    }
  };

  const addNewTag = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };
  return (
    <div className="">
      {tags?.length > 0 && (
        <div className="flex items-center gap-1.5 md:gap-2 flex-wrap mt-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-slate-900 bg-slate-100 px-2 md:px-3 py-2 md:py-3 rounded"
            >
              #{tag}
              <button
                onClick={() => {
                  handleRemoveTag(tag);
                }}
                className="min-w-[24px] min-h-[24px] flex items-center justify-center"
              >
                <MdClose className="text-sm md:text-base text-slate-500 hover:text-red-600" />
              </button>
            </span>
          ))}
        </div>
      )}
      <div className="flex items-center gap-3 md:gap-4 mt-3">
        <input
          type="text "
          value={inputValue}
          className="text-xs md:text-sm bg-transparent border border-slate-300 px-3 py-2 rounded outline-none flex-1"
          placeholder="Add tags..."
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        ></input>
        <button
          className="w-10 h-10 md:w-8 md:h-8 flex items-center justify-center rounded border border-blue-700 hover:bg-blue-700 transition-all min-w-[44px] min-h-[44px]"
          onClick={() => addNewTag()}
        >
          <MdAdd className="text-xl md:text-2xl text-blue-700 hover:text-white" />
        </button>
      </div>
    </div>
  );
};

export default TagInput;
