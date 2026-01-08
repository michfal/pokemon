<script setup>
import { watch } from "vue"
import { Dialog } from "@ark-ui/vue/dialog"
import { usePokemonDetailsLite } from "@/composables/usePokemonDetails"

const props = defineProps({
  open: { type: Boolean, required: true },
  pokemonIdOrName: { type: [String, Number], default: null },
})
const emit = defineEmits(["update:open"])

const { pokemon, loading, error, load } = usePokemonDetailsLite()

watch(
  () => [props.open, props.pokemonIdOrName],
  ([isOpen, id]) => {
    if (isOpen && id) load(id)
  }
)
</script>

<template>
  <Dialog.Root :open="open" @open-change="emit('update:open', $event.open)">
    <Dialog.Backdrop class="fixed inset-0 bg-black/60" />

    <Dialog.Positioner class="fixed inset-0 flex items-center justify-center p-4">
      <Dialog.Content
        class="w-full max-w-xl rounded-2xl bg-zinc-950 text-zinc-100
               ring-1 ring-white/10 shadow-xl"
      >
        <div class="flex items-start justify-between gap-4 p-6">
          <div>
            <Dialog.Title class="text-xl font-extrabold">
              {{ pokemon?.name ?? "Pokémon" }}
            </Dialog.Title>
            <Dialog.Description class="mt-1 text-sm text-zinc-400">
              Details
            </Dialog.Description>
          </div>

          <Dialog.CloseTrigger
            class="rounded-full px-3 py-1 text-sm font-semibold bg-white/10 ring-1 ring-white/15
                   hover:bg-white/15 transition"
          >
            Close
          </Dialog.CloseTrigger>
        </div>

        <div class="px-6 pb-6">
          <div v-if="loading" class="py-10 text-center text-zinc-400">Load…</div>
          <div v-else-if="error" class="py-10 text-center text-red-400">{{ error }}</div>

          <div v-else-if="pokemon" class="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
            <div class="flex flex-col gap-4 md:flex-row md:items-center">
              <div class="flex justify-center md:block">
                <img
                  v-if="pokemon.img"
                  :src="pokemon.img"
                  :alt="pokemon.name"
                  class="h-28 w-28 rounded-xl bg-black/20 object-contain p-2"
                />
                <div v-else class="h-28 w-28 rounded-xl bg-black/20" />
              </div>

              <div class="flex-1">
                <div class="text-sm text-zinc-400">
                  {{ pokemon.num }} • Height: {{ pokemon.height }} • Weight: {{ pokemon.weight }}
                </div>

                <div class="mt-3 flex flex-wrap gap-2">
                  <span
                    v-for="t in pokemon.types"
                    :key="t"
                    class="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold ring-1 ring-white/10"
                  >
                    {{ t }}
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </Dialog.Content>
    </Dialog.Positioner>
  </Dialog.Root>
</template>
