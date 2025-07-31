import FavoriteFoods from "./components/FavoriteFoods";
import DislikedFoods from "./components/DislikedFoods";
import Allergies from "./components/Allergies";
import AdditionalConsiderations from "./components/AdditionalConsiderations";

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-10 sm:p-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-12 text-center tracking-tight">
          Elderly Meal Preferences
        </h1>

        {/* Sections Wrapper */}
        <section className="space-y-4">
          <div className="section-wrapper">
            <FavoriteFoods />
          </div>

          <div className="section-wrapper">
            <DislikedFoods />
          </div>

          <div className="section-wrapper">
            <Allergies />
          </div>

          <div className="section-wrapper">
            <AdditionalConsiderations />
          </div>
        </section>
      </div>
    </div>
  );
};

export default App;
