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
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex flex-row items-center mb-1">
      <h3 className="mr-5">Categories: </h3>
      {categories &&
        categories.map((category) => (
          <button
            key={category.id}
            className={`mr-3 text-sm px-4 py-2 rounded-full ${
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
