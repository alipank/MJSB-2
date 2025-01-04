'use client'

import { faCamera, faHomeUser, faQrcode, faVault } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, ButtonGroup } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {

    const router = useRouter()

    return (
        <div>
            {children}
            <nav className="fixed bottom-3 left-0 w-full z-50">
                <ButtonGroup className="flex justify-center *:bg-gray-300 *:shadow-[#00000055] *:shadow-md">
                    <Button onPress={() => router.replace('/admin')} className="">
                        <FontAwesomeIcon size="lg" icon={faVault} />
                    </Button>
                    <Button
                        onPress={() => router.replace('/admin/qr-scan') }
                        className="h-12 !rounded-lg -mx-2 z-10 !bg-gray-200">
                        <FontAwesomeIcon size="lg" icon={faCamera} />
                    </Button>
                    <Button
                    onPress={() => router.replace('/admin/qr-batch')}
                    className=""
                    > 
                        <FontAwesomeIcon size="lg" icon={faQrcode} />
                    </Button>
                </ButtonGroup>
            </nav>
        </div>
    )
}