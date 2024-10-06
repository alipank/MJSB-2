import { Inter } from "next/font/google";

const inter = Inter({subsets:["latin"]})

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      Hello Everybody
        {children}
    </div>
  );
}
``