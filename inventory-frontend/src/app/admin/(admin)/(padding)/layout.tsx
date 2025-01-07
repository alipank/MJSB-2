import React from "react";


export default function PaddingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <div className="px-4 pt-4">
        {children}
    </div>
  );
}
``