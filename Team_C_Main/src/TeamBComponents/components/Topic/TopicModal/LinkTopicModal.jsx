/* eslint-disable react/prop-types */
import React from "react";

const LinkTopicModal = ({
  topic_file,
  handleInputChange,
  handleVideoCancelClick,
  handleVideoDoneClick,
}) => {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="bg-[#EBFFE5] p-8 rounded-lg z-10 w-[90%] md:w-[80%]">
          <p className="mb-4 text-lg font-semibold">Add Topic Link</p>
          <input
            required
            type="text"
            name="topic_file"
            value={topic_file}
            onChange={(e) => handleInputChange(e)}
            className="bg-[#BCE8B1] p-2 border border-gray-300 rounded-md mb-4 w-full"
            placeholder="https://www"
          />
          <div className="flex justify-end">
            <button
              onClick={handleVideoCancelClick}
              className="px-4 py-2 text-black rounded-md">
              Cancel
            </button>
            <button
              onClick={handleVideoDoneClick}
              className="bg-[#126912] text-white py-2 px-4 rounded-full ml-2">
              Done
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LinkTopicModal;
