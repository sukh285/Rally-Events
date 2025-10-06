import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, MapPin, CheckCircle } from "lucide-react";
import { events } from "../data/events";

const MyEvents = () => {
  const [myEvents, setMyEvents] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("confirmedEvents")) || [];

    const parseSessionTime = (session) => {
      const [monthDay, time] = session.split(" - ");
      const currentYear = new Date().getFullYear();
      return new Date(`${monthDay} ${currentYear} ${time}`);
    };

    // Merge stored event IDs with full event data
    const merged = stored
      .map((ce) => {
        const fullEvent = events.find((e) => e.id === ce.id);
        if (!fullEvent) return null;
        return { ...ce, ...fullEvent }; // combine sessionTime with full event details
      })
      .filter(Boolean);

    const sorted = [...merged].sort(
      (a, b) => parseSessionTime(a.sessionTime) - parseSessionTime(b.sessionTime)
    );

    setMyEvents(sorted);
  }, []);

  if (myEvents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-sport-text-secondary">
        <CheckCircle size={48} className="mb-3 text-sport-base-300" />
        <span className="text-lg font-bold mb-1">No confirmed events yet</span>
        <span className="text-sm">Confirm an event to see it here</span>
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* Heading with fading divider */}
      <div className="flex items-center mb-6 mt-2">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-sport-text-secondary to-transparent" />
        <span className="mx-4 text-xs font-medium text-sport-text-secondary uppercase tracking-wider">
          confirmed events
        </span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-sport-text-secondary to-transparent" />
      </div>
      <div className="grid gap-3">
        {myEvents.map((event, i) => (
          <Link
            key={i}
            to={`/event/${event.id}`}
            state={{ sessionIndex: null }}
            className="group"
          >
            <div className="flex items-center gap-4 p-4 rounded-xl border border-sport-base-200 shadow bg-gradient-to-br from-sport-base-100 via-sport-base-200/80 to-sport-base-100 hover:shadow-lg transition relative overflow-hidden">
              {/* Accent bar */}
              <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-sport-primary to-yellow-400 rounded-l-xl opacity-80 group-hover:opacity-100 transition" />

              {/* Event Image */}
              <img
                src={event.image}
                alt={event.name}
                className="w-20 h-20 object-cover rounded-lg border-2 border-sport-base-200 shadow-sm group-hover:scale-105 transition"
              />

              {/* Event Info */}
              <div className="flex flex-col flex-1 z-10">
                <div className="flex items-center gap-2 mb-1">
                  {event.sessionTime && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-sport-primary/10 text-sport-primary text-xs font-medium bg-sport-primary/10">
                      <Calendar size={13} className="inline" />
                      {event.sessionTime}
                    </span>
                  )}
                </div>
                <h2 className="font-semibold text-sport-text text-base truncate">{event.name}</h2>
                <div className="flex items-center gap-1 text-sport-text-secondary text-xs mt-1">
                  <MapPin size={14} className="text-sport-primary" />
                  <span className="truncate">{event.location}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MyEvents;
