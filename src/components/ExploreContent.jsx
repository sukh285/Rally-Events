import React, { useState, useEffect } from "react";
import SearchTab from "../components/SearchTab";
import { events } from "../data/events";
import Carousel from "../components/Carousel";
import FilterModal from "../components/FilterModal";
import { Link } from "react-router-dom";
import { Bookmark, BookmarkCheck, Loader2 } from "lucide-react";

const Loader = () => (
  <div className="flex flex-col items-center justify-center min-h-[50vh]">
    <div className="mb-4">
      <Loader2 className="animate-spin text-sport-primary" size={40} />
    </div>
    <span className="text-sport-text font-semibold text-lg mb-1">
      Finding the best events for you...
    </span>
    <span className="text-sport-text-secondary text-sm">
      Hang tight, loading events!
    </span>
  </div>
);

const ExploreContent = () => {
  const [searchText, setSearchText] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({});
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("wishlistEvents")) || [];
    setWishlist(stored);
  }, []);

  // Loader effect when searchText or appliedFilters change
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1200); // 1.2 seconds for snappier UX
    return () => clearTimeout(timer);
  }, [searchText, appliedFilters]);

  // Toggle wishlist and persist in localStorage
  const toggleWishlist = (eventId) => {
    const updated = wishlist.includes(eventId)
      ? wishlist.filter((id) => id !== eventId)
      : [...wishlist, eventId];

    setWishlist(updated);
    localStorage.setItem("wishlistEvents", JSON.stringify(updated));
  };

  const isWishlisted = (eventId) => wishlist.includes(eventId);

  const handleFilterClick = () => setIsFilterOpen(true);

  const handleApplyFilters = (filters) => {
    setAppliedFilters(filters);
  };

  // Filter events based on search text + applied filters
  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.name
      .toLowerCase()
      .includes(searchText.toLowerCase());

    const matchesSport =
      !appliedFilters.sports || appliedFilters.sports.length === 0
        ? true
        : appliedFilters.sports.includes(event.sport);

    const matchesType =
      !appliedFilters.eventTypes || appliedFilters.eventTypes.length === 0
        ? true
        : appliedFilters.eventTypes.includes(event.type);

    return matchesSearch && matchesSport && matchesType;
  });

  const hotEvents = React.useMemo(() => {
    return events.length <= 5
      ? events
      : [...events].sort(() => 0.5 - Math.random()).slice(0, 5);
  }, []); // empty dependency array ensures it only runs once

  return (
    <div className="px-4 py-2 bg-sport-base-100">
      {/* Hot Events Section */}
      <div className="mt-4">
        <h2 className="text-sport-text font-semibold text-sm mb-2">
          🔥 Popular This Week
        </h2>
        <Carousel items={hotEvents} itemWidth={160} />
      </div>

      <div className="flex items-center my-6">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-sport-text-secondary to-transparent" />
        <span className="mx-4 text-xs font-medium text-sport-text-secondary uppercase tracking-wider">
          all events
        </span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-sport-text-secondary to-transparent" />
      </div>

      {/* Search Tab */}
      <SearchTab
        searchText={searchText}
        setSearchText={setSearchText}
        onFilterClick={handleFilterClick}
      />

      {/* Vertical Event List or Loader */}
      {loading ? (
        <Loader />
      ) : (
        <div className="mt-6 flex flex-col gap-4">
          {filteredEvents.map((event) => (
            <Link to={`/event/${event.id}`} key={event.id}>
              <div className="relative rounded-xl shadow-md bg-sport-base-100 cursor-pointer overflow-hidden group">
                {/* Event Image */}
                <img
                  src={event.image}
                  alt={event.name}
                  className="w-full h-40 object-cover transition-transform group-hover:scale-105"
                />

                {/* Wishlist Button */}
                <button
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full p-1 shadow-md transition-transform active:scale-90 z-20"
                  onClick={(e) => {
                    e.preventDefault(); // Prevent navigation
                    toggleWishlist(event.id);
                  }}
                >
                  {isWishlisted(event.id) ? (
                    <BookmarkCheck size={18} className="text-sport-primary" />
                  ) : (
                    <Bookmark size={18} className="text-sport-text-secondary" />
                  )}
                </button>

                {/* Sport Badge */}
                <span
                  className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-semibold shadow-md
                     bg-sport-primary text-sport-primary-content z-20"
                >
                  {event.sport}
                </span>

                {/* Event Info */}
                <div className="p-3">
                  <h3 className="font-semibold text-sport-text text-sm truncate">
                    {event.name}
                  </h3>
                  <p className="text-xs text-sport-text-secondary mt-1 truncate">
                    {event.location}
                  </p>
                  <p className="text-xs text-sport-text-secondary mt-1 truncate">
                    {event.dates.join(", ")}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        applyFilters={handleApplyFilters}
      />
    </div>
  );
};

export default ExploreContent;
