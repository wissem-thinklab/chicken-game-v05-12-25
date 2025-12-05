import "./globals.css";

export const metadata = {
  title: "Chicken Crash Game",
  description: "Cross the road before the chicken gets hit!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-linear-to-br from-purple-900 via-black to-blue-900 text-white antialiased">
        {children}
      </body>
    </html>
  );
}