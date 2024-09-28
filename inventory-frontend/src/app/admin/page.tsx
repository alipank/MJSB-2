import { FormAddMachine } from "@/app/admin/FormAdd";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  divider,
  Input,
  Textarea,
} from "@nextui-org/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { FormEvent } from "react";
// import { FormEvent, useState } from "react";

export type Brand = {
  id: number
  brand_name: string
}

//why it takes me a week just to finish this section, huft

export default async function Admin() {

  const res = await fetch('http://localhost:3002/admin/machines/brands')
  const brands: Brand[] = await res.json()

  return (
    <FormAddMachine brands={brands} />
  )
}
