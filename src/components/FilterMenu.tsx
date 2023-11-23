import React from "react";

interface FilterMenuProps {
  selectedCategory: number | null;
  setSelectedCategory: (selectedCategory: number | null) => void;
}

const categories = [
  "Laundry",
  "Food Delivery",
  "Scooter Rental",
  "Apartment Listings",
  "Other",
];

const FilterMenu: React.FC<FilterMenuProps> = ({
  selectedCategory,
  setSelectedCategory,
}) => {
  const handleCategoryClick = (index: number) => {
    const isSelected = selectedCategory === index;

    if (isSelected) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(index);
    }
  };

  return (
    <div>
      {categories &&
        categories.map((category, index) => (
          <button
            key={index}
            className={`mr-3 mb-2 text-sm px-4 py-2 rounded-full ${
              selectedCategory === index
                ? "border border-blue-500 text-blue-500"
                : "border border-gray-400"
            }`}
            onClick={() => handleCategoryClick(index)}
          >
            {category}
          </button>
        ))}
    </div>
  );
};

export default FilterMenu;
