import type { GameState } from '@/stores/game-state';

export function gameLoop(state: GameState, deltaT: number) {
  const currentTime = performance.now();

  state.dimensions.forEach((d, i) => {
    const amountToAdd = Math.floor(state.dimensions[i].owned) * state.dimensions[i].multi * deltaT;
    if (i === 0) {
      state.antimatter += amountToAdd;
    } else {
      state.dimensions[i - 1].owned += amountToAdd;
    }
  });

  state.lastTick = currentTime;

  return state;
}
