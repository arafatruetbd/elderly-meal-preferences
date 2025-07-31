import { useState } from "react";
import FoodSection from "./FoodSection";
import FoodItemCard from "./FoodItemCard";

// Define the fixed categories for food types
const CATEGORIES = ["Breakfast", "Lunch", "Dinner", "Snacks"] as const;
// Create a type from the categories array elements
type FoodCategory = (typeof CATEGORIES)[number];

// Interface defining the shape of a food item
interface FoodItem {
  category: FoodCategory; // Category of the food (e.g., Breakfast)
  foodName: string; // Name of the food item
}

const FavoriteFoods = () => {
  // State to hold the list of favorite food items
  const [items, setItems] = useState<FoodItem[]>([]);

  return (
    // Use generic FoodSection component to manage the list
    <FoodSection<FoodItem>
      title="My Favorite Foods" // Section title
      categories={CATEGORIES} // Categories for selection in add/edit forms
      items={items} // Current list of favorite foods
      // Functions to get/set category and name properties on items
      getCategory={(item) => item.category}
      setCategory={(item, category) => ({
        ...item,
        category: category as FoodCategory,
      })}
      getName={(item) => item.foodName}
      setName={(item, name) => ({ ...item, foodName: name })}
      // Styling for the add button
      addButtonClass="bg-gradient-to-r from-green-400 to-cyan-500"
      placeholder="Enter food item" // Placeholder text for input
      // Callback when a new item is added: append to list
      onAdd={(item) => setItems((prev) => [...prev, item])}
      // Callback to update an existing item by index
      onEdit={(index, newItem) =>
        setItems((prev) => {
          const updated = [...prev];
          updated[index] = newItem;
          return updated;
        })
      }
      // Callback to remove an item by index
      onRemove={(index) =>
        setItems((prev) => prev.filter((_, i) => i !== index))
      }
      // Function to render each food item card
      renderCard={(item, index, onEdit, onRemove) => (
        <FoodItemCard
          key={index}
          foodName={item.foodName}
          onEdit={onEdit}
          onRemove={onRemove}
        />
      )}
      // Styling for the container div
      containerClassName="max-w-4xl mx-auto p-8 bg-gradient-to-br from-green-400 to-cyan-500 rounded-2xl shadow-2xl relative"
      // Styling for the title text
      titleClassName="text-4xl font-bold text-white mb-10 text-center tracking-wide"
    />
  );
};

export default FavoriteFoods;
