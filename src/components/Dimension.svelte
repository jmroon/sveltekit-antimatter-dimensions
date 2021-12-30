<script lang="ts">
  import { useDimension } from '@/stores/gameState';
  import Fa from 'svelte-fa';
  import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

  export let n: number;
  let { dimension, canAfford, canAffordUntil, progress, progressUntil, untilCount, buy, buyUntil } = useDimension(n);
</script>

<div
  class="flex flex-row w-[400px] font-bold text-gray-100 shadow-slate-300 shadow-lg select-none rounded-xl bg-slate-800"
>
  <div class="flex flex-col flex-grow">
    <!-- Header -->
    <div class="flex items-center justify-between pt-4 pl-4 space-x-3">
      <Fa icon={faCircleNotch} class="text-yellow-600" scale={1.5} spin={$dimension.owned >= 1} />
      <div class="flex-grow mr-auto text-white text-md">{$dimension.displayName}</div>
    </div>
    <!-- Content -->
    <div class="flex mt-3 text-sm">
      <!-- Summary -->
      <div class="flex flex-col flex-grow pb-4 pl-4">
        <div>Owned: {$dimension.owned.toFixed(0)}</div>
        <div>Multiplier: {$dimension.multi}x</div>
      </div>
    </div>
  </div>
  <!-- Actions -->
  <div class="flex flex-col overflow-hidden font-bold align-middle bg-slate-700 rounded-r-xl">
    <!-- Buy One -->
    <div
      class="flex flex-col justify-end w-full h-full group hover:text-gray-100 hover:cursor-pointer notouch"
      on:click={buy}
    >
      <span class="fixed self-center pb-3 {!$canAfford ? 'text-gray-400' : ''}">+1</span>
      <div class="w-12 align-bottom group-hover:bg-slate-500 bg-slate-600" style="height: {$progress}" />
    </div>
    <!-- Buy Until -->
    <div
      class="flex flex-col justify-end w-full h-full group hover:text-gray-100 hover:cursor-pointer notouch"
      on:click={buyUntil}
    >
      <span class="fixed self-center pb-3 {!$canAffordUntil ? 'text-gray-400' : ''}">+{$untilCount}</span>
      <div class="w-12 align-bottom group-hover:bg-slate-500 bg-slate-600" style="height: {$progressUntil}" />
    </div>
  </div>
</div>

<style>
  .notouch {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-tap-highlight-color: transparent;
  }
</style>
