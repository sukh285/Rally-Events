import { useState, useEffect } from "react";
import { Wifi, BatteryFull, BatteryMediumIcon } from "lucide-react";

export const NotificationBar = () => {
  const [time, setTime] = useState(() => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    }, 1000 * 30); // update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="flex items-center justify-between px-6 h-8 bg-none z-10"
      style={{ minHeight: "2rem" }}
    >
      <span className="text-xs font-semibold text-gray-800">{time}</span>
      <div className="flex items-center gap-2">
        <Wifi size={16} className="text-sport-primary-content" />
        <BatteryMediumIcon size={18} className="text-sport-primary-content" />
      </div>
    </div>
  );
};
