import React from 'react';
import { Moon, Sun} from 'lucide-react'; 
import { Switch } from "@/components/ui/switch";
import { useTheme } from '@/context/ThemeContext';

export function Header() {
  const {isDarkMode, toggleTheme} = useTheme();
  
  return (
    <header className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-600 p-2 flex justify-between items-center text-red-900 dark:text-red-200">      
      
      <p>23120064</p>

      <h1 className="text-lg font-bold">Movies info</h1>

      <div className="flex items-center space-x-2">
        <Switch
          onCheckedChange={toggleTheme}
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        />
        {!isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </div>
    </header>
  );
}