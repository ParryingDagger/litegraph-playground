<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import LitegraphPlayground from './views/LitegraphPlayground.vue'
import Button from 'primevue/button'
import router from './router'
import { ref, onMounted, watch } from 'vue'

const active = ref('/')

function handleRoute(to: string) {
  this.active = to
}

watch(active, (to) => {
  router.push(to)
})

onMounted(() => {
  console.log('onMounted', active)
})
</script>

<template>
  <div class="app-container">
    <LitegraphPlayground />
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  width: 100vw;
  height: 2rem;
  background-color: #000;
}

.app-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
</style>
