<script lang="ts">
  import { dimensions } from '@/stores/dimension';
  import { antimatter } from '@/stores/antimatter';
  import Fa from 'svelte-fa';
  import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

  export let n: number;

  //TODO: move
  const buy = (count: number) => {
    if (canAfford(count)) {
      $dimensions[n].owned++;
      $antimatter -= $dimensions[n].cost;
      if ($dimensions[n].owned >= 10) {
        $dimensions[n + 1].unlocked = true;
        $dimensions[n].cost = $dimensions[n].cost * 100;
        $dimensions[n].multi = $dimensions[n].multi * 2;
      }
    }
  };

  $: canAfford = (count: number) => {
    return $antimatter >= $dimensions[n].cost * count;
  };

  $: progress = (count: number): string => {
    const progress = $antimatter / ($dimensions[n].cost * count);
    if (progress >= 1) {
      return '100%';
    } else {
      return `${progress * 100}%`;
    }
  };
</script>

<div class="flex flex-row w-[400px] font-bold text-gray-100 shadow-lg select-none rounded-xl bg-slate-800">
  <div class="flex flex-col flex-grow">
    <!-- Header -->
    <div class="flex items-center justify-between pt-4 pl-4 space-x-3">
      <Fa icon={faCircleNotch} class="text-yellow-600" scale={1.5} spin={$dimensions[n].owned >= 1} />
      <div class="flex-grow mr-auto text-white text-md">{$dimensions[n].displayName}</div>
    </div>
    <!-- Content -->
    <div class="flex mt-3 text-sm">
      <!-- Summary -->
      <div class="flex flex-col flex-grow pb-4 pl-4">
        <div>Owned: {$dimensions[n].owned.toFixed(0)}</div>
        <div>Multiplier: {$dimensions[n].multi}x</div>
      </div>
    </div>
  </div>
  <!-- Actions -->
  <div class="flex flex-col overflow-hidden font-bold align-middle bg-slate-700 rounded-r-xl">
    <!-- Buy One -->
    <div
      class="flex flex-col justify-end w-full h-full group hover:text-gray-100 hover:cursor-pointer notouch"
      on:click={() => buy(1)}
    >
      <span class="absolute self-center pb-3 {!canAfford(1) ? 'text-gray-400' : ''}">+1</span>
      <div class="w-12 align-bottom group-hover:bg-slate-500 bg-slate-600" style="height: {progress(1)}" />
    </div>
    <!-- Buy Until -->
    <div class="flex flex-col justify-end w-full h-full group hover:text-gray-100 hover:cursor-pointer notouch">
      <span class="absolute self-center pb-3 {!canAfford(10) ? 'text-gray-400' : ''}">+10</span>
      <div class="w-12 align-bottom group-hover:bg-slate-500 bg-slate-600" style="height: {progress(10)}" />
    </div>
  </div>
</div>

<style>
  .notouch {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-tap-highlight-color: transparent;
  }
</style>
