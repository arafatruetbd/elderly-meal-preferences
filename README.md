# Zenaris React TypeScript Coding Challenge: Elderly Meal Preferences Interface

## Challenge Overview

This project is a user-friendly web interface designed for relatives and caregivers to input comprehensive meal preference information for elderly individuals. The application prioritizes **accessibility**, **clarity**, and **ease of use** to support caregivers who often manage multiple responsibilities under stress.

---

## Technical Stack

* **React** with **TypeScript**
* **Vite** (build tool)
* **TailwindCSS** (for styling)

---

## Functional Requirements

### 1. Favorite Foods Section

* Dynamic list where users can add items the elderly person enjoys.
* Ability to add, edit, and remove items.
* Categorization by meal types (e.g., Breakfast, Lunch, Dinner, Snacks).

### 2. Disliked Foods Section

* Dynamic list for foods the elderly person dislikes.
* Add, edit, and remove functionality similar to favorites.
* Optional severity levels (e.g., mild dislike vs. absolutely won’t eat).

### 3. Food Intolerances / Allergies Section

* Critical section to capture medical dietary restrictions.
* Clear visual distinction from preference sections.
* Required severity indicator (e.g., mild intolerance vs. severe allergy).
* Quick-select buttons for common allergies such as nuts, dairy, gluten, shellfish, soy.

### 4. Additional Considerations

* Free-form text area for special instructions (texture, temperature, cultural/religious restrictions).
* Character limit of 500 characters for this text area.

### 5. Data Persistence

* No persistent storage is required for this challenge.

---

## User Experience & Design Notes

* The interface is designed to reduce cognitive load on stressed caregivers.
* Focus on empathy in design: clarity, easy navigation, accessible controls.
* Consistent branding and color schemes aligned with the provided screenshot.
* Responsive layout that works well on desktop and tablet devices.

---

## How to Run the Project

### Prerequisites

* **Node.js** (version 16 or later) installed on your machine.
* Optional: **Yarn** package manager (you can use npm instead).

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/arafatruetbd/elderly-meal-preferences.git
   ```
2. **Navigate to the project directory**

   ```bash
   cd elderly-meal-preferences
   ```
3. **Install dependencies**
   Using npm:

   ```bash
   npm install
   ```

   Or using yarn:

   ```bash
   yarn
   ```

### Running the Development Server

Start the development server locally:

Using npm:

```bash
npm run dev
```

Using yarn:

```bash
yarn dev
```

Open your browser and visit `http://localhost:5173` (or the port shown in the console).

### Building for Production

To create an optimized production build, run:

Using npm:

```bash
npm run build
```

Using yarn:

```bash
yarn build
```

The production-ready files will be generated in the `dist` folder.

### Previewing the Production Build

You can locally preview the production build with:

Using npm:

```bash
npm run preview
```

Using yarn:

```bash
yarn preview
```

