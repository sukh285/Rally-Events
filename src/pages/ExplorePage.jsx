import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Tabs from "../components/Tabs";
import ExploreContent from "../components/ExploreContent";
import MyEvents from "../components/MyEvents";
import Wishlist from "../components/Wishlist";

const ExplorePage = ({ activeTab: initialActiveTab }) => {
  const location = useLocation();

  const [activeTab, setActiveTab] = useState(() => {
    const tabFromState = location.state?.activeTab;
    if (tabFromState) {
      window.history.replaceState({}, document.title);
      return tabFromState;
    }
    return initialActiveTab || "explore";
  });

  const [confirmedCount, setConfirmedCount] = useState(0);

  // Update confirmed count whenever tab changes or localStorage updates
  useEffect(() => {
    const updateCount = () => {
      const stored = JSON.parse(localStorage.getItem("confirmedEvents")) || [];
      setConfirmedCount(stored.length);
    };

    // Listen for storage changes across tabs
    window.addEventListener("storage", (e) => {
      if (e.key === "confirmedEvents") updateCount();
    });

    updateCount();

    return () => {
      window.removeEventListener("storage", updateCount);
    };
  }, [activeTab]);

  return (
    <div className="flex flex-col h-full bg-sport-base-100">
      {/* Navbar */}
      <Navbar />

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pb-6">
        {activeTab === "explore" && <ExploreContent />}
        {activeTab === "wishlist" && <Wishlist />}
        {activeTab === "my-events" && <MyEvents />}
      </div>

      {/* Bottom Tabs */}
      <Tabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        confirmedCount={confirmedCount}
      />
    </div>
  );
};

export default ExplorePage;
