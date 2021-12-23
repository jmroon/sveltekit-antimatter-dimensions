<script lang="ts">
  import { dimensions } from '@/stores/dimension';
  import { antimatter } from '@/stores/antimatter';
  import Fa from 'svelte-fa';
  import { faCircleNotch, faPlus, faPlusSquare } from '@fortawesome/free-solid-svg-icons';

  export let n: number;

  //TODO: move
  const buyOne = () => {
    if (canAfford()) {
      $dimensions[n].owned++;
      $antimatter -= $dimensions[n].cost;
      if ($dimensions[n].owned >= 10) {
        $dimensions[n + 1].unlocked = true;
        $dimensions[n].cost = $dimensions[n].cost * 100;
        $dimensions[n].multi = $dimensions[n].multi * 2;
      }
    }
  };

  $: canAfford = () => {
    return $antimatter >= $dimensions[n].cost;
  };
</script>

{#if $dimensions[n].unlocked}
  <div class="flex flex-row bg-gray-800 text-white w-[28rem] max-w-sm rounded-xl shadow-lg p-4 mx-auto select-none">
    <div class="flex flex-grow flex-col">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div class="text-gray-500 hover:text-gray-300 cursor-pointer">
          <Fa icon={faCircleNotch} class="text-purple-500" scale={1.5} spin />
        </div>
        <div class="text-md font-bold mr-auto ml-3">{$dimensions[n].displayName}</div>
      </div>
      <!-- Content -->
      <div class="flex text-sm mt-3">
        <!-- Summary -->
        <div class="flex flex-col flex-grow">
          <div class="text-gray-500 font-bold">Owned: {$dimensions[n].owned.toFixed(0)}</div>
          <div class="text-gray-500 font-bold">Multiplier: {$dimensions[n].multi}x</div>
        </div>
        <!-- Actions -->
        <div class="flex flex-col items-end font-bold">
          <div class="text-gray-500 hover:text-gray-300 hover:cursor-pointer" on:click={buyOne}>
            Buy One <Fa icon={faPlus} class="inline text-gray-300" />
          </div>
          <div class="text-gray-500 hover:text-gray-300 hover:cursor-pointer">
            Buy Until 10 <Fa icon={faPlus} class="inline text-gray-300" />
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}
