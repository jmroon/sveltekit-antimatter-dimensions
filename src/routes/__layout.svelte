<script lang="ts">
  import '@/app.css';

  import { prefetchRoutes } from '$app/navigation';
  import { browser } from '$app/env';
  import AntimatterDisplay from '@/components/AntimatterDisplay.svelte';

  const loadRoutes = async () => {
    if (browser) {
      await prefetchRoutes();
    }
  };
  loadRoutes();
</script>

<div class="flex flex-col h-screen w-screen bg-slate-100">
  <nav class="flex items-center p-5 text-xl text-center text-gray-100 justify-between bg-slate-800 drop-shadow-md">
    <a href="/">Dimensions</a>
    <AntimatterDisplay />
    <a href="/options">Options</a>
  </nav>
  <slot />
</div>
