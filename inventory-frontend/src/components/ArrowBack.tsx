'use client'

import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function ArrowBack() {
 
    const router = useRouter()
 
    return (

        <Button isIconOnly onClick={() => {
            router.back()
        }} className="absolute top-12 left-2 z-50 w-10 h-10 bg-white rounded-full text-center content-center shadow-md">
            <FontAwesomeIcon icon={faArrowLeft} />
        </Button>
    )
}