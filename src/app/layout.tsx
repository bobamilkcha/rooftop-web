import type { Metadata } from "next";
import { Exo_2 } from "next/font/google";
import "./globals.css";


const exo2 = Exo_2({
    variable: "--font-exo2",
    subsets: ["latin"],
});


export const metadata: Metadata = {
    title: "Rooftop Energy",
    description: "Democratizing Solar Energy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${exo2.variable} antialiased`} >
        {children}
      </body>
    </html>
  );
}
