import React from "react";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-sport-base-100">
      {/* Left: App Name / Logo */}
      <div className="text-md font-bold text-sport-text">Rally Events</div>

      {/* Right: Profile Picture */}
      <img
        src="https://avatar.iran.liara.run/public" // replace with actual profile image path
        alt="Profile"
        className="w-6 h-6 rounded-full object-cover bg-sport-base-200"
      />
    </div>
  );
};

export default Navbar;
