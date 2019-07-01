import "@material/mwc-checkbox";
import "@material/mwc-formfield";
import "@material/mwc-icon";
import { fromEvent, of } from "rxjs";
import { map, shareReplay, switchMap } from "rxjs/operators";
import { source } from "./source";
import "./styles.css";
import {
  destroyCPU,
  destroyDisk,
  destroyMemory,
  renderCPU,
  renderDisk,
  renderMemory
} from "./ui";

const cpuCheckbox = document.querySelector("#cpu");
const memoryCheckbox = document.querySelector("#memory");
const diskCheckbox = document.querySelector("#disk");

const cpu$ = fromEvent<any>(cpuCheckbox, "change").pipe(
  map(e => e.target.checked)
);

const memory$ = fromEvent<any>(memoryCheckbox, "change").pipe(
  map(e => e.target.checked)
);

const disk$ = fromEvent<any>(diskCheckbox, "change").pipe(
  map(e => e.target.checked)
);

// Note that shareReplay(1) would not destroy the source on the final unsubscription
// The shareReplay below could be replaced with publishReplay(1) + refCount()
const results = source.pipe(shareReplay({ bufferSize: 1, refCount: true }));

cpu$.pipe(switchMap(show => (show ? results : of(null)))).subscribe(value => {
  if (value) {
    renderCPU(value.cpu);
  } else {
    destroyCPU();
  }
});

memory$
  .pipe(switchMap(show => (show ? results : of(null))))
  .subscribe(value => {
    if (value) {
      renderMemory(value.memory);
    } else {
      destroyMemory();
    }
  });

disk$.pipe(switchMap(show => (show ? results : of(null)))).subscribe(value => {
  if (value) {
    renderDisk(value.memory);
  } else {
    destroyDisk();
  }
});
