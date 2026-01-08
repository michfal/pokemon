<script setup>
import { Field } from "@ark-ui/vue/field"

defineProps({
  modelValue: { type: String, required: true },
})
const emit = defineEmits(["update:modelValue"])
</script>

<template>
  <Field.Root class="w-full max-w-xl mx-auto">
    <Field.Label class="sr-only">Search</Field.Label>
    <Field.Input
      :value="modelValue"
      @input="emit('update:modelValue', $event.target.value)"
      placeholder="Search Pokémon..."
      class="w-full rounded-full bg-zinc-900/70 px-6 py-3 text-sm
             ring-1 ring-white/10 outline-none
             placeholder:text-zinc-500
             focus:ring-2 focus:ring-orange-400/70
             focus:shadow-[0_0_0_6px_rgba(251,146,60,0.12)]"
    />
  </Field.Root>
</template>
