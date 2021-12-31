<script lang="ts">
  import { antimatter } from '@/stores/game-state';
  import { format } from '@/util/display-utils';

  $: formattedAntimatter = format($antimatter, 1);
  $: {
    console.log($antimatter);
    console.log(formattedAntimatter);
  }
</script>

<div>
  <div class="mx-auto text-3xl font-semibold text-center select-none tabular-nums">
    {formattedAntimatter}
  </div>
  <div class="mx-auto text-lg font-semibold text-center select-none">Antimatter</div>
</div>
