import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Carousel = ({ items, autoScrollInterval = 3000, itemWidth = 140 }) => {
  const containerRef = useRef(null);
  const [isUserInteracting, setIsUserInteracting] = useState(false);

  // Auto-scroll effect
  useEffect(() => {
    if (!items || items.length === 0) return;
    if (isUserInteracting) return;

    const container = containerRef.current;
    let scrollAmount = 0;

    const scrollStep = () => {
      if (!container) return;

      scrollAmount += itemWidth + 16; // 16px gap between cards
      if (scrollAmount >= container.scrollWidth) {
        scrollAmount = 0; // loop back to start
      }
      container.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    };

    const interval = setInterval(scrollStep, autoScrollInterval);
    return () => clearInterval(interval);
  }, [items, isUserInteracting, autoScrollInterval, itemWidth]);

  // Resume auto-scroll after user stops interacting
  const handleUserInteraction = () => {
    setIsUserInteracting(true);
    if (containerRef.current) {
      clearTimeout(containerRef.current._resumeTimeout);
      containerRef.current._resumeTimeout = setTimeout(() => {
        setIsUserInteracting(false);
      }, 4000); // resume after 4s
    }
  };

  return (
    <div
      ref={containerRef}
      className="flex overflow-x-auto gap-3 py-2 px-2 scrollbar-hide"
      onMouseDown={handleUserInteraction}
      onTouchStart={handleUserInteraction}
    >
      {items.map((event) => (
        <Link to={`/event/${event.id}`} key={event.id}>
          <div
            key={event.id}
            className="flex-shrink-0 w-[140px] rounded-lg shadow bg-sport-base-100 cursor-pointer"
          >
            <img
              src={event.image}
              alt={event.name}
              className="w-full h-20 object-cover rounded-t-lg"
            />
            <div className="p-2">
              <h3 className="font-semibold text-sport-text text-xs truncate">
                {event.name}
              </h3>
              <p className="text-[10px] text-sport-text-secondary">
                {event.sport}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Carousel;
