"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-800"
    >
      {resolvedTheme === "dark" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
};

export default ThemeToggle;
