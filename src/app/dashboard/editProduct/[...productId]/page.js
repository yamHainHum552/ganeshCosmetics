import Update from "./Update";
import Image from "next/image";
const getProduct = async (id) => {
  try {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/api/products/${id}`,
      {
        cache: "no-store",
      }
    );
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
  const { result } = await getProduct(params.productId[0]);
  const length = params.productId.length;
  const id = params.productId[length - 1].split(".")[0];
  return (
    <div className="flex items-center justify-center gap-10 flex-wrap">
      <Update product={result} id={id} />
      <div className="sm:flex flex-col items-center gap-5 hidden">
        <h1 className="text-3xl md:text-5xl font-bold">Image</h1>
        <Image
          src={result.image}
          height={300}
          width={300}
          alt="Product Image"
        />
      </div>
    </div>
  );
};

export default page;
export async function generateMetadata({ params }) {
  const { result } = await getProduct(params.productId[0]);

  return {
    title: `Edit-${result.name} | GC`,
    description: "This is the dashboard page of Ganesh Cosmetics. ",
  };
}
