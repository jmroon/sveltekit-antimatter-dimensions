<script lang="ts">
  import { dimensions } from '../stores/dimension';
  import { antimatter } from '../stores/antimatter';

  export let n: number;

  const buyOne = () => {
    $dimensions[n].owned++;
  };

  const buyUntil = () => {
    $dimensions[n].owned = buyUntilCount;
  };

  $: buyUntilCount = Math.floor($dimensions[n].owned) + 10 - (Math.floor($dimensions[n].owned) % 10);
  $: buyUntilCost = buyUntilCount * $dimensions[n].baseCost;

  let lastTime = performance.now();

  const gameLoop =
    n == 0
      ? () => {
          console.log(' do something ');
          requestAnimationFrame(gameLoop);
        }
      : () => {};

  gameLoop();
</script>

<div class="flex justify-between py-2">
  <div class="w-[192px] mx-1 font-semibold whitespace-nowrap">{$dimensions[n].displayName}</div>
  <div class="flex-grow w-1/4 text-center mr-10 self-center">{$dimensions[n].owned.toFixed(0)}</div>
  <button class="w-1/4 max-w-[128px] rounded-md bg-yellow-100 p-2 mx-1 font-semibold" on:click={buyOne}
    >Cost: {$dimensions[n].baseCost}</button
  >
  <button class="w-1/4 max-w-[192px] rounded-md bg-yellow-100 p-2 mx-1 font-semibold" on:click={buyUntil}
    >Cost: {buyUntilCost}</button
  >
</div>
