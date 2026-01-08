<script setup>
import { typeColors } from "@/utils/typeColors"
import { isLightHex } from "@/utils/color"

const props = defineProps({
  types: { type: Array, required: true },
  modelValue: { type: Array, required: true },
})
const emit = defineEmits(["update:modelValue"])

const isOn = (t) => props.modelValue.includes(t)

const toggle = (t) => {
  const next = new Set(props.modelValue)
  if (next.has(t)) next.delete(t)
  else next.add(t)
  emit("update:modelValue", Array.from(next))
}

const clearAll = () => emit("update:modelValue", [])

const chipStyle = (t) => ({ backgroundColor: typeColors[t] })
const chipTextClass = (t) => (isLightHex(typeColors[t]) ? "text-black" : "text-white")
</script>

<template>
  <div class="flex flex-wrap justify-center gap-2">
    <!-- Clear -->
    <button
      type="button"
      @click="clearAll"
      class="rounded-full px-3 py-1 text-xs font-semibold
             bg-white/10 text-zinc-100
             ring-1 ring-white/15
             transition hover:scale-[1.03] active:scale-[0.98]"
      :class="modelValue.length === 0 ? 'ring-2 ring-white/60 shadow-md shadow-black/30' : 'opacity-90'"
    >
      All
    </button>

    <!-- Types -->
    <button
      v-for="t in types"
      :key="t"
      type="button"
      @click="toggle(t)"
      class="rounded-full px-3 py-1 text-xs font-semibold
             ring-1 ring-white/15 backdrop-blur
             transition hover:scale-[1.03] active:scale-[0.98]"
      :class="[
        chipTextClass(t),
        isOn(t) ? 'ring-2 ring-white/70 shadow-md shadow-black/30' : 'opacity-90'
      ]"
      :style="chipStyle(t)"
    >
      {{ t.charAt(0).toUpperCase() + t.slice(1) }}
    </button>
  </div>
</template>
