"use client";

import React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useTheme } from "next-themes";

interface FilterMenuPriceProps {
  value: number[];
  setValue: (value: number[]) => void;
}

const FilterMenuPrice: React.FC<FilterMenuPriceProps> = ({
  value,
  setValue,
}) => {
  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const marks = nums.map((num) => ({ value: num, label: num.toString() }));
  const { theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex flex-row items-center">
      <h3 className="mr-5">Price: </h3>
      <Box sx={{ width: 300 }}>
        <Slider
          sx={{
            "& .MuiSlider-markLabel": {
              color: theme === "dark" ? "white" : "black",
            },
          }}
          min={1}
          max={10}
          getAriaLabel={() => "Price"}
          value={value}
          onChange={handleSliderChange}
          valueLabelDisplay="off"
          marks={marks}
          className=""
        />
      </Box>
    </div>
  );
};

export default FilterMenuPrice;
