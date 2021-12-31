<script lang="ts">
  import '@/app.css';

  import { gameState } from '@/stores/game-state';
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

    gameState.update(($state) => {
      $state.dimensions.forEach((d, i) => {
        const amountToAdd = Math.floor($state.dimensions[i].owned) * $state.dimensions[i].multi * delta;
        i == 0 ? ($state.antimatter += amountToAdd) : ($state.dimensions[i - 1].owned += amountToAdd);
      });
      return $state;
    });

    lastTime = currentTime;

    requestAnimationFrame(gameLoop);
  }

  loadRoutes();
</script>

<nav class="flex items-center p-5 text-xl text-center text-gray-100 justify-between bg-slate-800 drop-shadow-md">
  <a href="/">Dimensions</a>
  <AntimatterDisplay />
  <a href="/options">Options</a>
</nav>
<div class="p-4 mx-auto h-max">
  <slot />
</div>
