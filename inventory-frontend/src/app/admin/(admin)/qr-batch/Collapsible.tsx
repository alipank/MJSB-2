import { HTMLNextUIProps } from "@nextui-org/react";
import { createContext, HTMLAttributes, ReactNode, useContext } from "react";

interface CollapsibleProps {
    children: ReactNode,
    isOpen: boolean,
    onClose?: () => void
}

const CollapsibleCtx = createContext({
    isOpen: false,
    onClose: () => { }
})


export default function Collapsible({ children, isOpen, onClose, className }: CollapsibleProps & React.HTMLAttributes<HTMLDivElement>) {


    return (
        <div className={className}>
            <CollapsibleCtx.Provider value={{
                isOpen: isOpen,
                onClose: onClose || (() => {})
            }}>
                {children}
            </CollapsibleCtx.Provider>
        </div>
    )
}

interface CollapsibleContentProps extends  Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
    children: ((onClose: () => void) => ReactNode)  ;
}

export function CollapsibleContent({ children, className }: CollapsibleContentProps ) {


    const ctx = useContext(CollapsibleCtx)

    const { isOpen, onClose } = ctx

    console.log(isOpen)

    return (
        <div className={`max-w-md h-14 flex flex-row items-center ${className} ${!isOpen ? 'hidden' :''}`}>
            {children(onClose)}
        </div>
    )

}