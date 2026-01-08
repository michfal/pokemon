import { ref } from "vue"

const API = "https://pokeapi.co/api/v2/pokemon"
const cache = new Map()

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1)
const pretty = (s) => String(s ?? "").split("-").map(cap).join(" ")

export function usePokemonDetailsLite() {
  const pokemon = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const load = async (idOrName) => {
    if (!idOrName) return
    const key = String(idOrName).toLowerCase()

    if (cache.has(key)) {
      pokemon.value = cache.get(key)
      return
    }

    loading.value = true
    error.value = null

    try {
      const res = await fetch(`${API}/${key}`)
      if (!res.ok) throw new Error("fetch failed")
      const d = await res.json()

      const mapped = {
        id: d.id,
        name: pretty(d.name),
        num: `#${String(d.id).padStart(3, "0")}`,
        types: d.types.map((t) => pretty(t.type.name)),
        height: d.height,
        weight: d.weight,
        img:
          d.sprites?.other?.["official-artwork"]?.front_default ??
          d.sprites?.front_default ??
          null,
      }

      cache.set(key, mapped)
      pokemon.value = mapped
    } catch (e) {
      error.value = "Nie udało się pobrać szczegółów."
      pokemon.value = null
    } finally {
      loading.value = false
    }
  }

  return { pokemon, loading, error, load }
}
