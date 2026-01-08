<script setup>
import TypePill from "./TypePill.vue"
import { typeColors } from "@/utils/typeColors"
import { hexToRgba } from "@/utils/color"

const props = defineProps({
  pokemon: {
    type: Object,
    required: true,
    // { id, name, num, types: ["Fire"], img }
  },
})

const emit = defineEmits(["open"])

const gradientStyle = (types) => {
  const a = typeColors[types[0].toLowerCase()] ?? "#777"
  const b = typeColors[(types[1] ?? types[0]).toLowerCase()] ?? a
  return {
    background: `linear-gradient(135deg, ${hexToRgba(a, 0.95)}, ${hexToRgba(b, 0.75)})`,
  }
}
</script>

<template>
  <div
    class="relative overflow-hidden rounded-2xl p-2
           ring-1 ring-white/10
           shadow-lg shadow-black/30
           transition hover:scale-[1.02] hover:shadow-xl"
    :style="gradientStyle(pokemon.types)"
    @click="emit('open', pokemon.id)"
  >
    <div class="flex flex-col items-center justify-between">
      <img
        :src="pokemon.img"
        :alt="pokemon.name"
        class="h-16 w-16 drop-shadow"
        loading="lazy"
      />
      <div>
        <div class="text-base text-center font-bold text-white">{{ pokemon.name }}</div>
        <div class="text-xs text-center text-white/80">{{ pokemon.num }}</div>

        <div class="mt-2 justify-center flex flex-wrap gap-2">
          <TypePill v-for="t in pokemon.types" :key="t" :type="t" />
        </div>
      </div>


    </div>
  </div>
</template>
