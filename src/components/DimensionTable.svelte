<script lang="ts">
  import { gameState } from '@/stores/game-state';
  import Dimension from '@/components/Dimension.svelte';
</script>

<div class="flex flex-wrap justify-center max-w-full mx-auto mt-2">
  {#each $gameState.dimensions.filter((d) => d.unlocked) as dimension, n}
    <div class="flex">
      <Dimension {n} />
    </div>
  {/each}
</div>
