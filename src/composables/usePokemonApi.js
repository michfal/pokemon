import { ref } from "vue"

const API = "https://pokeapi.co/api/v2/pokemon"

export function usePokemonApi(limit) {
  const pokemons = ref([])
  const loading = ref(false)
  const error = ref(null)
  let offset = 0

  const loadMore = async () => {
    if (loading.value) return
    loading.value = true
    error.value = null

    try {
      const res = await fetch(`${API}?limit=${limit}&offset=${offset}`)
      const list = await res.json()

      const details = await Promise.all(
        list.results.map(async (p) => {
          const r = await fetch(p.url)
          const d = await r.json()
          return {
            id: d.id,
            name: capitalize(d.name),
            num: `#${String(d.id).padStart(3, "0")}`,
            types: d.types.map(t => capitalize(t.type.name)),
            img: d.sprites.other["official-artwork"].front_default ?? d.sprites.front_default,
          }
        })
      )

      pokemons.value.push(...details)
      offset += limit
    } catch (e) {
      error.value = "Failed to load Pokémon"
    } finally {
      loading.value = false
    }
  }

  return { pokemons, loading, error, loadMore }
}

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1)
