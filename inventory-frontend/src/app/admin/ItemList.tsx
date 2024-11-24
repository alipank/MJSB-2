import { MachineDetails } from "@/models/MachineDetails"
import { getMachinesData } from "../utils/getData"
import { Brand } from "./add/page"
import Item from "./Item"
import { Button, Input, Modal, ModalContent, useDisclosure } from "@nextui-org/react"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
// import { useState } from "react"

// TODO MAKE THIS SHIT CLIENT COMP, RECEIVING DATA FROM PAGE. SO THE MODAL CAN  FETCH/UPDATE THE CLIENT  DATA.
export default async function ItemList() {

  try {
    const machinesDetails: MachineDetails[] = await getMachinesData()
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
            machinesDetails.map((data) => {
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
      </div>
    )
  }
  catch (error: any) {
    console.log(error)
    return <p>{error.message}</p>
  }


} 