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
        <div className="flex items-center gap-2 flex-wrap mt-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="flex items-center gap-2 text-sm text-slate-900 bg-slate-100 px-3 py-3 rounded"
            >
              #{tag}
              <button
                onClick={() => {
                  handleRemoveTag(tag);
                }}
              >
                <MdClose className="text-sm text-slate-500 hover:text-red-600" />
              </button>
            </span>
          ))}
        </div>
      )}
      <div className="flex items-center gap-4 mt-3">
        <input
          type="text "
          value={inputValue}
          className="text-sm bg-transparent border border-slate-300 px-3 py-2 rounded outline-none"
          placeholder="Add tags..."
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        ></input>
        <button
          className="w-8 h-8 flex items-center rounded border border-blue-700 justify-center hover:bg-blue-700"
          onClick={() => addNewTag()}
        >
          <MdAdd className="text-2xl text-blue-700 hover:text-white" />
        </button>
      </div>
    </div>
  );
};

export default TagInput;
