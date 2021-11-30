import { writable } from 'svelte/store';

export interface Dimension {
  dimensionNumber: number;
  displayName: string;
  cost: number;
  owned: number;
  unlocked: boolean;
}

export const dimensions = writable<Dimension[]>([
  {
    dimensionNumber: 1,
    displayName: '1st Dimension',
    cost: 10 ** 1,
    owned: 0,
    unlocked: true,
  },
  {
    dimensionNumber: 2,
    displayName: '2nd Dimension',
    cost: 10 ** 2,
    owned: 0,
    unlocked: false,
  },
  {
    dimensionNumber: 3,
    displayName: '3rd Dimension',
    cost: 10 ** 3,
    owned: 0,
    unlocked: false,
  },
  {
    dimensionNumber: 4,
    displayName: '4th Dimension',
    cost: 10 ** 4,
    owned: 0,
    unlocked: false,
  },
]);
