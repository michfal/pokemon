<script setup>
  import pokeBall from "@/assets/poke-ball.png"
</script>

<template>
  <div class="text-center">
    <div class="inline-flex items-center gap-3">
      <img
        :src="pokeBall"
        alt="Poké Ball"
        class="h-7 w-7 drop-shadow"
      />
      <h1
        class="text-3xl font-extrabold tracking-tight
               bg-gradient-to-r from-orange-600 to-orange-400
               bg-clip-text text-transparent"
      >
        Pokémon Explorer
      </h1>
    </div>
  </div>
</template>
