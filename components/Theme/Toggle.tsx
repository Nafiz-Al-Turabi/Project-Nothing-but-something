"use client";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

const ThemeToggle = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

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
