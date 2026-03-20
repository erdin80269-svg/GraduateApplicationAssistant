import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "保研申请助手",
  description: "智能生成保研申请材料",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
