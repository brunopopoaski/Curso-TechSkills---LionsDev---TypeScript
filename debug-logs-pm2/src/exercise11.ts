type MemoryReading = {
  rss: number;
  heapTotal: number;
  heapUsed: number;
};

function formatMb(value: number): number {
  return Number((value / 1024 / 1024).toFixed(2));
}

function snapshot(label: string): void {
  const { rss, heapTotal, heapUsed } = process.memoryUsage();
  console.log(label, {
    rss: formatMb(rss),
    heapTotal: formatMb(heapTotal),
    heapUsed: formatMb(heapUsed),
  });
}

function runLeakingScenario(): void {
  const cache: Record<string, Buffer> = {};
  const listeners: Array<() => void> = [];
  const timers: NodeJS.Timeout[] = [];

  for (let index = 0; index < 2000; index++) {
    const id = `req-${index}`;
    cache[id] = Buffer.alloc(1024 * 512);
    listeners.push(() => console.log(id));
    timers.push(
      setInterval(() => {
        void cache[id];
      }, 1000)
    );

    if (index % 200 === 0) {
      snapshot(`leak-${index}`);
    }
  }

  setTimeout(() => {
    snapshot('leak-final');
    timers.forEach((timer) => clearInterval(timer));
    Object.keys(cache).forEach((key) => delete cache[key]);
    listeners.length = 0;
  }, 50);
}

function runFixedScenario(): void {
  const cache = new Map<string, Buffer>();
  const timers: NodeJS.Timeout[] = [];

  for (let index = 0; index < 2000; index++) {
    const id = `req-${index}`;
    cache.set(id, Buffer.alloc(1024 * 512));
    timers.push(
      setInterval(() => {
        void cache.get(id);
      }, 1000)
    );

    if (cache.size > 200) {
      for (const key of Array.from(cache.keys()).slice(0, cache.size - 200)) {
        cache.delete(key);
      }
    }

    if (index % 200 === 0) {
      snapshot(`fixed-${index}`);
    }
  }

  setTimeout(() => {
    snapshot('fixed-final');
    timers.forEach((timer) => clearInterval(timer));
    cache.clear();
  }, 50);
}

console.log('--- cenário com vazamento ---');
runLeakingScenario();

setTimeout(() => {
  console.log('\n--- cenário corrigido ---');
  runFixedScenario();
}, 300);

setTimeout(() => {
  process.exit(0);
}, 900);
