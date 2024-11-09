export async function getData(id: number | string) {
    const res = await fetch('http://localhost:3002/admin/' + id, {cache: "no-store"})

    if (!res.ok) {
      throw new Error('Failed to fetch data' + id)
    }

    return res.json()
  }