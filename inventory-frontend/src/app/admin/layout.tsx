import ArrowBack from "@/components/ArrowBack";
import React from "react";


export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <div id="MadeByAlipaaankkk">

        <div className=" min-h-dvh flex justify-center items-start">
          <div className="max-w-md w-full p-4 border-2 border-gray-200 rounded-3xl">
            
            {children}
            <div className="h-[2px] w-full bg-default-200 my-6"></div>
            <p className="text-sm">@2024 | Made by <span className="font-bold">Alipank</span> with &lt;3</p>
          </div>
        </div>
      <ArrowBack />
    </div>
  );
}
``