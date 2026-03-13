
import Head from 'next/head';

export const metadata = {
  title: 'Excellence Links | Video Generator',
  description: 'Generate high-quality videos locally using deterministic logic.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-gray-950 text-gray-50 antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
