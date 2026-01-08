<script setup>
import { typeColors } from "@/utils/typeColors"
import { isLightHex } from "@/utils/color"

const props = defineProps({ type: { type: String, required: true } })

</script>

<template>
  <span class="rounded-full px-3 py-1 text-xs font-semibold shadow-sm bg-white/20">
    {{ type }}
  </span>
</template>
