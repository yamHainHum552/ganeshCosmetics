import HomePage from "./Homepage";
export default function Home() {
  return (
    <>
      <HomePage />
    </>
  );
}
export async function generateMetadata() {
  return {
    title: "Home | GC",
    description:
      "This is the home page of Ganesh Cosmetics. Here you can enroll the contents of the Site ",
  };
}
