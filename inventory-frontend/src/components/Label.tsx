import { DetailedHTMLProps, LabelHTMLAttributes } from "react"

export function Label(props:  DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement> & { errorMessage?:string, isInvalid?:boolean }) {
    const {children, errorMessage, isInvalid, className, ...componentProps} = props

    const classNameInvalid = "!border-danger !text-danger"
    return (
        <label {...componentProps} className={ (isInvalid && classNameInvalid) + " " + className}>
            {props.children}
            <p className="text-tiny text-danger">{errorMessage}</p>
        </label>

    )
}