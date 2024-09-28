'use client'

import { Brand } from "@/app/admin/page";
import { Autocomplete, AutocompleteItem, Button, Input, Textarea } from "@nextui-org/react";
import { FormEvent, FormEventHandler, Key, useState } from "react";


export function FormAddMachine(props: any) {
  const [brandId, setBrandId] = useState<Key>();
  const [model, setModel] = useState("");
  const [boughtPrice, setBoughtPrice] = useState(0);
  const [note, setNote] = useState("");

  const baseURL = "http://192.168.172.87:3002"

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = {
      brand_id: brandId,
      model: model,
      bought_price: boughtPrice,
      note: note
    }

    // const formData = new FormData(event.currentTarget);
    // formData.append("brand_id", brandId);
    // formData.append("model", model);
    // formData.append("bought_price", boughtPrice.toString());
    // formData.append("note", note);

    fetch(
      baseURL+"/admin/machines",
      // "http://192.168.172.87:3002/admin/machines",
       {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(formData),
    })
      .then(async (res) => {
        console.log(await res.json())
        // setBrandId(undefined)

      })
      .catch((err) => console.log(err));
  }


  // const brands = fetch("http://localhost:3002/admin/machines/brands", {
  //   method: "GET",
  // }).then((res) => res.json());

  // };

  // {
  //   label: "Crocodile",
  //   value: "crocodile",
  //   description: "A large semiaquatic reptile",
  // },

  return (
    <form onSubmit={onSubmit} className="*:mb-11 m-6 max-w-xl">
      <div className="flex w-full flex-wrap gap-4">
        <Autocomplete
          name="brand_id"
          placeholder="Brand Mesin Jahit"
          size="lg"
          variant="bordered"
          label="Brand"
          labelPlacement="outside"
          className="w-64"
          classNames={{ selectorButton: "text-medium" }}
          onSelectionChange={(e) => {
            setBrandId(e || undefined);

            // console.log(e);
          }}
        // onInputChange={e => console.log(e)}
        >

          {props.brands.map((brand: any) => (
            <AutocompleteItem
              className="max-w-xs"
              key={brand.id}
              value={brand.id}
            >
              {brand.brand_name}
            </AutocompleteItem>
          ))}

        </Autocomplete>
      </div>

      <Input
        name="model"
        onChange={(e) => {
          setModel(e.currentTarget.value);
        }}
        className="w-64"
        placeholder="Model Mesin Jahit. Contoh: 8280, MYLOCK 3340"
        variant="bordered"
        size="lg"
        label="Model"
        labelPlacement="outside"
      />
      <Input
        name="bought_price"
        className="w-72"
        onChange={(e) => setBoughtPrice(Number(e.currentTarget.value))}
        type="number"
        placeholder="Model Mesin Jahit. Contoh: 8280, MYLOCK 3340"
        variant="bordered"
        size="lg"
        label="Bought Price"
        labelPlacement="outside"
        startContent={
          <div className="pointer-events-none items-center">
            <span className="text-default-500 ">Rp.</span>
          </div>
        }
      />
      <Textarea
        name="note"
        onChange={(e) => setNote(e.currentTarget.value)}
        placeholder="Catatan seperti: Butuh sparepart apa. mau diperbaiki bagaimana"
        variant="bordered"
        size="lg"
        label="Note"
        labelPlacement="outside"
        classNames={{
          label: "text-medium -mt-8", // to match regular input style
        }}
      />

      <Button type="submit" size="lg" variant="bordered" className="w-36 h-12 bg-sky-600 text-slate-50 font-bold">Selesai</Button>
    </form>
  );
}