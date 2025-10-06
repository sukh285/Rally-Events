import { Home, Heart, Calendar } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const Tabs = ({ activeTab, setActiveTab, confirmedCount = 0 }) => {
  const [wishlistCount, setWishlistCount] = useState(0);
  const intervalRef = useRef(null);

  // Update wishlist count (cross-tab + in-tab)
  useEffect(() => {
    const updateWishlistCount = () => {
      const stored = JSON.parse(localStorage.getItem("wishlistEvents")) || [];
      setWishlistCount(stored.length);
    };

    const handleStorage = (e) => {
      if (e.key === "wishlistEvents") updateWishlistCount();
    };

    window.addEventListener("storage", handleStorage);
    intervalRef.current = setInterval(updateWishlistCount, 500);
    updateWishlistCount();

    return () => {
      window.removeEventListener("storage", handleStorage);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const tabs = [
    { id: "explore", label: "Explore", icon: Home },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "my-events", label: "My Events", icon: Calendar },
  ];

  const tabBase =
    "relative flex-1 flex flex-col py-1 items-center justify-center text-xs font-medium transition-all duration-300 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-sport-primary";
  const activeText = "text-sport-primary font-semibold";
  const inactiveText = "text-sport-text-secondary hover:text-sport-primary";

  return (
    <div className="flex justify-around items-center h-16 bg-sport-base-100 border-t border-sport-base-200 shadow-md sticky bottom-0 z-50">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        // Active / inactive styles with shadows
        let btnClasses = `${tabBase} ${
          isActive
            ? tab.id === "explore"
              ? "bg-sport-primary text-sport-primary-content shadow-[0_3px_8px_rgba(252,181,59,0.4)]"
              : "bg-sport-base-200 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.1),inset_-1px_-1px_3px_rgba(255,255,255,0.6)] text-sport-primary font-semibold"
            : `${inactiveText} hover:bg-sport-base-200 hover:shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)]`
        }`;

        // Badge count
        const showBadge =
          (tab.id === "wishlist" && wishlistCount > 0) ||
          (tab.id === "my-events" && confirmedCount > 0);
        const badgeCount =
          tab.id === "wishlist"
            ? wishlistCount
            : tab.id === "my-events"
            ? confirmedCount
            : 0;

        const badgeClasses =
          tab.id === "wishlist"
            ? "absolute -top-1 -right-2 bg-sport-base-200 text-sport-text-secondary text-[10px] font-semibold rounded-full px-1.5 py-0.5 shadow-sm"
            : "absolute -top-1 -right-2 bg-sport-primary text-sport-primary-content text-[10px] font-semibold rounded-full px-1.5 py-0.5 shadow-md";

        return (
          <button
            key={tab.id}
            className={btnClasses}
            onClick={() => setActiveTab(tab.id)}
            aria-pressed={isActive}
          >
            <div className="relative">
              <Icon size={20} />
              {showBadge && <span className={badgeClasses}>{badgeCount}</span>}
            </div>
            <span className="mt-1 text-xs">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
