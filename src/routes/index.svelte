<script lang="ts">
  import AntimatterDisplay from '../components/AntimatterDisplay.svelte';

  import DimensionTable from '../components/DimensionTable.svelte';
  import { antimatter } from '../stores/antimatter';
  import { dimensions } from '../stores/dimension';

  const framerate = 60;
  const multi = 1 / framerate;
  const interval = 1000 / framerate;

  setInterval(() => {
    const added = $antimatter + $dimensions[0].owned * multi;
    antimatter.set(added);
  }, interval);
  // import GameLoopWorker from '../workers/gameLoop.ts?worker';

  // const worker = new GameLoopWorker();
</script>

<AntimatterDisplay />
<DimensionTable />
