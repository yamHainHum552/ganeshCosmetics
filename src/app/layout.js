import { Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { ToastContainer } from "./toast";
import "react-toastify/dist/ReactToastify.css";
import Event from "@/components/events/Event";

const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_SERVER}`),
  openGraph: {
    images: "/opengraph-image.jpg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} background text-white overflow-x-hidden`}
      >
        <ToastContainer autoClose={1000} />
        <Navbar />
        <Event />

        <main className="min-h-screen flex items-center justify-center p-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
