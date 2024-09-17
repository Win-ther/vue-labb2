<script setup>
import Hero from "@/components/Hero.vue";
import Tasks from "@/components/Tasks.vue";
</script>

<template>
  <Hero/>
  <Tasks :limit="3"/>
</template>
