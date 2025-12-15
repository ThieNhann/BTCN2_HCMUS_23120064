import React from 'react';
import { Search, Home } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

export function Navigation() {
  return (
    <nav className="bg-blue-100 dark:bg-blue-900 border border-blue-300 p-2 flex items-center justify-between shadow-md">

      
      <Link to="/">  
        <Button variant="ghost" className="py-3 h-auto text-blue-700 hover:bg-blue-300">
          <Home className="w-6 h-6"/>
        </Button>
      </Link>

      <div className="flex-grow flex justify-end">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input 
            type="text" 
            placeholder="Search" 
            className="h-8 bg-white dark:bg-gray-700"
          />
          <Button 
            type="submit" 
            className="h-8 bg-inherit hover:bg-inherit hover:opacity-50 hover:z-5 border border-blue-700 dark:border-blue-400 text-blue-700 dark:text-blue-100"
          >
            Search
          </Button>
        </div>
      </div>
    </nav>
  );
}