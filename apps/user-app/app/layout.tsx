import {Inter} from "next/font/google"
import "./globals.css";
import Providers from "@/Providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Providers>
        <div className="min-h-screen flex flex-col">
              <Header />
              {children}
              <Footer />
            </div>
      </Providers>
      </body>
    </html>
  );
}
