import { Profiler, ProfilerProps } from "react";
import AppUseMemo from "../UseMemo/ExamplesUseMemo";

type OnRenderParams = Parameters<ProfilerProps['onRender']>

function onRenderCallback(
  id: OnRenderParams['0'], // "id" of the Profiler tree that just made changes
  phase:OnRenderParams['1'], // "mount" or "update"
  actualDuration: OnRenderParams['2'], // actual time to render
  baseDuration: OnRenderParams['3'], // estimated time to render the entire subtree without memoization
  startTime: OnRenderParams['4'], // when React starts rendering this update
  commitTime: OnRenderParams['5'], // when React finishes updating
) {
  console.log({
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
  });
}

function AppProfiler() {
  return (
    <Profiler id="App" onRender={onRenderCallback}>
      <AppUseMemo />
    </Profiler>
  );
}

export default AppProfiler;
