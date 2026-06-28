<script setup lang="ts">
import AppNav from './AppNav.vue'
</script>

<template>
  <header class="app-header">
    <h1 class="app-title">校园轻集市</h1>
    <AppNav />
  </header>
</template>

<style scoped>
.app-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding-bottom: 8px;
}

.app-title {
  font-size: 20px;
  font-weight: 600;
  color: #333333;
  margin: 12px 0;
}
</style>
