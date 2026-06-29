import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar"; // แก้ไขเป็นตัวนี้เรียบร้อยครับ

export const metadata: Metadata = {
  title: "Pokemon App",
  description: "Pokemon encyclopedia project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body style={{ margin: 0, backgroundColor: "#f8fafc", fontFamily: "sans-serif" }}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}