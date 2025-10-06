import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { events } from "../data/events";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Users,
  Info,
  UserCircle2,
} from "lucide-react";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = events.find((e) => e.id === parseInt(id));
  const [selectedSession, setSelectedSession] = useState(null);
  const [confirmedSession, setConfirmedSession] = useState(null);

  useEffect(() => {
    const confirmedEvents =
      JSON.parse(localStorage.getItem("confirmedEvents")) || [];
    const confirmed = confirmedEvents.find((e) => e.id === event?.id);
    if (confirmed) {
      setConfirmedSession(confirmed.sessionTime);
    }
  }, [event?.id]);

  if (!event)
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

  // Determine button state based on selectedSession
  let buttonText = "Select a Session to Join";
  let buttonDisabled = true;
  let buttonClasses =
    "bg-sport-base-200 text-sport-text-secondary cursor-not-allowed";

  if (selectedSession !== null) {
    if (confirmedSession === event.dates[selectedSession]) {
      buttonText = `Already Going (${confirmedSession})`;
      buttonDisabled = true;
      buttonClasses = "bg-green-500 text-white cursor-not-allowed";
    } else {
      buttonText = `Join ${event.dates[selectedSession]}`;
      buttonDisabled = false;
      buttonClasses =
        "bg-sport-primary text-sport-primary-content hover:bg-sport-primary/90 hover:scale-[1.02]";
    }
  }

  return (
    <div className="bg-sport-base-100 min-h-screen flex flex-col text-sport-text relative">
      {/* Hero Image */}
      <div className="relative w-full">
        <img
          src={event.image}
          alt={event.name}
          className="w-full h-64 sm:h-72 object-cover"
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

      {/* Floating Event Info Card */}
      <div className="px-5 -mt-12 z-10 relative">
        <div className="bg-sport-base-100 rounded-2xl shadow-lg p-5 border border-sport-base-200">
          {/* Badge */}
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
          {/* Description */}
          <div className="flex items-start gap-2 mt-3">
            <Info size={18} className="mt-0.5 text-sport-text" />
            <span className="text-sport-text-secondary text-xs leading-relaxed font-normal italic">
              {event.description ||
                "Join this exciting event and connect with players who share your energy and passion."}
            </span>
          </div>
        </div>
      </div>

      {/* Who’s Joining */}
      <div className="px-5 mt-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-semibold text-sport-text text-base flex items-center gap-1">
            <Users size={18} />
            Who’s Joining
          </h2>
          <span className="text-xs text-sport-text-secondary">
            {event.participants?.length || 0} joined
          </span>
        </div>
        <div className="flex -space-x-3">
          {event.participants?.length ? (
            event.participants.slice(0, 6).map((p, idx) => (
              <div key={idx} className="tooltip" data-tip={p.name}>
                <img
                  src={p.avatar}
                  alt={p.name}
                  className="w-9 h-9 rounded-full border-2 border-sport-base-100 object-cover shadow-md"
                />
              </div>
            ))
          ) : (
            <p className="text-xs text-sport-text-secondary italic">
              No participants yet — be the first to join!
            </p>
          )}
          {event.participants?.length > 6 && (
            <div className="w-9 h-9 rounded-full bg-sport-base-200 border-2 border-sport-base-100 flex items-center justify-center text-xs font-semibold text-sport-text-secondary">
              +{event.participants.length - 6}
            </div>
          )}
        </div>
      </div>

      {/* Available Sessions */}
      <div className="px-5 mt-7">
        <h2 className="font-semibold text-sport-text text-base mb-3 flex items-center gap-1">
          <Calendar size={18} />
          Available Sessions
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {event.dates.map((date, index) => {
            const [day, time] = date.split(" - ");
            const isSelected = selectedSession === index;
            const isConfirmed = confirmedSession === date;

            return (
              <button
                key={index}
                className={`w-full py-2 rounded-xl border text-sm font-medium transition-all duration-150 flex flex-col items-center justify-center
            ${
              isConfirmed
                ? "bg-green-500 text-white border-green-500 shadow-md scale-[1.02]"
                : isSelected
                ? "bg-sport-primary text-sport-primary-content border-sport-primary shadow-md shadow-sport-primary/40 scale-[1.02]"
                : "bg-gradient-to-b from-sport-base-200/70 to-sport-base-100 border-sport-base-300 text-sport-text shadow-inner shadow-sport-base-400/30 hover:shadow-inner hover:shadow-sport-base-400/50 hover:from-sport-base-200 hover:to-sport-base-100"
            }`}
                onClick={() => setSelectedSession(index)}
                aria-pressed={isSelected || isConfirmed}
              >
                <span className="font-semibold text-sm">{day}</span>
                <span className="text-xs opacity-80">{time}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Join Button */}
      <div className="px-5 mt-auto py-6">
        <button
          className={`w-full py-3 rounded-xl font-semibold text-base shadow-md transition-all duration-200 ${buttonClasses}`}
          disabled={buttonDisabled}
          onClick={() => {
            if (selectedSession !== null && confirmedSession !== event.dates[selectedSession]) {
              navigate(`/checkout/${event.id}`, {
                state: { sessionIndex: selectedSession },
              });
            }
          }}
        >
          {buttonText}
        </button>
      </div>

      {/* About the Host */}
      {event.host && (
        <div className="px-5 pb-8">
          <div
            className="bg-gradient-to-b from-sport-base-200/90 to-sport-base-100 
                 rounded-2xl border border-sport-base-300 
                 p-5 flex flex-col gap-2 mt-2 
                 shadow-inner shadow-sport-text-secondary/50"
          >
            <div className="flex items-center gap-2 mb-1">
              <UserCircle2 size={22} className="text-sport-primary" />
              <span className="font-semibold text-sport-text text-base">
                About the Host
              </span>
            </div>

            <div className="ml-0.5">
              <span className="block text-sport-primary font-semibold text-sm mb-0.5">
                {event.host.name}
              </span>
              <span className="text-sport-text-secondary text-sm leading-relaxed">
                {event.host.description}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetails;
