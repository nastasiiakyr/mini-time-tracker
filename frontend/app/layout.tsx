import "./globals.css";

export const metadata = {
  title: "Mini Time Tracker",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen font-sans antialiased">
        <div className="max-w-3xl mx-auto p-4">{children}</div>
      </body>
    </html>
  );
}
