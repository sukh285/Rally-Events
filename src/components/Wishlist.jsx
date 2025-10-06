import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { events } from "../data/events";
import { BookmarkCheck } from "lucide-react";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [pendingRemoval, setPendingRemoval] = useState({}); // { [eventId]: timeoutId }

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("wishlistEvents")) || [];
    setWishlist(stored);
  }, []);

  const removeFromWishlist = (eventId) => {
    if (pendingRemoval[eventId]) {
      // If clicked again during the timer, cancel removal
      clearTimeout(pendingRemoval[eventId]);
      setPendingRemoval((prev) => {
        const copy = { ...prev };
        delete copy[eventId];
        return copy;
      });
      return;
    }

    // Start 5-second timer to remove event
    const timeoutId = setTimeout(() => {
      const updated = wishlist.filter((id) => id !== eventId);
      setWishlist(updated);
      localStorage.setItem("wishlistEvents", JSON.stringify(updated));
      setPendingRemoval((prev) => {
        const copy = { ...prev };
        delete copy[eventId];
        return copy;
      });
    }, 5000);

    setPendingRemoval((prev) => ({ ...prev, [eventId]: timeoutId }));
  };

  // Filter events that are wishlisted
  const wishlistedEvents = events.filter((event) => wishlist.includes(event.id));

  if (wishlistedEvents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-sport-text-secondary">
        <span className="text-lg font-semibold mb-2">No wishlisted events</span>
        <span className="text-sm">Add events to your wishlist ❤️</span>
      </div>
    );
  }

  return (
    <div className="p-3">
      {/* Heading with fading divider */}
      <div className="flex items-center mb-6 mt-2">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-sport-text-secondary to-transparent" />
        <span className="mx-4 text-xs font-medium text-sport-text-secondary uppercase tracking-wider">
          your wishlist
        </span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-sport-text-secondary to-transparent" />
      </div>
      <div className="grid gap-3">
        {wishlistedEvents.map((event) => {
          const isPending = !!pendingRemoval[event.id];

          return (
            <Link key={event.id} to={`/event/${event.id}`}>
              <div className="relative flex items-center gap-3 p-3 rounded-xl bg-sport-base-100 shadow-md hover:shadow-lg transition-transform hover:-translate-y-1 group overflow-hidden">
                {/* Event Image */}
                <div className="flex-shrink-0 relative">
                  <img
                    src={event.image}
                    alt={event.name}
                    className="w-16 h-16 object-cover rounded-lg border border-sport-base-200 shadow-sm group-hover:scale-105 transition-transform"
                  />
                </div>

                {/* Event Info */}
                <div className="flex flex-col flex-1 overflow-hidden">
                  <h2 className="font-semibold text-sport-text text-sm truncate">
                    {event.name}
                  </h2>
                  <span className="text-xs text-sport-text-secondary truncate">
                    {event.location}
                  </span>
                  {event.dates && event.dates.length > 0 && (
                    <span className="text-xs font-medium text-sport-primary truncate mt-0.5">
                      {event.dates.join(", ")}
                    </span>
                  )}
                </div>

                {/* Remove from wishlist button */}
                <button
                  className={`absolute top-2 right-2 p-1 rounded-full shadow-sm transition-transform ${
                    isPending ? "bg-red-100" : "bg-white/80 hover:scale-95"
                  }`}
                  onClick={(e) => {
                    e.preventDefault(); // prevent navigation
                    removeFromWishlist(event.id);
                  }}
                >
                  <BookmarkCheck
                    size={16}
                    className={`text-sport-primary ${isPending ? "opacity-50" : ""}`}
                  />
                </button>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Wishlist;
