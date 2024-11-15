import DisplayProduct from "@/components/displayProducts/DisplayProducts";

const page = async () => {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-10">
      <h1 className="text-5xl md:text-7xl font-bold">Products</h1>
      <DisplayProduct buttonTitle={"Explore"} link={"products"} />
    </div>
  );
};

export default page;
export async function generateMetadata() {
  return {
    title: "Products | GC",
    description:
      "This is the Products page of Ganesh Cosmetics. Here you can watch out the Cosmetics Items ",
  };
}
