<script setup lang="ts">
import { colors } from '@/utils';
import { computed, inject, ref } from 'vue';
import BoardTile, { type Tile } from './BoardTile.vue';
import BoardHeader from './BoardHeader.vue';

const appColor = inject<string>('app-color');

const generateBoard = () => {
  return Array.from({ length: 9 }, (_, index) => ({
    id: `tile-${index}`,
    tileType: null,
  }));
};

const board = ref(generateBoard());
const totalMoves = ref(0);
const turn = ref<NonNullable<Tile['tileType']>>('x');
const gameWinner = ref<Tile['tileType']>(null);

const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const validateBoard = () => {
  for (const position of winningPositions) {
    let [a, b, c] = position;

    const unwrappedBoard = board.value;

    if (
      unwrappedBoard[a].tileType !== null &&
      unwrappedBoard[a].tileType === unwrappedBoard[b].tileType &&
      unwrappedBoard[a].tileType === unwrappedBoard[c].tileType
    ) {
      return true;
    }
  }
  return false;
};

function toggleTurn() {
  turn.value = turn.value === 'x' ? 'o' : 'x';
}

const handleTileClick = (tile: Tile, turn: Tile['tileType']) => {
  if (tile.tileType || gameWinner.value) return;

  tile.tileType = turn;
  totalMoves.value++;
  if (totalMoves.value > 4) {
    const isGameWon = validateBoard();

    if (isGameWon) {
      gameWinner.value = turn;
      return;
    }

    if (totalMoves.value === 9) {
      return;
    }
  }

  toggleTurn();
};

const resetBoard = () => {
  board.value = generateBoard();
  totalMoves.value = 0;
  turn.value = 'x';
  gameWinner.value = null;
};

const isGameFinished = computed(
  () => totalMoves.value === 9 || !!gameWinner.value
);
</script>

<template>
  <div class="flex flex-col gap-5">
    <BoardHeader @reset-board="resetBoard" :is-game-finished="isGameFinished" />
    <div
      class="border relative p-10 rounded-xl grid grid-cols-3 gap-5"
      :style="{
        borderColor: appColor ?? colors['rose']['500'],
        transition: 'border-color color 1.5s',
      }"
    >
      <div
        v-show="isGameFinished"
        class="absolute rounded-xl z-10 bg-neutral-900 w-full h-full opacity-80 flex items-center justify-center flex-col gap-5 transition-all"
      >
        <h2 class="text-5xl">Game over</h2>
        <p class="text-4xl">
          {{ gameWinner ? `${gameWinner.toUpperCase()} wins!` : "It's a tie!" }}
        </p>
      </div>
      <BoardTile
        v-for="tile in board"
        :tile="tile"
        :key="tile.id"
        @on-tile-click="(tile) => handleTileClick(tile, turn)"
      />
    </div>
  </div>
</template>

<style scoped></style>
