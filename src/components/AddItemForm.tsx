type AddItemFormProps<T extends string> = {
  /** List of categories to select from (e.g. meal types, severity levels) */
  categories: readonly T[];
  /** Currently selected category */
  selectedCategory: T;
  /** Callback when category selection changes */
  onCategoryChange: (category: T) => void;
  /** Current value of the text input */
  inputValue: string;
  /** Callback when text input changes */
  onInputChange: (value: string) => void;
  /** Callback triggered when Add button is clicked */
  onAdd: () => void;
  /** Placeholder text for the input field */
  placeholder?: string;
  /** Label text for the Add button */
  buttonLabel?: string;
  /** Whether the Add button is disabled */
  disabled?: boolean;
  /** Additional CSS classes for the Add button */
  buttonClassName?: string;
};

function AddItemForm<T extends string>({
  categories,
  selectedCategory,
  onCategoryChange,
  inputValue,
  onInputChange,
  onAdd,
  placeholder = "Enter item",
  buttonLabel = "Add Item",
  disabled = false,
  buttonClassName = "",
}: AddItemFormProps<T>) {
  return (
    <div className="flex flex-wrap gap-4 justify-between items-center mb-10">
      {/* Category dropdown selector */}
      <div className="relative w-40">
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value as T)}
          className="block w-full p-3 rounded-lg bg-white border border-gray-300 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 appearance-none cursor-pointer transition"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {/* Dropdown arrow icon */}
        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
          <svg
            className="w-5 h-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {/* Text input for adding a new item */}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => onInputChange(e.target.value)}
        placeholder={placeholder}
        className="p-3 rounded-lg bg-white text-gray-800 border border-gray-300 shadow-sm w-72 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
      />

      {/* Add button to submit the new item */}
      <button
        onClick={onAdd}
        disabled={disabled}
        className={`flex items-center gap-2 text-white font-medium py-3 px-6 rounded-lg shadow hover:shadow-lg hover:brightness-110 transition-all duration-300 cursor-pointer ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        } ${buttonClassName} min-w-[130px]`} // Min width added to stretch button slightly on X-axis
      >
        ➕ {buttonLabel}
      </button>
    </div>
  );
}

export default AddItemForm;
