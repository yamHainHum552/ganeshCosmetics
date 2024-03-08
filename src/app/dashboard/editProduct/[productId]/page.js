import Update from "./Update";
const getProduct = async (id) => {
  try {
    const data = await fetch(`http://localhost:3000/api/products/${id}`, {
      cache: "no-store",
    });
    if (!data.ok) {
      throw new Error("Error fetching the product");
    }
    const product = await data.json();

    return product;
  } catch (error) {
    console.log(error);
  }
};

const page = async ({ params }) => {
  const { result } = await getProduct(params.productId);
  return (
    <>
      <Update product={result} />
    </>
  );
};

export default page;
export async function generateMetadata({ params }) {
  const { result } = await getProduct(params.productId);

  return {
    title: `Edit-${result.name} | GC`,
    description: "This is the dashboard page of Ganesh Cosmetics. ",
  };
}
