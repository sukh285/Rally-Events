import React, { useState } from "react";

const sports = [
  "Tennis",
  "Football",
  "Basketball",
  "Badminton",
  "Cricket",
  "Cycling",
  "Table Tennis",
  "Volleyball",
  "Ultimate Frisbee",
  "Running",
  "Swimming",
  "Yoga",
];
const eventTypes = ["Social", "Class", "Tournament", "Ride", "Group Run"];

const FilterModal = ({ isOpen, onClose, applyFilters }) => {
  const [selectedSports, setSelectedSports] = useState([]);
  const [selectedEventTypes, setSelectedEventTypes] = useState([]);

  const handleCheckboxChange = (value, stateSetter, state) => {
    if (state.includes(value)) {
      stateSetter(state.filter((item) => item !== value));
    } else {
      stateSetter([...state, value]);
    }
  };

  const handleApply = () => {
    applyFilters({
      sports: selectedSports,
      eventTypes: selectedEventTypes,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/40">
      <div
        className="w-full max-w-xs mx-2 p-3 rounded-lg border border-sport-base-200 shadow-lg backdrop-blur-sm bg-sport-base-100/90"
        style={{ maxHeight: "90vh", overflowY: "auto" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-sport-text font-semibold text-base">
            Filters
          </span>
          <button
            className="text-sport-text-secondary text-xl px-1 hover:text-sport-text transition-colors"
            aria-label="Close"
            onClick={onClose}
            style={{ lineHeight: 1 }}
          >
            ×
          </button>
        </div>

        {/* Sport Type */}
        <FilterSection
          title="Sport"
          options={sports}
          selected={selectedSports}
          toggleOption={(value) =>
            handleCheckboxChange(value, setSelectedSports, selectedSports)
          }
        />

        {/* Event Type */}
        <FilterSection
          title="Type"
          options={eventTypes}
          selected={selectedEventTypes}
          toggleOption={(value) =>
            handleCheckboxChange(value, setSelectedEventTypes, selectedEventTypes)
          }
        />

        {/* Apply Button */}
        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-1.5 rounded-md bg-sport-primary text-sport-primary-content text-sm font-medium shadow-sm hover:shadow-md transition-all duration-150"
            onClick={handleApply}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

// Modular filter section component
const FilterSection = ({ title, options, selected, toggleOption }) => (
  <div className="mb-3">
    <div className="text-sport-text font-medium text-xs mb-1">{title}</div>
    <div className="flex flex-wrap gap-1">
      {options.map((option) => (
        <button
          key={option}
          className={`px-2 py-0.5 rounded-full border text-[11px] font-normal transition-all duration-150
            ${selected.includes(option)
              ? "bg-sport-primary text-sport-primary-content border-sport-primary shadow-inner"
              : "bg-sport-base-200 border-sport-base-300 text-sport-text-secondary hover:bg-sport-base-300 hover:shadow-sm"
            }`}
          onClick={() => toggleOption(option)}
        >
          {option}
        </button>
      ))}
    </div>
  </div>
);

export default FilterModal;
