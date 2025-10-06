import React from "react";
import { LucideSearch, SlidersHorizontal } from "lucide-react";

const SearchTab = ({ searchText, setSearchText, onFilterClick }) => {
  return (
    <div className="flex items-center px-3 py-2 bg-sport-base-100 gap-2 rounded-lg shadow-[0_2px_5px_rgba(0,0,0,0.1)]">
      {/* Search Bar */}
      <div className="flex items-center flex-1 bg-sport-base-200 rounded-md px-2 py-1 shadow-inner transition-shadow duration-200">
        <LucideSearch className="w-4 h-4 text-sport-text-secondary mr-1" />
        <input
          type="text"
          placeholder="Search events..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="flex-1 bg-transparent outline-none text-sport-text placeholder:text-sport-text-secondary text-xs"
        />
      </div>

      {/* Filter Button */}
      <button
        onClick={onFilterClick}
        className="flex items-center justify-center w-7 h-7 bg-sport-primary-focus text-sport-text rounded-md shadow-md hover:shadow-lg transition-all duration-200"
      >
        <SlidersHorizontal className="w-4 h-4" />
      </button>
    </div>
  );
};

export default SearchTab;
