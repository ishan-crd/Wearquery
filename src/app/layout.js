import "./globals.css";

export const metadata = {
  title: "Wearquery - Tailoring Management",
  description: "Professional tailoring business management system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
