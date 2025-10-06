import { Settings } from "lucide-react";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-sport-base-100 shadow-sm">
      {/* Left: Profile */}
      <button className="w-8 h-8 rounded-full overflow-hidden shadow-md ring-1 ring-sport-base-300 hover:ring-sport-primary transition-all">
        <img
          src="https://avatar.iran.liara.run/public"
          alt="Profile"
          className="w-full h-full object-cover"
          loading="eager" // load immediately since it's always visible
          decoding="async" // let browser decode asynchronously for smoother paint
        />
      </button>

      {/* Center: Logo */}
      <div className="flex items-center justify-center">
        <img src="/logo.png" alt="Rally Events Logo" className="h-9 w-auto" />
      </div>

      {/* Right: Settings */}
      <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-sport-base-200 transition-colors">
        <Settings size={18} className="text-sport-text-secondary" />
      </button>
    </div>
  );
};

export default Navbar;
