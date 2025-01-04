'use client'

import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, ButtonProps } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function ArrowBack(props : {path: string} & React.HTMLAttributes<ButtonProps>   ) {
 
    const router = useRouter()
 
    return (

        <Button isIconOnly onPress={() => {
            router.replace(props.path)
        }} className={`absolute top-11 left-2 z-50 size-10 xs:size-12 bg-white rounded-full text-center shadow-[#00000055] shadow-lg content-center ${props.className}`}>
            <FontAwesomeIcon icon={faArrowLeft} />
        </Button>
    )
}