import { derived, writable } from 'svelte/store';
import { buyDimensions, canAfford, progress, untilCount } from '@/game/dimension';

import type { Dimension } from '@/game/dimension';

export interface GameState {
  antimatter: number;
  dimensions: Dimension[];
}
export const gameState = writable<GameState>({
  antimatter: 10,
  dimensions: [
    { dimensionNumber: 1, displayName: '1st Dimension', cost: 10 ** 1, owned: 0, unlocked: true, multi: 1 },
    { dimensionNumber: 2, displayName: '2nd Dimension', cost: 10 ** 2, owned: 0, unlocked: false, multi: 1 },
    { dimensionNumber: 3, displayName: '3rd Dimension', cost: 10 ** 3, owned: 0, unlocked: false, multi: 1 },
    { dimensionNumber: 4, displayName: '4th Dimension', cost: 10 ** 4, owned: 0, unlocked: false, multi: 1 },
  ],
});

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
