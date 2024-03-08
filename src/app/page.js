import Hero from "@/components/hero/Hero";

export default function Home() {
  return (
    <>
      <Hero />
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
