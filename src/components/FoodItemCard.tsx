import React from "react";

interface FoodItemCardProps {
  foodName: string;      // The name of the food item to display
  onEdit: () => void;    // Callback triggered when the Edit button is clicked
  onRemove: () => void;  // Callback triggered when the Remove button is clicked
}

const FoodItemCard: React.FC<FoodItemCardProps> = ({
  foodName,
  onEdit,
  onRemove,
}) => (
  <div
    className="flex flex-col justify-between bg-white p-6 rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300"
    aria-label={`Food item: ${foodName}`}
  >
    {/* Food name heading with wrapping support for long names */}
    <h4 className="text-xl font-semibold text-gray-800 mb-3 leading-tight break-words">
      {foodName}
    </h4>

    {/* Action buttons container */}
    <div className="mt-4 flex justify-end gap-2 text-sm font-medium">
      {/* Edit button with icon and accessible cursor pointer */}
      <button
        onClick={onEdit}
        className="inline-flex items-center gap-1 whitespace-nowrap w-fit min-w-[64px] px-2 py-0.5 text-xs rounded border border-yellow-400 text-yellow-600 hover:bg-yellow-50 hover:shadow-sm transition-all duration-200 cursor-pointer"
        aria-label={`Edit ${foodName}`}
      >
        ✏️ Edit
      </button>

      {/* Remove button with icon and accessible cursor pointer */}
      <button
        onClick={onRemove}
        className="inline-flex items-center gap-1 whitespace-nowrap w-fit min-w-[64px] px-2 py-0.5 text-xs rounded border border-red-400 text-red-600 hover:bg-red-50 hover:shadow-sm transition-all duration-200 cursor-pointer"
        aria-label={`Remove ${foodName}`}
      >
        🗑️ Remove
      </button>
    </div>
  </div>
);

export default FoodItemCard;
