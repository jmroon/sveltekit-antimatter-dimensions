import type { Dimension } from '../stores/dimension';
import { antimatter } from "../stores/antimatter";
import { dimensions } from "../stores/dimension";

export default (): void => {
  const _unsub = [];

  let $antimatter: number;
  let $dimensions: Dimension[];
  
  _unsub.push(dimensions.subscribe(v => {
      $dimensions = v;
  }));
  
  _unsub.push(antimatter.subscribe(v => {
      $antimatter = v;
  }));
  
  const framerate = 60;
  const multi = 1 / framerate;
  const interval = 1000 / framerate;
  
  setInterval(() => {
    const added = $antimatter + $dimensions[0].owned * multi;
    antimatter.set(added);
  }, interval);
}
