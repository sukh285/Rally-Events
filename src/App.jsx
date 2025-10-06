import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NotificationBar } from "./components/NotificationBar";
import ExplorePage from "./pages/ExplorePage";
import EventDetails from "./pages/EventDetails";
import Checkout from "./pages/Checkout";

const App = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50">
      <Router>
        <div className="max-w-sm w-full h-[95vh] bg-sport-base-300 shadow-2xl border-2 border-gray-400 rounded-[1rem] overflow-hidden flex flex-col">
          <NotificationBar />
          <div className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<ExplorePage />} />
              <Route path="/event/:id" element={<EventDetails />} />
              <Route path="/checkout/:id" element={<Checkout />} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
