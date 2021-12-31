<script lang="ts">
  import { useDimension } from '@/stores/game-state';
  import Fa from 'svelte-fa';
  import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

  export let n: number;
  let { dimension, canAfford, canAffordUntil, progress, progressUntil, untilCount, buy, buyUntil } = useDimension(n);

  $: owned = Math.floor($dimension.owned).toPrecision(5);
  $: formattedUntilCount = Math.floor($untilCount);
</script>

<!-- {#if isUnlocked}  
  Unlocked
{/if} -->

<div class="flex flex-row font-bold text-gray-100 shadow-slate-300 shadow-lg select-none rounded-xl bg-slate-800 m-1">
  <div class="flex flex-col mr-6">
    <!-- Header -->
    <div class="flex items-center justify-between pt-4 pl-4 space-x-3 flex-nowrap">
      <Fa icon={faCircleNotch} class="text-yellow-600" scale={1.5} spin={$dimension.owned >= 1} />
      <div class="flex-grow mr-auto text-white text-md whitespace-nowrap">{$dimension.displayName}</div>
    </div>
    <!-- Content -->
    <div class="flex mt-3 text-sm">
      <!-- Summary -->
      <div class="flex flex-col flex-grow pb-4 pl-4">
        <div>Owned: {owned}</div>
        <div>Multiplier: {$dimension.multi}x</div>
      </div>
    </div>
  </div>
  <!-- Extra Info Div for larger screens -->
  <div class="flex-grow">
    <div class="hidden md:flex px-6 flex-col justify-center items-center whitespace-nowrap min-w-[2rem] w-full h-full">
      <span>Optional content for larger screens.</span>
      <span>A graph would be cool</span>
    </div>
  </div>
  <!-- Actions -->
  <div class="flex flex-col overflow-hidden font-bold align-middle bg-slate-700 rounded-r-xl">
    <!-- Buy One -->
    <div
      class="flex flex-col justify-end h-full w-12 group hover:text-gray-100 hover:cursor-pointer notouch relative"
      on:click={buy}
    >
      <span class="self-center pb-3 {!$canAfford ? 'text-gray-400' : ''} z-20">+1</span>
      <div
        class="align-bottom group-hover:bg-slate-500 bg-slate-600 absolute w-full z-10"
        style="height: {$progress}"
      />
    </div>
    <!-- Buy Until -->
    <div
      class="flex flex-col justify-end w-12 h-full group hover:text-gray-100 hover:cursor-pointer notouch relative"
      on:click={buyUntil}
    >
      <span class="self-center pb-3 {!$canAffordUntil ? 'text-gray-400' : ''} z-20">+{formattedUntilCount}</span>
      <div
        class="align-bottom group-hover:bg-slate-500 bg-slate-600 absolute w-full z-10"
        style="height: {$progressUntil}"
      />
    </div>
  </div>
</div>

<style>
  .notouch {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-tap-highlight-color: transparent;
  }
</style>
