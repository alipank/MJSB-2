'use client'

import { Button, Divider } from "@nextui-org/react"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"

export default function NotFound() {

    const pathname = usePathname()
    const router = useRouter()

    return (
        <html >
            <body className=" h-dvh flex flex-col justify-center items-center">
                <div className="h-16  max-w-md m-6 flex flex-row justify-center items-center text-default-700">
                    <div className="text-2xl font-bold">
                        404
                    </div>
                    <Divider orientation="vertical" className="mx-4" ></Divider>
                    <div >
                        Couldn&apos;t find the requested resource
                        <br />
                        <span className="font-bold">{pathname}</span>
                    </div>
                </div>
                <Button className="w-full max-w-xs " size="lg" onPress={() => {
                    router.replace('/admin')
                }}>
                    Back to Home
                </Button>
            </body>
        </html>
    )
}