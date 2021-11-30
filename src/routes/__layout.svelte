<script lang="ts">
  import { dimensions } from '@/stores/dimension';
  import { antimatter } from '@/stores/antimatter';

  import '@/app.css';

  let lastTime = performance.now();

  function gameLoop() {
    const currentTime = performance.now();
    const delta = (currentTime - lastTime) / 1000;

    $dimensions.forEach((d, i) => {
      const added = Math.floor($dimensions[i].owned) * delta;
      i == 0 ? ($antimatter += added) : ($dimensions[i - 1].owned += added);
    });

    lastTime = currentTime;

    requestAnimationFrame(gameLoop);
  }

  gameLoop();
</script>

<nav class="p-5 space-x-10 text-center bg-gray-600 text-white text-xl">
  <a href="/">Dimensions</a>
  <a href="/options">Options</a>
</nav>
<div class="container mx-auto">
  <slot />
</div>
