import { useState } from "react";

export default function useStateMax(maxLength: number, errorCb: () => void) {
    const [array, setArray] = useState([])

    function pushArray(newArray: []) {
        if (array.length < maxLength) {
            setArray([...array, ...newArray])
        } else {
            //untuk sekarang console.log dulu
            errorCb()
            console.log("ARRAY PENUUUH")
        }
    }

    function subArray() {

    }

    return [array, pushArray, subArray]
}