import React from "react";
import ClientCard from "./ClientCard";

const Card = ({ title, link }) => {
  return (
    <>
      <ClientCard title={title} link={link} />
    </>
  );
};

export default Card;
