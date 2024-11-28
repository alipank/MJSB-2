'use client'

import { MachineDetails } from "@/models/MachineDetails"
import { getMachinesData } from "../utils/getData"
import { Brand } from "./add/page"
import Item from "./Item"
import { Button, Input} from "@nextui-org/react"
import Link from "next/link"
import { useCallback, useEffect, useRef, useState } from "react"

export default function ItemList() {

  const [isLoading, setIsLoading] = useState(false)
  const [pages, setPages] = useState(1)
  const [items, setItems] = useState<MachineDetails[]>([])

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
          console.log(newItems)
          setItems([...items, ...newItems])
        }
      )
      .then(() => { setIsLoading(false) })
      .catch(err => console.log('error fetching new items', err))
  }, [pages])


  try {
    // const items: MachineDetails[] = await getMachinesData()
    const brands: Brand[] = [
      {
        id: 1,
        brand_name: "tes"
      }
    ]

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
                <>
                  {/* Item(data, brands) */}
                  <Item key={data.id} machineDetails={data} brands={brands} />
                  {/* <Item2 machineDetails={data} brands={brands} /> */}
                </>

              )
            })
          }

        </div>
        <div ref={sentinelRef} className="h-1"></div>
      </div>
    )
  }
  catch (error: any) {
    console.log(error)
    return <p>{error.message}</p>
  }


} 