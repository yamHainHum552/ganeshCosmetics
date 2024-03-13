import React from "react";
import ClientCard from "./ClientCard";

const Card = ({ name, price, productId, work, link, image }) => {
  return (
    <>
      <ClientCard
        name={name}
        price={price}
        productId={productId}
        work={work}
        link={link}
        image={image}
      />
    </>
  );
};

export default Card;
