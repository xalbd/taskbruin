import React from "react";

interface FilterMenuProps {
  selectedCategories: number[];
  setSelectedCategories: (selectedCategories: number[]) => void;
}

const categories = [
  "Laundry",
  "Food Delivery",
  "Scooter Rental",
  "Apartment Listings",
  "Other",
];

const FilterMenu: React.FC<FilterMenuProps> = ({
  selectedCategories,
  setSelectedCategories,
}) => {
  const handleCategoryClick = (index: number) => {
    const isSelected = selectedCategories.includes(index);

    if (isSelected) {
      setSelectedCategories(
        selectedCategories.filter((selectedIndex) => selectedIndex !== index),
      );
    } else {
      setSelectedCategories([...selectedCategories, index]);
    }
  };

  return (
    <div>
      {categories &&
        categories.map((category, index) => (
          <button
            key={index}
            className={`mr-3 mb-2 text-sm px-4 py-2 rounded-full ${
              selectedCategories.includes(index)
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
