import React, { useState } from "react";

const AdditionalConsiderations = () => {
  // State to hold current textarea input value
  const [considerations, setConsiderations] = useState("");
  // State to track character count for the textarea input
  const [charCount, setCharCount] = useState(0);
  // Array state to hold all submitted consideration texts
  const [submittedTexts, setSubmittedTexts] = useState<string[]>([]);

  // Maximum allowed characters for the textarea
  const MAX_LENGTH = 500;

  // Handle input changes, limit input to MAX_LENGTH characters
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = e.target.value;
    if (inputText.length <= MAX_LENGTH) {
      setConsiderations(inputText);
      setCharCount(inputText.length);
    }
  };

  // Handle key down events:
  // Submit on Enter or Ctrl+Enter / Cmd+Enter while preventing default newline
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.key === "Enter" && (e.ctrlKey || e.metaKey)) || e.key === "Enter") {
      e.preventDefault();
      submitConsiderations();
    }
  };

  // Submit the current input if non-empty, append to submittedTexts and reset input
  const submitConsiderations = () => {
    const trimmed = considerations.trim();
    if (!trimmed) return;

    setSubmittedTexts((prev) => [...prev, trimmed]);
    setConsiderations("");
    setCharCount(0);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl shadow-2xl">
      {/* Section header */}
      <h2 className="text-4xl font-semibold text-white mb-8 text-center tracking-wide">
        Additional Considerations
      </h2>

      <div className="mb-8">
        {/* Textarea label */}
        <label
          htmlFor="considerations"
          className="text-lg font-medium text-white block mb-2"
        >
          Please provide any special instructions for preparing meals:
        </label>

        {/* Textarea input */}
        <textarea
          id="considerations"
          value={considerations}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Texture preference, temperature preference, cultural restrictions..."
          rows={5}
          className="w-full p-4 rounded-md bg-white text-gray-700 shadow-md resize-y focus:outline-none focus:ring-4 focus:ring-yellow-300 transition"
        />

        {/* Character count display */}
        <div className="mt-2 text-right text-sm text-gray-800 font-medium">
          {charCount} / {MAX_LENGTH} characters
        </div>

        {/* Submit button: disabled if input is empty */}
        <button
          onClick={submitConsiderations}
          disabled={considerations.trim().length === 0}
          className={`mt-4 px-6 py-2 rounded-lg font-semibold text-white transition ${
            considerations.trim().length === 0
              ? "bg-yellow-300 cursor-not-allowed"
              : "bg-yellow-500 hover:bg-yellow-600 cursor-pointer shadow-md"
          }`}
          aria-disabled={considerations.trim().length === 0}
        >
          Submit
        </button>
      </div>

      {/* Display all submitted texts */}
      {submittedTexts.length > 0 && (
        <div className="bg-white bg-opacity-90 rounded-md p-6 shadow-lg border border-yellow-400 space-y-4">
          <h3 className="text-yellow-700 font-semibold mb-2">Submitted Considerations:</h3>
          {submittedTexts.map((text, idx) => (
            <p
              key={idx}
              className="text-gray-900 whitespace-pre-wrap border-b border-yellow-300 pb-2 last:border-none"
            >
              {text}
            </p>
          ))}
        </div>
      )}

      {/* Example instructions for guidance */}
      <div className="text-white mt-10">
        <h3 className="font-semibold mb-3">Examples:</h3>
        <ul className="list-disc ml-6 space-y-1">
          <li>Texture preference: Prefers soft foods like mashed potatoes.</li>
          <li>Temperature preference: Likes food lukewarm.</li>
          <li>Cultural restriction: Avoids pork due to religious reasons.</li>
        </ul>
      </div>
    </div>
  );
};

export default AdditionalConsiderations;
