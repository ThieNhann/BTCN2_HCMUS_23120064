import { Moon, Sun, X } from 'lucide-react'; 

export function Header() {
  const [isDarkMode, setIsDarkMode] = React.useState(false); 
  
  return (
    <header className="bg-red-100 border-b border-red-300 p-2 flex justify-between items-center text-red-800">      
      <h1 className="text-lg font-bold">Movies info</h1>
      
      <div className="flex items-center space-x-2">
        <button 
          onClick={() => setIsDarkMode(prev => !prev)}
          className="p-1 rounded-full hover:bg-red-200 transition-colors"
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        <button className="p-1 rounded-full hover:bg-red-200 transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}