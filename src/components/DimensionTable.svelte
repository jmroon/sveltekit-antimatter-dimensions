<script lang="ts">
  import { gameState } from '@/stores/game-state';
  import Dimension from '@/components/Dimension.svelte';
</script>

<div class="flex flex-wrap justify-center max-w-full mx-auto">
  {#each $gameState.dimensions.filter((d) => d.unlocked) as dimension, n}
    <div class="flex justify-center flex-grow m-5">
      <Dimension {n} />
    </div>
  {/each}
</div>
