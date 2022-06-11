<script setup lang="ts">
import { inject } from 'vue';
import { colors } from '@/utils';

export interface BoardHeaderProps {
  isGameFinished: boolean;
}

export interface BoardHeaderEmits {
  resetBoard(): void;
}

const appColor = inject<string>('app-color');

defineProps<BoardHeaderProps>();
defineEmits<BoardHeaderEmits>();
</script>

<template>
  <div
    class="border rounded-xl p-10 flex items-center justify-between min-h-[8.5rem]"
    :style="{
      color: appColor ?? colors['rose']['500'],
      borderColor: appColor ?? colors['rose']['500'],
      transition: 'border-color 1.5s, color 1.5s',
    }"
  >
    <h1 class="text-5xl">Tic-Tac-Toe</h1>
    <button
      v-show="isGameFinished"
      class="text-xl text-white rounded-md p-3 active hover:scale-105 active:scale-100 transition-transform"
      :style="{
        backgroundColor: appColor ?? colors['rose']['500'],
        transition: 'background-color 1.5s',
      }"
      @click="$emit('resetBoard')"
    >
      Reset board
    </button>
  </div>
</template>

<style scoped></style>
