const widgetWrapper = document.querySelector("#widget-wrapper");

function createRender(id: string) {
  return function(value: number) {
    let progressRing = widgetWrapper.querySelector("#" + id);
    if (!progressRing) {
      progressRing = document.createElement("progress-ring");
      progressRing.setAttribute("id", id);
      progressRing.setAttribute("duration", "600");
      progressRing.setAttribute("invert-colors", "true");
      widgetWrapper.appendChild(progressRing);
    }
    progressRing.setAttribute("percent", "" + value);
  };
}

export const renderCPU = createRender("cpu-progress");
export const renderMemory = createRender("memory-progress");
export const renderDisk = createRender("disk-progress");

function createDestroy(id: string) {
  return function() {
    const el = widgetWrapper.querySelector("#" + id);
    if (el) {
      el.parentElement.removeChild(el);
    }
  };
}

export const destroyCPU = createDestroy("cpu-progress");
export const destroyMemory = createDestroy("memory-progress");
export const destroyDisk = createDestroy("disk-progress");
