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
              className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-slate-900 dark:text-gray-200 bg-slate-100 dark:bg-gray-700 px-2 md:px-3 py-2 md:py-3 rounded"
            >
              #{tag}
              <button
                onClick={() => {
                  handleRemoveTag(tag);
                }}
                className="flex items-center justify-center"
              >
                <MdClose className="text-xs text-slate-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400" />
              </button>
            </span>
          ))}
        </div>
      )}
      <div className="flex items-center gap-3 md:gap-4 mt-3">
        <input
          type="text "
          value={inputValue}
          className="text-xs md:text-sm bg-transparent dark:bg-gray-700 dark:text-white border border-slate-300 dark:border-gray-600 px-3 py-2 rounded outline-none flex-1 dark:placeholder-gray-400"
          placeholder="Add tags..."
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        ></input>
        <button
          className="w-9 h-9 flex items-center justify-center rounded border border-blue-700 dark:border-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 transition-all flex-shrink-0"
          onClick={() => addNewTag()}
        >
          <MdAdd className="text-lg text-blue-700 dark:text-blue-400 hover:text-white" />
        </button>
      </div>
    </div>
  );
};

export default TagInput;
