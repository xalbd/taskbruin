import React from "react";

interface FilterMenuProps {
  categories: Array<{ id: number; name: string }>;
  selectedCategories: number[];
  setSelectedCategories: (selectedCategories: number[]) => void;
}

const FilterMenu: React.FC<FilterMenuProps> = ({
  categories,
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
        categories.map((category) => (
          <button
            key={category.id}
            className={`mr-3 mb-2 text-sm px-4 py-2 rounded-full ${
              selectedCategories.includes(category.id)
                ? "border border-blue-500 text-blue-500"
                : "border border-gray-400"
            }`}
            onClick={() => handleCategoryClick(category.id)}
          >
            {category.name}
          </button>
        ))}
    </div>
  );
};

export default FilterMenu;
