import { useState } from "react";
import FoodSection from "./FoodSection";
import FoodItemCard from "./FoodItemCard";

// Define severity levels for disliked foods as a union type
type Severity = "Mild dislike" | "Absolutely won’t eat";

// Constant array of severity levels used in dropdowns and categories
const SEVERITY_LEVELS: Severity[] = ["Mild dislike", "Absolutely won’t eat"];

// Interface representing a disliked food item with name and severity
interface DislikedFoodItem {
  foodName: string;
  severity: Severity;
}

const DislikedFoods = () => {
  // State holding the list of disliked food items
  const [items, setItems] = useState<DislikedFoodItem[]>([]);

  return (
    // Use generic FoodSection component to handle list management
    <FoodSection<DislikedFoodItem>
      title="Disliked Foods"
      categories={SEVERITY_LEVELS} // Categories correspond to severity levels
      items={items} // Current list of disliked foods
      // Getter for the category/severity of an item
      getCategory={(item) => item.severity}
      // Setter to update an item's category/severity, casting to Severity type
      setCategory={(item, category) => ({
        ...item,
        severity: category as Severity,
      })}
      // Getter for the food name of an item
      getName={(item) => item.foodName}
      // Setter to update an item's food name
      setName={(item, name) => ({ ...item, foodName: name })}
      // CSS classes for styling the add button within FoodSection
      addButtonClass="bg-gradient-to-r from-red-500 to-orange-500"
      // Placeholder text for the input field
      placeholder="Enter food item"
      // Handler to add a new disliked food item to the list
      onAdd={(item) => setItems((prev) => [...prev, item])}
      // Handler to edit an existing item at a given index
      onEdit={(index, newItem) =>
        setItems((prev) => {
          const updated = [...prev];
          updated[index] = newItem;
          return updated;
        })
      }
      // Handler to remove an item by index from the list
      onRemove={(index) =>
        setItems((prev) => prev.filter((_, i) => i !== index))
      }
      // Render function to display each item using FoodItemCard component
      renderCard={(item, index, onEdit, onRemove) => (
        <FoodItemCard
          key={index}
          foodName={item.foodName}
          onEdit={onEdit}
          onRemove={onRemove}
        />
      )}
      // Styling for the container wrapping this FoodSection
      containerClassName="max-w-4xl mx-auto p-8 bg-gradient-to-br from-red-400 to-yellow-500 rounded-2xl shadow-2xl relative"
      // Styling for the title text
      titleClassName="text-4xl font-bold text-white mb-10 text-center tracking-wide"
    />
  );
};

export default DislikedFoods;
