interface AddItemFormProps {
  categories: readonly string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  inputValue: string;
  onInputChange: (value: string) => void;
  onAdd: () => void;
  placeholder: string;
  buttonLabel: string;
}

const AddItemForm = ({
  categories,
  selectedCategory,
  onCategoryChange,
  inputValue,
  onInputChange,
  onAdd,
  placeholder,
  buttonLabel,
}: AddItemFormProps) => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
      {/* Category Buttons */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-3 py-1 rounded-full text-sm border transition cursor-pointer ${
              selectedCategory === category
                ? "bg-gray-600 text-white border-gray-700"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Input Field */}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => onInputChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 px-3 py-2 rounded border text-sm border-gray-300 focus:outline-none focus:border-white bg-white"
      />

      {/* Add Button */}
      <button
        onClick={onAdd}
        className="px-4 py-2 rounded text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:ring-2 focus:ring-gray-400 transition cursor-pointer"
      >
        {buttonLabel}
      </button>
    </div>
  );
};

export default AddItemForm;
