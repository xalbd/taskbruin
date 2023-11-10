"use client";

import { useTheme } from "next-themes";
import { useState } from "react";
import { Switch } from "@headlessui/react";

const ThemeButton = () => {
  const [enabled, setEnabled] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();

  const currentTheme = theme === "system" ? systemTheme : theme;

  const handleSwitchChange = () => {
    setTheme(currentTheme === "light" ? "dark" : "light");
    setEnabled(!enabled);
  };

  return (
    <Switch
      checked={enabled}
      onChange={handleSwitchChange}
      className={`${
        enabled ? "bg-gray-800" : "bg-gray-800"
      } relative inline-flex h-8 w-14 items-center rounded-full border border-gray-300 focus:outline-none`}
    >
      <span
        className={`${
          enabled ? "translate-x-8" : "translate-x-1"
        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
      />
    </Switch>
  );
};

export default ThemeButton;
