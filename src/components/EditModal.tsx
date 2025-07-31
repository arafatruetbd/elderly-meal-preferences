import React from "react";

interface EditFoodModalProps {
  // Current value of the food item name being edited
  value: string;
  // Callback to update the value when user types
  onChange: (val: string) => void;
  // Callback to close the modal without saving
  onClose: () => void;
  // Callback to save the changes and close the modal
  onSave: () => void;
}

const EditFoodModal: React.FC<EditFoodModalProps> = ({
  value,
  onChange,
  onClose,
  onSave,
}) => {
  return (
    // Modal backdrop: covers entire viewport with semi-transparent black + blur
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
      onClick={onClose} // Close modal if clicking outside content area
    >
      {/* Modal content container */}
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 sm:p-8 relative"
        onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing
      >
        {/* Header title */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-1">
          Edit Food Item
        </h2>
        {/* Description text */}
        <p className="text-sm text-gray-500 mb-6">
          Update the name of the selected food.
        </p>

        {/* Text input for editing the food name */}
        <input
          type="text"
          value={value} // Controlled input value
          onChange={(e) => onChange(e.target.value)} // Call onChange on typing
          placeholder="e.g., Oatmeal"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-sm"
          autoFocus // Automatically focus input when modal opens
          onKeyDown={(e) => {
            if (e.key === "Enter") onSave(); // Save changes on Enter key
            if (e.key === "Escape") onClose(); // Close modal on Escape key
          }}
        />

        {/* Action buttons container */}
        <div className="mt-6 flex justify-end gap-3">
          {/* Cancel button: closes modal without saving */}
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          {/* Save button: saves changes */}
          <button
            onClick={onSave}
            className="px-4 py-2 text-sm bg-cyan-600 text-white rounded-md hover:bg-cyan-700 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditFoodModal;
