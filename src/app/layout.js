import { Jost } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={jost.className}>
        {children}
        <Toaster></Toaster>
      </body>
    </html>
  );
}