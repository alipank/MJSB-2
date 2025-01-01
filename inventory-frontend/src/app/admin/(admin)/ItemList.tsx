'use client'

import { MachineDetails } from "@/models/machines/MachineDetails"
import { getMachinesData } from "../../../utils/getData"
import { Brand } from "./add/page"
import { Button, Input, Listbox, ListboxItem } from "@nextui-org/react"
import Link from "next/link"
import { useCallback, useContext, useEffect, useRef, useState } from "react"
import Item from "./Item"
import { ModalMachineContext } from "./ModalContext"
import { toast } from "react-toastify"

interface ItemListProps {
  brands: Brand[]
}



export default function ItemList(props: ItemListProps) {

  const [isLoading, setIsLoading] = useState(false)
  const [pages, setPages] = useState(0)
  const [items, setItems] = useState<MachineDetails[]>([])
  const [hasMore, setHasMore] = useState(true)

  const removeItem = (id: string) => {
    const newItems = items.filter(item => item.id !== id)
    setItems(newItems)
  }

  const mm = useContext(ModalMachineContext)
  mm.removeItem = removeItem


  const observer = useRef<IntersectionObserver>()

  const sentinelRef = useCallback((node: Element | null) => {
    if (isLoading || !hasMore) { console.log('Sentinel Ref Return'); return }
    if (observer.current) observer.current.disconnect()

    observer.current = new IntersectionObserver((entries) => {
      const entry = entries[0]
      if (entry.isIntersecting) {
        setPages(pages => pages + 1)
        console.log('intersect')
      }
    })

    if (node) {
      observer.current.observe(node)
    }

  }, [isLoading, hasMore])

  // useEffect(() => {
  //   // console.log(pages)
  //   setIsLoading(true)

  //   getMachinesData(pages)
  //     .then(
  //       (newItems) => {
  //         // console.log(newItems)
  //         setItems([...items, ...newItems])
  //       }
  //     )
  //     .then(() => { setIsLoading(false) })
  //     .catch(err => {
  //       console.log('error fetching new items', err)
  //       toast.error("Sorry, Failed to fetch items", { autoClose: false })
  //     })
  // }, [pages])

  useEffect(() => {
    console.log(pages)
    setIsLoading(true)

    getMachinesData(pages)
      .then(
        (newItems) => {
          // console.log(newItems)
          if (newItems.length === 0) {
            console.log('get machines data')
            setHasMore(false) // No more items available
            if (observer.current) observer.current.disconnect()
          }
          else {
            setItems(items => [...items, ...newItems])

          }
        }
      )
      .then(() => { setIsLoading(false) })
      .catch(err => {
        console.log('error fetching new items', err)
        toast.error("Sorry, Failed to fetch items", { autoClose: false })
      })
  }, [pages])

  return (
    <div>
      <Link href={'/admin/add'}>
        <Button color="primary" size="lg" className="w-full mb-2 font-bold">
          Create New Machine
        </Button></Link>
      <Input className="w-full mb-3" placeholder="Search">
      </Input>
      <Listbox className="-mx-4 p-0 gap-0 w-screen md:max-w-md" >
        {/* <div className="-mx-4 p-0 gap-0 w-screen md:max-w-md" > */}

        {
          items.map((data) => {

            return (
              //Im overriding the Listbox item hover and focus class because i got one in the Item and the hover behaviour is weird.
              <ListboxItem key={data.id} className={`block gap-0 p-0 w-full
              data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-0 data-[focus-visible=true]:outline-none data-[focus-visible=true]:outline-offset-0 data-[focus-visible=true]:dark:ring-offset-background-content1 data-[hover=true]:transition-colors data-[hover=true]:bg-transparent data-[hover=true]:text-current
              `}>
                <Item machineDetails={data}
                  brands={props.brands} />
              </ListboxItem>
            )
          })
        }
        {/* </div> */}
      </Listbox>
      <div ref={sentinelRef} className="h-1"></div>
    </div>
  )



} 