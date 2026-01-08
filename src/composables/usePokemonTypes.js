import { ref, onMounted } from "vue"

const API = "https://pokeapi.co/api/v2/type"

export function usePokemonTypes() {
  const types = ref([])
  const loading = ref(false)
  const error = ref(null)

  const load = async () => {
    loading.value = true
    try {
      const res = await fetch(API)
      const data = await res.json()

      types.value = data.results
        .map(t => t.name)
        .filter(t => t !== "unknown" && t !== "shadow")
    } catch (e) {
      error.value = "Failed to load types"
    } finally {
      loading.value = false
    }
  }

  onMounted(load)

  return { types, loading, error }
}
