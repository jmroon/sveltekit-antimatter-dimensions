<script lang="ts">
  import '@/app.css';

  import { dimensions } from '@/stores/dimension';
  import { antimatter } from '@/stores/antimatter';
  import { prefetchRoutes } from '$app/navigation';
  import { browser } from '$app/env';
  import AntimatterDisplay from '@/components/AntimatterDisplay.svelte';

  const loadRoutes = async () => {
    if (browser) {
      await prefetchRoutes();
      gameLoop();
    }
  };

  let lastTime = performance.now();

  function gameLoop() {
    const currentTime = performance.now();
    const delta = (currentTime - lastTime) / 1000;

    $dimensions.forEach((d, i) => {
      const added = Math.floor($dimensions[i].owned) * $dimensions[i].multi * delta;
      i == 0 ? ($antimatter += added) : ($dimensions[i - 1].owned += added);
    });

    lastTime = currentTime;

    requestAnimationFrame(gameLoop);
  }

  loadRoutes();
</script>

<nav class="flex items-center p-5 text-xl text-center text-gray-100 justify-evenly bg-slate-800 drop-shadow-md">
  <a href="/">Dimensions</a>
  <AntimatterDisplay />
  <a href="/options">Options</a>
</nav>
<div class="p-4 mx-auto h-max">
  <slot />
</div>
