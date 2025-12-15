import React from 'react';
import { Search, Home } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Navigation() {
  return (
    <nav className="bg-blue-100 border-b border-blue-300 p-2 flex items-center justify-between shadow-md">
      <Button variant="ghost" className="p-2 h-auto text-blue-700 hover:bg-blue-200">
        <Home className="w-5 h-5 mr-2" />
      </Button>
      
      <div className="flex-grow flex justify-end">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input 
            type="text" 
            placeholder="Search" 
            className="h-8"
          />
          <Button 
            type="submit" 
            className="h-8 bg-blue-600 hover:bg-blue-700"
          >
            Search
          </Button>
        </div>
      </div>
    </nav>
  );
}