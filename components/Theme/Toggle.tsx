"use client";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { FiMonitor, FiMoon, FiSun } from "react-icons/fi";

const emptySubscribe = () => () => {};

const themeOptions = [
  { name: "light", label: "Light", icon: FiSun },
  { name: "system", label: "System", icon: FiMonitor },
  { name: "dark", label: "Dark", icon: FiMoon },
] as const;

const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  if (!mounted) return null;

  const activeTheme = theme ?? "system";

  return (
    <div className="inline-flex items-center rounded-full border border-slate-300 bg-slate-100 p-1 text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
      {themeOptions.map((option) => {
        const Icon = option.icon;
        const isActive = activeTheme === option.name;

        return (
          <button
            key={option.name}
            type="button"
            aria-label={option.label}
            aria-pressed={isActive}
            onClick={() => setTheme(option.name)}
            className={`flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200 cursor-pointer ${
              isActive
                ? "bg-white text-slate-900 shadow-md dark:bg-slate-700 dark:text-white"
                : "hover:bg-white/70 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
            }`}
          >
            <Icon size={14} />
          </button>
        );
      })}
    </div>
  );
};

export default ThemeToggle;
