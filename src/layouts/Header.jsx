import React from 'react';
import { Moon, Sun} from 'lucide-react'; 
import { Switch } from "@/components/ui/switch";

export function Header() {
  const [isDarkMode, setIsDarkMode] = React.useState(false); 
  
  return (
    <header className="bg-red-100 border-b border-red-300 p-2 flex justify-between items-center text-red-800">      
      
      <p>23120064</p>

      <h1 className="text-lg font-bold">Movies info</h1>

      <div className="flex items-center space-x-2">
        <Switch
          onClick={() => setIsDarkMode(prev => !prev)}
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        />
        {!isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </div>
    </header>
  );
}