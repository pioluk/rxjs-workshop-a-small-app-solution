import { Observable } from "rxjs";

export const source: Observable<any> = Observable.create(observer => {
  console.info("CREATING SOURCE");
  const intervalId = setInterval(() => {
    const cpu = Math.random() * 100;
    const memory = Math.random() * 100;
    const disk = Math.random() * 100;
    const metrics = { cpu, memory, disk };
    console.table([metrics]);
    observer.next(metrics);
  }, 4000);

  return () => {
    console.info("DESTROYING SOURCE");
    clearInterval(intervalId);
  };
});
