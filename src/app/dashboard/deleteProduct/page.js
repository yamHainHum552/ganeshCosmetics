import DisplayProduct from "@/components/displayProducts/DisplayProducts";

const page = () => {
  return (
    <>
      <DisplayProduct
        buttonTitle={"Delete"}
        link={"/dashboard/deleteProduct"}
      />
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
