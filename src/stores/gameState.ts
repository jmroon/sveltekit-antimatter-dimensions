import { derived, writable } from 'svelte/store';
import type { Readable } from 'svelte/store';

export interface GameState {
  antimatter: number;
  dimensions: Dimension[];
}
export interface Dimension {
  dimensionNumber: number;
  displayName: string;
  cost: number;
  owned: number;
  unlocked: boolean;
  multi: number;
}

export interface DimensionStore {
  dimension: Readable<Dimension>;
  canAfford: Readable<boolean>;
  canAffordUntil: Readable<boolean>;
  progress: Readable<string>;
  progressUntil: Readable<string>;
  untilCount: Readable<number>;
  buy: () => void;
  buyUntil: () => void;
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

export function useDimension(n: number): DimensionStore {
  return {
    dimension: derived(gameState, ($state) => $state.dimensions[n]),
    canAfford: derived(gameState, ($state) => $state.antimatter >= $state.dimensions[n].cost),
    canAffordUntil: derived(
      gameState,
      ($state) => $state.antimatter >= $state.dimensions[n].cost * (10 - ($state.dimensions[n].owned % 10))
    ),
    progress: derived(gameState, ($state) => {
      const progress = $state.antimatter / $state.dimensions[n].cost;
      if (progress >= 1) {
        return '100%';
      } else {
        return `${progress * 100}%`;
      }
    }),
    progressUntil: derived(gameState, ($state) => {
      const progress = $state.antimatter / ($state.dimensions[n].cost * (10 - ($state.dimensions[n].owned % 10)));
      if (progress >= 1) {
        return '100%';
      } else {
        return `${progress * 100}%`;
      }
    }),
    untilCount: derived(gameState, ($state) => 10 - ($state.dimensions[n].owned % 10)),
    buy() {
      gameState.update(($state) => buyDimensions($state, n, 1));
    },
    buyUntil() {
      gameState.update(($state) => buyDimensions($state, n, 10 - ($state.dimensions[n].owned % 10)));
    },
  };
}

function buyDimensions($state: GameState, n: number, count: number): GameState {
  if ($state.antimatter >= $state.dimensions[n].cost * count) {
    $state.dimensions[n].owned += count;
    $state.antimatter -= $state.dimensions[n].cost;
    if ($state.dimensions[n].owned >= 10) {
      $state.dimensions[n + 1].unlocked = true;
      $state.dimensions[n].cost *= 100;
      $state.dimensions[n].multi *= 2;
    }
  }
  return $state;
}
