import React from "react";

const DeleteConfirmationDialog = ({ onCancel, onConfirm }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg">
        <p className="text-lg font-semibold mb-4">Are you sure you want to delete this?</p>
        <div className="flex justify-end">
          <button className="mr-2 px-4 py-2 bg-red-500 text-white rounded" onClick={onCancel}>
            No
          </button>
          <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={onConfirm}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationDialog;
