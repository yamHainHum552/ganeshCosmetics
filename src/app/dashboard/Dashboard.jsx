import Card from "@/components/dashboardComp/card/Card";
import React from "react";

const Dashboard = () => {
  return (
    <div className="  flex flex-wrap gap-5 items-center justify-center ">
      {/* Add Product */}
      <Card title="Add Product" link="addProduct" />
      {/* Update Product */}
      <Card title="Edit Product" link="editProduct" />
      {/* Delete Product */}
      <Card title="Delete Product" link="deleteProduct" />
    </div>
  );
};

export default Dashboard;
