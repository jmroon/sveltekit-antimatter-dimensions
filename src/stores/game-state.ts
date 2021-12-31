import { derived, writable } from 'svelte/store';
import { buyDimensions, canAfford, progress, untilCount } from '@/game/dimension';

import type { Dimension } from '@/game/dimension';
import { gameLoop } from '@/game/game-loop';

export interface GameState {
  antimatter: number;
  dimensions: Dimension[];
  lastTick: number;
}
export const gameState = writable<GameState>(
  {
    antimatter: 10,
    dimensions: [
      { dimensionNumber: 1, displayName: '1st', cost: 10 ** 1, owned: 0, unlocked: true, multi: 1 },
      { dimensionNumber: 2, displayName: '2nd', cost: 10 ** 2, owned: 0, unlocked: true, multi: 1 },
      { dimensionNumber: 3, displayName: '3rd', cost: 10 ** 3, owned: 0, unlocked: true, multi: 1 },
      { dimensionNumber: 4, displayName: '4th', cost: 10 ** 4, owned: 0, unlocked: true, multi: 1 },
    ],
    lastTick: performance.now(),
  },
  () => {
    function loop() {
      gameState.update((state) => gameLoop(state, (performance.now() - state.lastTick) / 1000));
      requestAnimationFrame(loop);
    }
    loop();
  }
);

export const antimatter = derived(gameState, ($state) => $state.antimatter);

export function useDimension(n: number) {
  return {
    dimension: derived(gameState, ($state) => $state.dimensions[n]),
    canAfford: derived(gameState, ($state) => canAfford($state, n, false)),
    canAffordUntil: derived(gameState, ($state) => canAfford($state, n, true)),
    progress: derived(gameState, ($state) => progress($state, n, false)),
    progressUntil: derived(gameState, ($state) => progress($state, n, true)),
    untilCount: derived(gameState, ($state) => untilCount($state, n)),
    buy: () => gameState.update(($state) => buyDimensions($state, n, false)),
    buyUntil: () => gameState.update(($state) => buyDimensions($state, n, true)),
  };
}
