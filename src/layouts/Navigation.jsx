import React, { useState } from 'react';
import { Home } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from 'react-router-dom';

export function Navigation() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      
    }
  };

  return (
    <nav className="bg-blue-100 dark:bg-blue-900 border border-blue-300 p-2 flex items-center justify-between shadow-md">
      
      <Link to="/">  
        <Button variant="ghost" className="py-3 h-auto text-blue-700 hover:bg-blue-300">
          <Home className="w-6 h-6"/>
        </Button>
      </Link>

      <div className="flex-grow flex justify-end">
        <form onSubmit={handleSearch} className="flex w-full max-w-sm items-center space-x-2">
          <Input 
            type="text" 
            placeholder="Search movies..." 
            className="h-8 bg-white dark:bg-gray-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button 
            type="submit" 
            className="h-8 bg-inherit hover:bg-inherit hover:opacity-50 border border-blue-700 dark:border-blue-400 text-blue-700 dark:text-blue-100"
          >
            Search
          </Button>
        </form>
      </div>
    </nav>
  );
}