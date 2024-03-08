import React from "react";
import ClientCard from "./ClientCard";

const Card = ({ name, price, productId, work, link }) => {
  return (
    <>
      <ClientCard
        name={name}
        price={price}
        productId={productId}
        work={work}
        link={link}
      />
    </>
  );
};

export default Card;
