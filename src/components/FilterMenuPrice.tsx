import React from "react";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

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

  return (
    <div>
        <Box sx={{ width: 300 }}>
            <Slider
                min={1}
                max={10}
                getAriaLabel={() => 'Price'}
                value={value}
                onChange={handleSliderChange}
                valueLabelDisplay="auto"
            />
        </Box>
    </div>
    
  );
};

export default FilterMenuPrice;
