import { getBrands } from "@/utils/getData"
import Form from "./form"
import ArrowBack from "@/components/ArrowBack"

export type Brand = {
  id: string
  brand_name: string
}

//why it takes me weeks just to finish this section, huft

export default async function Page() {

  const brands: Brand[] = await getBrands()

  return (
    <>
      <ArrowBack path={'/admin'} />
      <Form brands={brands} />
    </>
  )

}
