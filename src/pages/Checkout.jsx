import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { events } from "../data/events";
import { ArrowLeft, Calendar, MapPin, CheckCircle } from "lucide-react";
import confetti from "canvas-confetti";

const Checkout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const event = events.find((e) => e.id === parseInt(id));
  const [isConfirmed, setIsConfirmed] = useState(false);

  if (!event) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-screen text-sport-text-secondary">
        <span className="text-2xl font-bold mb-2">😕</span>
        <span className="text-lg font-semibold">Event not found</span>
        <button
          className="mt-6 px-4 py-2 rounded-lg bg-sport-primary text-sport-primary-content font-medium shadow"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );
  }

  const sessionIndex = state?.sessionIndex ?? null;
  const sessionTime = sessionIndex !== null ? event.dates[sessionIndex] : null;

  const handleConfirm = () => {
    setIsConfirmed(true);

    // Save confirmed event
    const confirmedEvents =
      JSON.parse(localStorage.getItem("confirmedEvents")) || [];
    const alreadyExists = confirmedEvents.some(
      (e) => e.id === event.id && e.sessionTime === sessionTime
    );

    if (!alreadyExists) {
      confirmedEvents.push({
        id: event.id,
        name: event.name,
        image: event.image,
        location: event.location,
        sport: event.sport,
        sessionTime,
      });
      localStorage.setItem("confirmedEvents", JSON.stringify(confirmedEvents));
    }

    // Confetti burst
    setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { x: 0.2, y: 0.7 },
        colors: ["#FCB53B", "#FFD47A", "#FCE697"],
      });
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { x: 0.8, y: 0.7 },
        colors: ["#FCB53B", "#FFD47A", "#FCE697"],
      });
    }, 200);

    // Redirect to ExplorePage with activeTab="my-events"
    navigate("/", { state: { activeTab: "my-events" } });
  };

  return (
    <div className="bg-sport-base-100 min-h-screen flex flex-col text-sport-text relative">
      {/* Hero Image */}
      <div className="relative w-full">
        <img
          src={event.image}
          alt={event.name}
          className="w-full h-56 sm:h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-sport-base-100/90 via-sport-base-100/40 to-transparent" />
      </div>

      {/* Floating Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 z-30 flex items-center gap-1 px-3 py-1.5 bg-sport-text/50 hover:bg-sport-text/70 text-sport-base-100 rounded-full text-sm font-semibold backdrop-blur-md transition-all"
      >
        <ArrowLeft size={16} />
        Back
      </button>

      <div className="px-5 -mt-1 z-10 relative">
        <div className="bg-sport-base-100 rounded-2xl shadow-lg p-5 border border-sport-base-200">
          {/* Badge Row */}
          <div className="flex items-center gap-2 mb-1">
            <span
              className="inline-block px-2 py-0.5 rounded-full border border-sport-primary-focus/30 text-sport-primary text-xs font-semibold uppercase tracking-wide
                bg-gradient-to-b from-sport-primary/15 to-sport-primary/5 shadow-inner shadow-sport-primary/25"
            >
              {event.sport}
            </span>
            <span
              className="inline-block px-2 py-0.5 border border-sport-text-secondary/10 rounded-full text-sport-text-secondary text-xs font-medium
                bg-gradient-to-b from-sport-text-secondary/15 to-sport-base-100 shadow-inner shadow-sport-base-400/30"
            >
              {event.type}
            </span>
          </div>
          {/* Name */}
          <h1 className="text-xl font-bold text-sport-text mb-1 leading-tight">
            {event.name}
          </h1>
          {/* Location */}
          <div className="flex items-center text-sport-text-secondary text-[15px] font-medium mb-1.5">
            <MapPin size={15} className="mr-1.5 text-sport-primary" />
            <span className="truncate">{event.location}</span>
          </div>
          {/* Session */}
          {sessionTime && (
            <div className="flex items-center text-sport-text-secondary text-[15px] font-medium mb-1.5">
              <Calendar size={15} className="mr-1.5 text-sport-primary" />
              <span className="truncate">{sessionTime}</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center px-5">
        {!isConfirmed ? (
          <div className="flex flex-col gap-6 mt-2">
            {/* Cost Section */}
            <div className="flex items-center justify-between bg-gradient-to-r from-sport-primary/10 via-sport-base-200 to-sport-primary/5 rounded-xl px-5 py-4 shadow border border-sport-base-200">
              <div className="flex flex-col">
                <span className="text-xs text-sport-text-secondary font-medium uppercase tracking-wider mb-1">
                  Entry Fee
                </span>
                <span className="text-2xl font-bold text-sport-text">₹499</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs text-sport-text-secondary font-medium uppercase tracking-wider mb-1">
                  Session
                </span>
                <span className="text-sm font-semibold text-sport-primary">
                  {sessionTime || "—"}
                </span>
              </div>
            </div>

            {/* Confirm Button */}
            <button
              onClick={handleConfirm}
              className="w-full py-3 rounded-xl font-semibold text-lg bg-gradient-to-r from-sport-primary to-yellow-400 text-sport-primary-content shadow-lg hover:scale-[1.02] hover:shadow-xl transition-all duration-150"
              style={{
                boxShadow:
                  "0 4px 16px 0 rgba(252,181,59,0.10), 0 1.5px 4px 0 rgba(0,0,0,0.04)",
              }}
            >
              Confirm & Join Event
            </button>
            <div className="flex flex-col items-center mt-2">
              <span className="text-xs text-sport-text-secondary">
                By confirming, you agree to the event’s terms and conditions.
              </span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center flex-1 text-center mt-2">
            <CheckCircle
              size={50}
              className="text-sport-success mb-4 drop-shadow-lg"
            />
            <h2 className="text-3xl font-bold mb-2 text-sport-text">
              You’re In!
            </h2>
            <p className="text-sport-text-secondary mb-6 text-base">
              You’ve successfully joined <br /> <b>{event.name}</b>
              {sessionTime && (
                <>
                  <br />
                  <span className="text-xs font-medium">
                    Session:{" "}
                    <span className="text-sport-primary">{sessionTime}</span>
                  </span>
                </>
              )}
            </p>
            <button
              onClick={() => navigate("/")}
              className="px-7 py-3 rounded-xl bg-gradient-to-r from-sport-primary to-yellow-400 text-sport-primary-content font-semibold text-base shadow-lg hover:scale-[1.03] hover:shadow-xl transition-all duration-150"
              style={{
                boxShadow:
                  "0 4px 16px 0 rgba(252,181,59,0.10), 0 1.5px 4px 0 rgba(0,0,0,0.04)",
              }}
            >
              Back to Explore
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
