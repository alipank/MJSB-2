'use client'

import { Autocomplete, AutocompleteItem, Input } from "@nextui-org/react";
import { FormEvent } from "react";

export default function Admin() {

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)

        console.log(formData)


        const res = await fetch('http://localhost:3002/admin/machines', {
            method: "POST",
            body: formData
        }).then((res) => console.log(res.body, res.json, res.formData))
            .catch((err) => console.log(err))

    }

    const animals = [
        { label: "Cat", value: "cat", description: "The second most popular pet in the world" },
        { label: "Dog", value: "dog", description: "The most popular pet in the world" },
        { label: "Elephant", value: "elephant", description: "The largest land animal" },
        { label: "Lion", value: "lion", description: "The king of the jungle" },
        { label: "Tiger", value: "tiger", description: "The largest cat species" },
        { label: "Giraffe", value: "giraffe", description: "The tallest land animal" },
        {
            label: "Dolphin",
            value: "dolphin",
            description: "A widely distributed and diverse group of aquatic mammals",
        },
        { label: "Penguin", value: "penguin", description: "A group of aquatic flightless birds" },
        { label: "Zebra", value: "zebra", description: "A several species of African equids" },
        {
            label: "Shark",
            value: "shark",
            description: "A group of elasmobranch fish characterized by a cartilaginous skeleton",
        },
        { label: "Otter", value: "otter", description: "A carnivorous mammal in the subfamily Lutrinae" },
        { label: "Crocodile", value: "crocodile", description: "A large semiaquatic reptile" },
    ];

    return <form onSubmit={onSubmit} encType="multipart/form-data">

        <p>Brand</p>
        <Input type="text" name="brand" className="w-full border-4 border-black" />
        <p>Model</p>
        <Input type="text" name="model" className="w-full border-4 border-black" />
        <p>Bought Price</p>
        <Input type="number" name="bought_price" className="w-full border-4 border-black" />
        <p>Note</p>
        <textarea name="note" className="w-full h-20 border-4 border-black" />
        <div className="flex w-full flex-wrap gap-4">
            <Autocomplete
            color="danger"
                label="Select an animal"
                className="max-w"
            >
                {animals.map((animal) => (
                    <AutocompleteItem
                        className="max-w-xs"
                        key={animal.value} value={animal.value}>
                        {animal.label}
                    </AutocompleteItem>
                ))}
            </Autocomplete>
        </div>
        <button type="submit">Kirim</button>

    </form>
}