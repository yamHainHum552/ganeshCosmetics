import DeleteProduct from "./DeleteProduct";

const page = () => {
  return (
    <>
      <DeleteProduct />
    </>
  );
};

export default page;
export async function generateMetadata() {
  return {
    title: "Delete-Products | GC",
    description: "This is the dashboard page of Ganesh Cosmetics. ",
  };
}
