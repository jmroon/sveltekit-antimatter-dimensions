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
  <div class="flex justify-around py-2 items-center">
    <div class="font-semibold whitespace-nowrap">{$dimensions[n].displayName}</div>
    <div class="ml-5">{Math.floor($dimensions[n].owned)}</div>
    <button class="btn btn-primary w-[30] ml-5" on:click={buyOne} disabled={!canAfford}
      >Cost: {$dimensions[n].cost}</button
    >
    <button class="btn btn-primary w-[30] ml-5" on:click={buyOne} disabled={!canAfford}
      >Cost: {$dimensions[n].cost}</button
    >
  </div>
{/if}
