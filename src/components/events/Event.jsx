import React from "react";
import EventClient from "./EventClient";
import fs from "fs";
import path from "path";

function Event() {
  let eventsFilePath = path.join(
    process.cwd(),
    "src",
    "constants",
    "events.json"
  );
  let eventsData = JSON.parse(fs.readFileSync(eventsFilePath, "utf-8"));

  return (
    <>
      <EventClient data={eventsData} />
    </>
  );
}

export default Event;
