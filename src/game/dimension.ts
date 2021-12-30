import type { GameState } from '@/stores/gameState';

export function buyDimensions(state: GameState, n: number, until: boolean): GameState {
  const count = until ? untilCount(state, n) : 1;
  if (state.antimatter >= state.dimensions[n].cost * count) {
    state.dimensions[n].owned += count;
    state.antimatter -= state.dimensions[n].cost;
    if (state.dimensions[n].owned >= 10) {
      state.dimensions[n + 1].unlocked = true;
      state.dimensions[n].cost *= 100;
      state.dimensions[n].multi *= 2;
    }
  }
  return state;
}

export function canAfford(state: GameState, n: number, until: boolean): boolean {
  const count = until ? untilCount(state, n) : 1;
  return state.antimatter >= state.dimensions[n].cost * count;
}

export function untilCount(state: GameState, n: number): number {
  return 10 - (state.dimensions[n].owned % 10);
}

export function progress(state: GameState, n: number, until: boolean): string {
  const count = until ? untilCount(state, n) : 1;
  const progress = state.antimatter / (state.dimensions[n].cost * count);
  if (progress >= 1) {
    return '100%';
  } else {
    return `${progress * 100}%`;
  }
}
