import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import LightThemeIcon from "~/components/svg/LightThemeIcon";
import DarkThemeIcon from "~/components/svg/DarkThemeIcon";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const [checkboxActive, setCheckboxActive] = useState(false);
  const { theme, setTheme } = useTheme();

  const handleClick = () => {
    setCheckboxActive(!checkboxActive);
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    setMounted(true);

    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      localStorage.setItem("theme", "light");
    }
  }, [setTheme]);

  if (!mounted) return null;

  return (
    <div className="mx-3 flex items-center justify-center gap-6 rounded-lg bg-violet-50 py-3.5 dark:bg-zinc">
      <LightThemeIcon
        className={`duration-150 ease-in-out ${
          theme === "light" ? "fill-yellow" : "fill-slate"
        }`}
      />
      <div className="relative">
        <input
          type="checkbox"
          id="toggle"
          className="checkbox hidden"
          onClick={() => handleClick()}
          checked={theme === "dark"}
          readOnly
        />
        <label
          htmlFor="toggle"
          className="theme-label relative flex h-5 w-10 cursor-pointer rounded-full border border-violet-700 bg-violet-700 transition hover:bg-violet-400"
        />
      </div>
      <DarkThemeIcon
        className={`duration-150 ease-in-out ${
          theme === "dark" ? "fill-blue" : "fill-slate"
        }`}
      />
    </div>
  );
};

export default ThemeSwitcher;
