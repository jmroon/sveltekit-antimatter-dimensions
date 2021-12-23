<script context="module">
  export const ssr = false;
</script>

<script lang="ts">
  import AntimatterDisplay from '@/components/AntimatterDisplay.svelte';
  import DimensionTable from '@/components/DimensionTable.svelte';
</script>

<div class="max-w-full">
  <DimensionTable />
</div>
