"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const processOrder_1 = require("./processOrder");
(async () => {
    try {
        const total = await (0, processOrder_1.processOrder)('valid-123');
        console.log('total', total);
    }
    catch (error) {
        console.error('demo failed', error);
    }
    try {
        await (0, processOrder_1.processOrder)('missing-404');
    }
    catch (_error) {
        // expected failure
    }
})();
