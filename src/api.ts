import axios from 'axios'

export interface Pokemon {
  id: number
  name: string
  types: string[]
  image: string
  height: number
  weight: number
  baseExperience: number
  stats: { name: string; value: number }[]
}

const BASE_URL = 'https://pokeapi.co/api/v2'

export async function fetchPokemon(): Promise<Pokemon[]> {
  const list = await axios.get(`${BASE_URL}/pokemon?limit=151`)
  // the list only gives names and urls, so get the details for each one
  const res = await Promise.all(list.data.results.map((r: any) => axios.get(r.url)))

  return res.map(({ data }) => ({
    id: data.id,
    name: data.name,
    types: data.types.map((t: any) => t.type.name),
    image: data.sprites.other['official-artwork'].front_default,
    height: data.height,
    weight: data.weight,
    baseExperience: data.base_experience,
    stats: data.stats.map((s: any) => ({ name: s.stat.name, value: s.base_stat })),
  }))
}
