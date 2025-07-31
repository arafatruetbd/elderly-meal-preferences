import React from "react";

interface FoodItemCardProps {
  foodName: string;
  onEdit: () => void;
  onRemove: () => void;
}

const FoodItemCard: React.FC<FoodItemCardProps> = ({
  foodName,
  onEdit,
  onRemove,
}) => (
  <div
    className="bg-white p-3 rounded-lg border border-gray-300 shadow-sm hover:shadow-md transition"
    aria-label={`Food item: ${foodName}`}
  >
    <h4 className="text-sm font-medium text-gray-800 mb-2 break-words">
      {foodName}
    </h4>
    <div className="mt-2 flex justify-end gap-1 text-xs">
      <button
        onClick={onEdit}
        className="px-2 py-0.5 rounded border border-yellow-400 text-yellow-600 hover:bg-yellow-50 cursor-pointer"
        aria-label={`Edit ${foodName}`}
      >
        ✏️
      </button>
      <button
        onClick={onRemove}
        className="px-2 py-0.5 rounded border border-red-400 text-red-600 hover:bg-red-50 cursor-pointer"
        aria-label={`Remove ${foodName}`}
      >
        🗑️
      </button>
    </div>
  </div>
);

export default FoodItemCard;
