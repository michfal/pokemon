<script setup>
import PokemonCard from "./PokemonCard.vue"

defineProps({
  items: { type: Array, required: true },
})
const emit = defineEmits(["open"])
</script>

<template>
  <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
    <PokemonCard
      v-for="p in items"
      :key="p.id"
      :pokemon="p"
      @open="emit('open', $event)"
    />
  </div>
</template>
