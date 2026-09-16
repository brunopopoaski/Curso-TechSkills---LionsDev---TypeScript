import { processOrder } from './processOrder';

(async () => {
  try {
    const total = await processOrder('valid-123');
    console.log('total', total);
  } catch (error) {
    console.error('demo failed', error);
  }

  try {
    await processOrder('missing-404');
  } catch (_error) {
    // expected failure
  }
})();
