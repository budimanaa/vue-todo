<script setup>
import { RouterView, RouterLink } from "vue-router";
import HeaderVue from "./components/layouts/Header.vue";
</script>

<template>
  <HeaderVue />
  <div class="flex items-center justify-center gap-8 p-4">
    <RouterLink
      active-class="text-sky-600"
      to="/"
      class="inline-flex text-base font-medium tracking-widest uppercase hover:text-sky-700"
      >Home</RouterLink
    >
    <p class="text-xl">|</p>
    <RouterLink
      active-class="text-sky-600"
      to="/list"
      class="inline-flex text-base font-medium tracking-widest uppercase hover:text-sky-700"
      >List</RouterLink
    >
  </div>
  <RouterView />
</template>
