<script lang="ts">
  import { dimensions } from '@/stores/dimension';
  import Dimension from '@/components/Dimension.svelte';
</script>

<div class="flex max-w-full mx-auto flex-wrap">
  {#each $dimensions.filter((d) => d.unlocked) as dimension, n}
    <div class="flex-grow m-5">
      <Dimension {n} />
    </div>
  {/each}
</div>
