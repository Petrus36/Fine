import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Administrácia",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="flex min-h-screen flex-1 flex-col bg-cream-dark">{children}</div>;
}
