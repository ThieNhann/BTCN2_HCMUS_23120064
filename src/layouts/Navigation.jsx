import React, { useState } from 'react';
import { Home, Search, ChevronDown, LogIn, LogOut, User } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext'; // Import hook Auth

export function Navigation() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('q');
  const navigate = useNavigate();
  
  // Lấy state và hàm logout từ AuthContext
  const { user, isAuthenticated, logout } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?${searchType}=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-100 dark:bg-blue-900 border-b border-blue-300 p-3 flex items-center justify-between shadow-md sticky top-0 z-50">
      
      <div className="flex items-center gap-4">
        <Link to="/">  
          <Button variant="ghost" className="p-2 h-auto text-blue-700 hover:bg-blue-200 rounded-full">
            <Home className="w-6 h-6"/>
          </Button>
        </Link>
      </div>

      <div className="flex-1 max-w-2xl mx-4">
        <form onSubmit={handleSearch} className="flex w-full items-center space-x-2">
           <div className="relative">
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="h-9 pl-2 pr-8 bg-white dark:bg-gray-700 border border-blue-500 text-sm rounded-md focus:outline-none cursor-pointer"
            >
              <option value="q">Tất cả</option>
              <option value="person">Nghệ sĩ</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none opacity-50" />
          </div>

          <Input 
            type="text" 
            placeholder={searchType === 'person' ? "Tìm nghệ sĩ..." : "Tìm phim..."}
            className="h-9 bg-white dark:bg-gray-700 flex-1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button type="submit" className="h-9 bg-blue-600 hover:bg-blue-700 text-white border-none">
            <Search size={16} />
          </Button>
        </form>
      </div>

      {/* USER AUTH */}
      <div className="flex items-center gap-3">
        {isAuthenticated ? (
          <>
            <div className="flex items-center gap-2 text-blue-900 dark:text-blue-100 font-medium">
               <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold uppercase">
                 {user?.username?.charAt(0) || "U"}
               </div>
               <span className="hidden md:block truncate max-w-[100px]">{user?.username}</span>
            </div>
            <Button 
              onClick={handleLogout} 
              variant="destructive" 
              className="h-9 px-3 text-xs md:text-sm bg-red-600 hover:bg-red-700"
            >
              <LogOut size={16} className="md:mr-1" /> <span className="hidden md:inline">Logout</span>
            </Button>
          </>
        ) : (
          <div className="flex gap-2">
            <Link to="/login">
              <Button variant="outline" className="h-9 border-blue-600 text-blue-700 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-100 dark:hover:bg-blue-800">
                <LogIn size={16} className="md:mr-1" /> <span className="hidden md:inline">Login</span>
              </Button>
            </Link>
            <Link to="/register">
              <Button className="h-9 bg-blue-600 hover:bg-blue-700 text-white">
                Register
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}