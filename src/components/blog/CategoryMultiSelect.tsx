'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { Category } from '@/types';
import { ChevronDown, X, Search } from 'lucide-react';

interface CategoryMultiSelectProps {
  categories: Category[];
  postCounts: Record<string, number>;
  selectedCategories: string[];
  onSelectionChange: (selected: string[]) => void;
}

export default function CategoryMultiSelect({
  categories,
  postCounts,
  selectedCategories,
  onSelectionChange
}: CategoryMultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter categories based on search
  const filteredCategories = useMemo(() => {
    if (!searchTerm.trim()) return categories;
    const lower = searchTerm.toLowerCase();
    return categories.filter(cat => 
      cat.name.toLowerCase().includes(lower)
    );
  }, [categories, searchTerm]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleCategory = (slug: string) => {
    if (selectedCategories.includes(slug)) {
      onSelectionChange(selectedCategories.filter(s => s !== slug));
    } else {
      onSelectionChange([...selectedCategories, slug]);
    }
  };

  const selectAll = () => {
    onSelectionChange(filteredCategories.map(cat => cat.slug));
  };

  const deselectAll = () => {
    onSelectionChange([]);
  };

  const totalPosts = useMemo(() => {
    if (selectedCategories.length === 0) return 0;
    return selectedCategories.reduce((sum, slug) => sum + (postCounts[slug] || 0), 0);
  }, [selectedCategories, postCounts]);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 text-left text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent cursor-pointer transition-all hover:border-gray-400"
      >
        <div className="flex items-center justify-between gap-2">
          <span className="flex-1 truncate text-sm">
            {selectedCategories.length === 0 ? (
              `All Categories (${Object.values(postCounts).reduce((a, b) => a + b, 0)})`
            ) : selectedCategories.length === 1 ? (
              <>
                {categories.find(cat => cat.slug === selectedCategories[0])?.name}
                <span className="text-gray-500 ml-1">
                  ({postCounts[selectedCategories[0]] || 0})
                </span>
              </>
            ) : (
              <>
                {selectedCategories.length} selected
                <span className="text-gray-500 ml-1">({totalPosts})</span>
              </>
            )}
          </span>
          <ChevronDown 
            className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} 
          />
        </div>
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-96 overflow-hidden">
          {/* Search Box */}
          <div className="p-3 border-b border-gray-200 bg-gray-50">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-8 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                onClick={(e) => e.stopPropagation()}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Select All / Deselect All */}
          <div className="px-3 py-2 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
            <div className="flex gap-2">
              <button
                onClick={selectAll}
                className="text-xs font-medium text-primary-600 hover:text-primary-700 transition-colors"
              >
                Select All
              </button>
              <span className="text-gray-300">|</span>
              <button
                onClick={deselectAll}
                className="text-xs font-medium text-gray-600 hover:text-gray-700 transition-colors"
              >
                Clear All
              </button>
            </div>
            {selectedCategories.length > 0 && (
              <span className="text-xs text-gray-500">
                {selectedCategories.length} selected
              </span>
            )}
          </div>

          {/* Category List */}
          <div className="max-h-64 overflow-y-auto">
            {filteredCategories.length === 0 ? (
              <div className="px-4 py-8 text-center text-gray-500">
                <p className="text-sm">No categories found</p>
                <p className="text-xs mt-1">Try a different search term</p>
              </div>
            ) : (
              filteredCategories.map((category) => {
                const isSelected = selectedCategories.includes(category.slug);
                const count = postCounts[category.slug] || 0;

                return (
                  <button
                    key={category.id}
                    onClick={() => toggleCategory(category.slug)}
                    className={`w-full px-4 py-2.5 flex items-center justify-between hover:bg-gray-50 transition-colors ${
                      isSelected ? 'bg-primary-50' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      {/* Checkbox */}
                      <div
                        className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all flex-shrink-0 relative ${
                          isSelected
                            ? 'bg-green-500 border-green-500'
                            : 'border-gray-400 bg-white'
                        }`}
                      >
                        {isSelected ? (
                          <span className="text-white text-base font-bold leading-none select-none">✓</span>
                        ) : null}
                      </div>
                      
                      {/* Category Name */}
                      <span className={`text-sm font-medium ${
                        isSelected ? 'text-primary-700' : 'text-gray-700'
                      }`}>
                        {category.name}
                      </span>
                    </div>

                    {/* Post Count */}
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      isSelected 
                        ? 'bg-primary-100 text-primary-700' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })
            )}
          </div>

          {/* Footer with Apply/Cancel */}
          <div className="px-3 py-3 border-t border-gray-200 bg-gray-50 flex items-center justify-between gap-2">
            <button
              onClick={() => {
                deselectAll();
                setIsOpen(false);
              }}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Reset
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-primary-500 rounded-md hover:bg-primary-600 transition-colors"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

