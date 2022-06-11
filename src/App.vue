<script setup lang="ts">
import { onUnmounted, provide, ref } from 'vue';
import GameBoard from './components/GameBoard.vue';
import { colors, colorNames, colorTones } from './utils';

let colorIndex = 0;
let toneIndex = 0;
const currentColor = ref();

const colorInterval = setInterval(() => {
  currentColor.value = colors[colorNames[colorIndex]][colorTones[toneIndex]];

  if (toneIndex === colorTones.length - 1) {
    colorIndex = colorIndex === colorNames.length - 1 ? 0 : colorIndex + 1;

    toneIndex = 0;
    return;
  }

  toneIndex++;
}, 2000);

provide('app-color', currentColor);

onUnmounted(() => {
  clearInterval(colorInterval);
});
</script>

<template>
  <main class="m-auto h-full w-1/2 flex items-center justify-center -mt-20">
    <GameBoard />
  </main>
</template>
