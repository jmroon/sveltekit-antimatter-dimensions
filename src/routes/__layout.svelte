<script lang="ts">
  import '@/app.css';

  import { dimensions } from '@/stores/dimension';
  import { antimatter } from '@/stores/antimatter';
  import { prefetchRoutes } from '$app/navigation';
  import { browser } from '$app/env';

  const loadRoutes = async () => {
    if (browser) {
      await prefetchRoutes();
      gameLoop();
    }
  };

  let lastTime = performance.now();
  const gameLoop = () => {
    const currentTime = performance.now();
    const delta = (currentTime - lastTime) / 1000;

    $dimensions.forEach((d, i) => {
      const added = Math.floor($dimensions[i].owned) * delta;
      i == 0 ? ($antimatter += added) : ($dimensions[i - 1].owned += added);
    });

    lastTime = currentTime;

    requestAnimationFrame(gameLoop);
  };

  loadRoutes();
</script>

<nav class="p-5 space-x-10 text-center bg-gray-600 text-white text-xl">
  <a href="/">Dimensions</a>
  <a href="/options">Options</a>
</nav>
<div class="mx-auto p-10">
  <slot />
</div>
