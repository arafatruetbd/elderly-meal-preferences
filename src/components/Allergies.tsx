import React, { useState } from "react";
import FoodSection from "./FoodSection";
import FoodItemCard from "./FoodItemCard";

// Common allergy options for quick add buttons
const COMMON_ALLERGIES = [
  "Nuts",
  "Dairy",
  "Gluten",
  "Shellfish",
  "Soy",
] as const;

// Severity levels for allergy/intolerance categorization
const SEVERITY_LEVELS = ["Mild intolerance", "Severe allergy"] as const;
type Severity = (typeof SEVERITY_LEVELS)[number];

// Interface representing a single allergy item
interface AllergyItem {
  foodName: string;
  severity: Severity;
}

const FoodAllergies = () => {
  // State to hold list of allergy items
  const [allergies, setAllergies] = useState<AllergyItem[]>([]);
  // State to track currently selected severity (category) for adding new items
  const [selectedSeverity, setSelectedSeverity] = React.useState<Severity>(
    SEVERITY_LEVELS[0]
  );

  // Getter function to extract category (severity) from an AllergyItem
  const getCategory = (item: AllergyItem) => item.severity;

  // Setter function to update category (severity) of an AllergyItem
  const setCategory = (item: AllergyItem, category: string) => ({
    ...item,
    severity: category as Severity,
  });

  // Getter function to extract name from an AllergyItem
  const getName = (item: AllergyItem) => item.foodName;

  // Setter function to update name of an AllergyItem
  const setName = (item: AllergyItem, name: string) => ({
    ...item,
    foodName: name,
  });

  // Handler for quick adding common allergies with the selected severity
  const quickAddAllergy = (item: string) => {
    // Prevent adding duplicates with same severity (case insensitive)
    if (
      !allergies.find(
        (a) =>
          a.foodName.toLowerCase() === item.toLowerCase() &&
          a.severity === selectedSeverity
      )
    ) {
      setAllergies([
        ...allergies,
        { foodName: item, severity: selectedSeverity },
      ]);
    }
  };

  // JSX for the quick add buttons section
  const quickAddButtons = (
    <div className="mb-8 mt-6">
      <h4 className="text-white font-semibold mb-3">
        Quick Add Common Allergies:
      </h4>
      <div className="flex flex-wrap gap-3">
        {COMMON_ALLERGIES.map((item) => (
          <button
            key={item}
            onClick={() => quickAddAllergy(item)}
            className="px-4 py-1 text-sm rounded-full bg-white text-pink-600 font-medium border border-pink-300 shadow hover:bg-pink-50 transition cursor-pointer"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      {/* Main FoodSection component that handles adding/editing/removing allergy items */}
      <FoodSection<AllergyItem>
        title="Food Intolerances / Allergies"
        categories={SEVERITY_LEVELS}
        items={allergies}
        getCategory={getCategory}
        setCategory={setCategory}
        getName={getName}
        setName={setName}
        // Add new item handler
        onAdd={(item) => setAllergies((prev) => [...prev, item])}
        // Edit existing item handler by index
        onEdit={(index, item) =>
          setAllergies((prev) => {
            const updated = [...prev];
            updated[index] = item;
            return updated;
          })
        }
        // Remove item handler by index
        onRemove={(index) =>
          setAllergies((prev) => prev.filter((_, i) => i !== index))
        }
        // Button styling for add button inside FoodSection
        addButtonClass="bg-gradient-to-r from-pink-400 to-red-500"
        // Placeholder text for the input inside FoodSection
        placeholder="Enter allergy/intolerance"
        // Render function for individual allergy cards
        renderCard={(item, index, onEdit, onRemove) => (
          <FoodItemCard
            key={index}
            foodName={item.foodName}
            onEdit={onEdit}
            onRemove={onRemove}
          />
        )}
        // Styling for the FoodSection container
        containerClassName="max-w-4xl mx-auto p-8 bg-gradient-to-br from-red-400 to-pink-500 rounded-2xl shadow-2xl relative"
        // Styling for the FoodSection title
        titleClassName="text-4xl font-bold text-white mb-10 text-center tracking-wide"
        // Pass down selected severity to control category select inside FoodSection
        selectedCategory={selectedSeverity}
        // Handle category changes from FoodSection, ensuring correct typing
        onCategoryChange={(category) =>
          setSelectedSeverity(category as Severity)
        }
      >
        {/* Render quick add common allergies buttons below the add form */}
        {quickAddButtons}
      </FoodSection>
    </div>
  );
};

export default FoodAllergies;
