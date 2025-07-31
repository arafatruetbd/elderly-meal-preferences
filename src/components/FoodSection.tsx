import React, { useState, useEffect } from "react";
import EditFoodModal from "./EditModal";
import AddItemForm from "./AddItemForm";

interface FoodSectionProps<T> {
  title: string; // Section title displayed at the top
  categories: readonly string[]; // List of category labels (e.g., Breakfast, Lunch)
  items: T[]; // Array of items to display in this section
  getCategory: (item: T) => string; // Function to get the category from an item
  setCategory: (item: T, category: string) => T; // Function to update an item's category
  getName: (item: T) => string; // Function to get the display name of an item
  setName: (item: T, name: string) => T; // Function to update an item's name
  onAdd: (item: T) => void; // Callback to add a new item
  onEdit: (index: number, item: T) => void; // Callback to edit an existing item by index
  onRemove: (index: number) => void; // Callback to remove an item by index
  placeholder: string; // Placeholder text for the input field
  renderCard: (
    item: T,
    index: number,
    onEdit: () => void,
    onRemove: () => void
  ) => React.ReactNode; // Render function for each item card
  containerClassName?: string; // Optional CSS classes for the container div
  titleClassName?: string; // Optional CSS classes for the title
  children?: React.ReactNode; // Optional children to render below the input form
  selectedCategory?: string; // Optional externally controlled selected category for input
  onCategoryChange?: (category: string) => void; // Optional callback when input category changes
}

function FoodSection<T>({
  title,
  categories,
  items,
  getCategory,
  setCategory,
  getName,
  setName,
  placeholder,
  onAdd,
  onEdit,
  onRemove,
  renderCard,
  containerClassName,
  titleClassName,
  children,
  selectedCategory: externalSelectedCategory,
  onCategoryChange: externalOnCategoryChange,
}: FoodSectionProps<T>) {
  // Manage input text state for the add item form
  const [inputValue, setInputValue] = useState("");

  // Manage selected category for the add item form;
  // use controlled prop if provided, otherwise internal state
  const [internalSelectedCategory, setInternalSelectedCategory] = useState(
    categories[0]
  );
  const selectedCategory = externalSelectedCategory ?? internalSelectedCategory;
  const setSelectedCategory =
    externalOnCategoryChange ?? setInternalSelectedCategory;

  // Modal state and editing item tracking
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");
  const [editingCategory, setEditingCategory] = useState(categories[0]);

  // Prevent body scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "";
  }, [isModalOpen]);

  // Add new item handler - trims input and calls onAdd with constructed item
  const handleAdd = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    const newItem = setCategory(setName({} as T, trimmed), selectedCategory);
    onAdd(newItem);
    setInputValue("");
  };

  // Open modal for editing an item
  const openEditModal = (index: number) => {
    setEditingIndex(index);
    setEditingName(getName(items[index]));
    setEditingCategory(getCategory(items[index]));
    setIsModalOpen(true);
  };

  // Save edits made in modal
  const saveEdit = () => {
    if (editingIndex === null) return;
    const trimmed = editingName.trim();
    if (!trimmed) return;

    const updatedItem = setCategory(
      setName(items[editingIndex], trimmed),
      editingCategory
    );
    onEdit(editingIndex, updatedItem);

    setIsModalOpen(false);
    setEditingIndex(null);
    setEditingName("");
  };

  return (
    <div
      className={
        containerClassName ??
        "max-w-4xl mx-auto p-8 rounded-2xl shadow-2xl relative"
      }
    >
      {/* Section Title */}
      <h2
        className={
          titleClassName ?? "text-4xl font-bold mb-10 text-center tracking-wide"
        }
      >
        {title}
      </h2>

      {/* Add Item Form with controlled category and input */}
      <AddItemForm
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        inputValue={inputValue}
        onInputChange={setInputValue}
        onAdd={handleAdd}
        placeholder={placeholder}
        buttonLabel="Add"
      />

      {/* Optional children (e.g., quick add buttons) */}
      {children}

      {/* Render items grouped by category */}
      {categories.map((category) => {
        const filteredItems = items
          .map((item, idx) => ({ item, idx }))
          .filter(({ item }) => getCategory(item) === category);

        if (filteredItems.length === 0) return null;

        const categoriesWithItems = categories.filter((cat) =>
          items.some((item) => getCategory(item) === cat)
        );
        const isLastCategory =
          category === categoriesWithItems[categoriesWithItems.length - 1];

        return (
          <div key={category} className="mb-2">
            <h3 className="text-2xl font-bold text-gray-800 mb-2 border-b border-white/30 pb-1">
              {category}
            </h3>

            <div
              className={`grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${
                isLastCategory ? "" : "border-b border-gray-300 pb-6"
              }`}
            >
              {filteredItems.map(({ item, idx }) =>
                renderCard(
                  item,
                  idx,
                  () => openEditModal(idx),
                  () => onRemove(idx)
                )
              )}
            </div>
          </div>
        );
      })}

      {/* Edit Modal dialog for renaming item */}
      {isModalOpen && editingIndex !== null && (
        <EditFoodModal
          value={editingName}
          onChange={setEditingName}
          onClose={() => setIsModalOpen(false)}
          onSave={saveEdit}
        />
      )}
    </div>
  );
}

export default FoodSection;
