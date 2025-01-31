import "./globals.css";

import SessionWrapper from "@/components/SessionWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <title>Application</title>
      </head>
      <body className={`antialiased`} suppressHydrationWarning={true}>
        <SessionWrapper>
          <main>{children}</main>
        </SessionWrapper>
      </body>
    </html>
  );
}
