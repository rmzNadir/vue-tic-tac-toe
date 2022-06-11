<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faX, faO } from '@fortawesome/free-solid-svg-icons';
import { inject } from 'vue';
import { colors } from '@/utils';

export interface Tile {
  tileType: null | 'x' | 'o';
  id: string;
}

export interface BoardTileProps {
  tile: Tile;
}

export interface BoardTileEmits {
  onTileClick(tile: Tile): void;
}

const appColor = inject<string>('app-color');

defineProps<BoardTileProps>();
defineEmits<BoardTileEmits>();
</script>

<template>
  <div
    class="p-5 rounded-xl aspect-square h-40 hover:scale-105 active:scale-100 transition cursor-pointer"
    :style="{
      backgroundColor: appColor ?? colors['rose']['500'],
      transition: 'background-color 1.5s',
    }"
    @click="$emit('onTileClick', tile)"
  >
    <FontAwesomeIcon
      v-if="tile.tileType === 'x'"
      :icon="faX"
      class="h-full w-full"
    />
    <FontAwesomeIcon
      v-if="tile.tileType === 'o'"
      :icon="faO"
      class="h-full w-full"
    />
  </div>
</template>

<style scoped></style>
