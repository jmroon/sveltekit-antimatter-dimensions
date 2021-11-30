<script lang="ts">
  import { dimensions } from '@/stores/dimension';
  import { antimatter } from '@/stores/antimatter';

  export let n: number;

  const buyOne = () => {
    if (canAfford) {
      $dimensions[n].owned++;
      $antimatter -= $dimensions[n].cost;
      if ($dimensions[n].owned >= 10) {
        $dimensions[n + 1].unlocked = true;
      }
    }
  };

  $: canAfford = $antimatter >= $dimensions[n].cost;
</script>

{#if $dimensions[n].unlocked}
  <div class="flex justify-between py-2">
    <div class="w-[192px] mx-1 font-semibold whitespace-nowrap">{$dimensions[n].displayName}</div>
    <div class="flex-grow w-1/4 text-center mr-10 self-center">{Math.floor($dimensions[n].owned)}</div>
    <button
      class="w-1/4 max-w-[128px] rounded-md bg-yellow-100 p-2 mx-1 font-semibold disabled:bg-gray-100 disabled:text-gray-400"
      on:click={buyOne}
      disabled={!canAfford}>Cost: {$dimensions[n].cost}</button
    >
  </div>
{/if}
