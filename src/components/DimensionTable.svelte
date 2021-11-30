<script lang="ts">
  import { dimensions } from '../stores/dimension';
  import Dimension from '../components/Dimension.svelte';
</script>

{#each $dimensions as dimension, n}
  <Dimension {n} />
{/each}
