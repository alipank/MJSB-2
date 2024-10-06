import Form from "./form"

export type Brand = {
  id: number
  brand_name: string
}

//why it takes me weeks just to finish this section, huft

export default async function Page() {

  // const res = await fetch('http://localhost:3002/admin/machines/brands')
  // const brands: Brand[] = await res.json()

  const brands: Brand[] = [
    {
      id: 1,
      brand_name: "tes"
    }
  ]

  return (
    <Form  brands={brands} />
  )
 
}
