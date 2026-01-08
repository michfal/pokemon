<script setup>
import { ref, computed, onMounted } from "vue"
import { usePokemonApi } from "./composables/usePokemonApi"
import { usePokemonTypes } from "@/composables/usePokemonTypes"

import AppHeader from "./components/AppHeader.vue"
import PokemonSearch from "./components/PokemonSearch.vue"
import TypeFilter from "./components/TypeFilter.vue"
import PokemonGrid from "./components/PokemonGrid.vue"
import PokemonDetailsModal from "@/components/PokemonDetailsModal.vue"


const detailsOpen = ref(false)
const selectedPokemon = ref(null)

const openDetails = (idOrName) => {
  selectedPokemon.value = idOrName
  detailsOpen.value = true
}

const search = ref("")
const { types, loading: typesLoading } = usePokemonTypes()
const selectedTypes = ref([])

const {
  pokemons,
  loading,
  error,
  loadMore
} = usePokemonApi(6)

onMounted(loadMore)

const filtered = computed(() => {
  const q = search.value.trim().toLowerCase()

  return pokemons.value.filter((p) => {
    const matchesText =
      !q || p.name.toLowerCase().includes(q) || p.num.includes(q)

    const pokemonTypes = p.types.map((t) => t.toLowerCase())

    const matchesTypes =
      selectedTypes.value.length === 0 ||
      selectedTypes.value.some((t) => pokemonTypes.includes(t))

    return matchesText && matchesTypes
  })
})

</script>

<template>
  <div class="min-h-screen bg-zinc-950 text-zinc-100">
    <div class="mx-auto max-w-6xl px-6 py-10">

      <AppHeader />

      <div class="mt-6">
        <PokemonSearch v-model="search" />
      </div>

      <div class="mt-6">
        <TypeFilter v-model="selectedTypes" :types="types"/>
      </div>

      <div class="mt-10">
        <PokemonGrid :items="filtered" @open="openDetails" />
      </div>

      <!-- Load More -->
      <div class="mt-10 flex justify-center">
        <button
          @click="loadMore"
          :disabled="loading"
          class="rounded-full bg-blue-600 px-8 py-2.5 text-sm font-semibold
                 disabled:opacity-50 hover:bg-blue-500 transition"
        >
          {{ loading ? "Loading..." : "Load More" }}
        </button>
      </div>

      <p v-if="error" class="mt-4 text-center text-red-400">
        {{ error }}
      </p>

    </div>
  </div>
  <PokemonDetailsModal
  v-model:open="detailsOpen"
  :pokemonIdOrName="selectedPokemon"
/>
</template>
