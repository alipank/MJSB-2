'use client'

import { MachineDetails } from "@/models/machines/MachineDetails"
import { getMachinesData } from "../../utils/getData"
import { Brand } from "./add/page"
import { Button, Input } from "@nextui-org/react"
import Link from "next/link"
import { useCallback, useContext, useEffect, useRef, useState } from "react"
import Item from "./Item"
import { ModalMachineContext } from "./ModalContext"

interface ItemListProps {
  brands: Brand[]
}



export default function ItemList(props: ItemListProps) {

  const [isLoading, setIsLoading] = useState(false)
  const [pages, setPages] = useState(1)
  const [items, setItems] = useState<MachineDetails[]>([])
  const removeItem = (id:string) => {
    const newItems = items.filter(item => item.id !== id)
    setItems(newItems)
  }

  const mm = useContext(ModalMachineContext)
  mm.removeItem = removeItem


  const observer = useRef<IntersectionObserver>()

  const sentinelRef = useCallback((node: Element | null) => {
    if (isLoading) return
    if (observer.current) observer.current.disconnect()

    observer.current = new IntersectionObserver((entries) => {
      const entry = entries[0]
      if (entry.isIntersecting) {
        setPages(pages + 1)
        console.log('intersect')
      }
    })

    if (node) {
      observer.current.observe(node)
    }

  }, [isLoading])

  useEffect(() => {
    // console.log(pages)
    setIsLoading(true)

    getMachinesData(pages)
      .then(
        (newItems) => {
          // console.log(newItems)
          setItems([...items, ...newItems])
        }
      )
      .then(() => { setIsLoading(false) })
      .catch(err => console.log('error fetching new items', err))
  }, [pages])




  return (
    <div>
      <Link href={'/admin/add'}>
        <Button className="w-full mb-2">
          Create New Machine
        </Button></Link>
      <Input className="w-full mb-3" placeholder="Search">
      </Input>
      <div className="flex flex-col -mx-4">
        {
          items.map((data) => {
            console.log(data)

            return (
              <Item key={data.id} machineDetails={data}
               brands={props.brands} />
            )
          })
        }

      </div>
      <div ref={sentinelRef} className="h-1"></div>
    </div>
  )



} 