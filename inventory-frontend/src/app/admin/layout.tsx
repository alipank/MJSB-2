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
            <nav className="fixed bottom-2 left-0 w-full z-50">
                <ButtonGroup className="flex justify-center">
                    <Button onPress={() => router.push('/admin')}>
                        <FontAwesomeIcon size="lg" icon={faVault} />
                    </Button>
                    <Button
                        onPress={() => router.push('/admin/qr-scan')}
                        className="h-12 !rounded-lg -mx-2 ">
                        <FontAwesomeIcon size="lg" icon={faCamera} />
                    </Button>
                    <Button
                    onPress={() => router.push('/admin/qr-batch')}> 
                        <FontAwesomeIcon size="lg" icon={faQrcode} />
                    </Button>
                </ButtonGroup>
            </nav>
        </div>
    )
}