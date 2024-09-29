import { FormAddMachine } from "@/app/admin/FormAddMachine";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  divider,
  Input,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";

import { NewBrand } from "./NewBrand";
// import { FormEvent, useState } from "react";

export type Brand = {
  id: number
  brand_name: string
}

//why it takes me weeks just to finish this section, huft

export default async function Admin() {

  // const res = await fetch('http://localhost:3002/admin/machines/brands')
  // const brands: Brand[] = await res.json()

  const brands: Brand[] = [
    {
      id:1,
      brand_name: "tes"
    }
  ]

  return (
      <FormAddMachine brands={brands}/>
  )
}
