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
          {/* <div className="w-full h-[2px] bg-default-200 "></div>
          <p className="text-sm text-default-700 ">@2024 | <span className="font-bold">Made by Alipank</span> with love</p> */}
        </div>
      </div>
    </div>
  );
}
``