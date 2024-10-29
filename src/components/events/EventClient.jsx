"use client";

import { useState, useEffect } from "react";

const EventBanner = ({ event }) => (
  <div
    className={`bg-[${event.bannerColor}] border border-gray-200 p-4 text-center rounded-lg shadow-lg font-serif lg:mx-15  sm:mx-10 mx-5 mb-10`}
    style={{ backgroundColor: event.bannerColor || "transparent" }}
  >
    <p className="text-lg font-semibold text-white mb-1">{event.message}</p>
  </div>
);

export default function EventClient({ data }) {
  const [activeEvent, setActiveEvent] = useState(null);

  useEffect(() => {
    const today = new Date();
    const currentEvent = data.find((event) => {
      console.log(event.startDate);
      const start = new Date(event.startDate);
      const end = new Date(event.endDate);
      return today >= start && today <= end;
    });

    setActiveEvent(currentEvent);
  }, [data]);

  return <>{activeEvent && <EventBanner event={activeEvent} />}</>;
}
