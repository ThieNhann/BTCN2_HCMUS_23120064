import React, { useState } from 'react';
import { Home, Search, ChevronDown } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from 'react-router-dom';

export function Navigation() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('q'); // State lưu loại tìm kiếm (q hoặc person)
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchTerm.trim()) {
      // Nếu type='q' -> /search?q=keyword
      // Nếu type='person' -> /search?person=keyword
      navigate(`/search?${searchType}=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <nav className="bg-blue-100 dark:bg-blue-900 border border-blue-300 p-2 flex items-center justify-between shadow-md sticky top-0 z-50">
      
      <Link to="/">  
        <Button variant="ghost" className="py-3 h-auto text-blue-700 hover:bg-blue-300">
          <Home className="w-6 h-6"/>
        </Button>
      </Link>

      <div className="flex-grow flex justify-end">
        <form onSubmit={handleSearch} className="flex w-full max-w-lg items-center space-x-2">
          
          <div className="relative">
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="h-8 pl-2 pr-8 bg-white dark:bg-gray-700 border border-blue-700 dark:border-blue-400 text-sm rounded-md focus:outline-none appearance-none cursor-pointer"
            >
              <option value="q">Tất cả</option>
              <option value="person">Người (Actor/Director)</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none opacity-50" />
          </div>

          <Input 
            type="text" 
            placeholder={searchType === 'person' ? "Nhập tên diễn viên, đạo diễn..." : "Tìm kiếm phim..."}
            className="h-8 bg-white dark:bg-gray-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button 
            type="submit" 
            className="h-8 bg-inherit hover:bg-inherit hover:opacity-50 border border-blue-700 dark:border-blue-400 text-blue-700 dark:text-blue-100"
          >
            <Search size={16} className="mr-1" /> Tìm
          </Button>
        </form>
      </div>
    </nav>
  );
}