import { Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { ToastContainer } from "./toast";
import "react-toastify/dist/ReactToastify.css";

const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} background text-white overflow-x-hidden`}
      >
        <ToastContainer autoClose={1000} />
        <Navbar />
        <main className="min-h-screen flex items-center justify-center p-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
