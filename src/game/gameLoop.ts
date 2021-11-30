import { antimatter } from '../stores/antimatter';
import { dimensions } from '../stores/dimension';
import type { Dimension } from '../stores/dimension';

let $dimensions: Dimension[];
dimensions.subscribe((d) => {
  $dimensions = d;
});

let lastTime = performance.now();
function gameLoop() {
  const currentTime = performance.now();
  const delta = (currentTime - lastTime) / 1000;

  // increment Antimatter
  const added = $dimensions[0].owned * delta;
  antimatter.update((a) => a + added);

  lastTime = currentTime;
  requestAnimationFrame(gameLoop);
}

export const start = (): void => {
  gameLoop();
};
