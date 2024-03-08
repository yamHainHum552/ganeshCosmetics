import React from "react";
import Dashboard from "./Dashboard";

const page = () => {
  return (
    <div className="h-full">
      <Dashboard />
    </div>
  );
};

export default page;
export async function generateMetadata() {
  return {
    title: "Dashboard | GC",
    description: "This is the dashboard page of Ganesh Cosmetics. ",
  };
}
