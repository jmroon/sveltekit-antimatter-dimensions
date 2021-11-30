import { writable } from 'svelte/store';

export interface Dimension {
  dimensionNumber: number;
  displayName: string;
  baseCost: number;
  owned: number;
}

export const dimensions = writable<Dimension[]>([
  {
    dimensionNumber: 1,
    displayName: '1st Dimension',
    baseCost: 10 ** 1, 
    owned: 0,
  },
  {
    dimensionNumber: 2,
    displayName: '2nd Dimension',
    baseCost: 10 ** 2,
    owned: 0,
  },
  {
    dimensionNumber: 3,
    displayName: '3rd Dimension',
    baseCost: 10 ** 3,
    owned: 0,
  },
  {
    dimensionNumber: 4,
    displayName: '4th Dimension',
    baseCost: 10 ** 4,
    owned: 0,
  },
]);
