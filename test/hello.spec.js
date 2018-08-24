const assert = require('assert');
const { createRouter } = require('../lib/index');

// [X] !hostname && !port                     => validate/execute
// [ ] hostname == dstAddr || port == dstPort => validate/execute
// [ ] hostname != dstAddr || port != dstPort => ignore
(async () => {
    const app = createRouter();
    let callAcceptAmount = 0;
    let callValidateAmount = 0;

    app.use({
        async validate() {
            if (callValidateAmount++) {
                assert.fail("validation must be called once!");
            }
        }
    });

    const handler = app.getHandler();

    await handler({ dstAddr: 'example.com', dstPort: 80 }, (intercept) => {
        assert.ok(!intercept, "intercept must be false or undefined!");
        callAcceptAmount++;
    }, () => assert.fail("deny request is invalid for this operation!"));

    assert.ok(callAcceptAmount === 1, "accept callback must be called once!");
    assert.ok(callValidateAmount === 1, "validate function must be called once!");
})();

// [ ] !hostname && !port                     => validate/execute
// [X] hostname == dstAddr || port == dstPort => validate/execute
// [ ] hostname != dstAddr || port != dstPort => ignore
(async () => {
    const app = createRouter();
    let callAcceptAmount = 0;
    let callValidateAmount = 0;

    app.use({
        uri: { hostname: "example.com", port: "80" },
        async validate() {
            if (callValidateAmount++) {
                assert.fail("validation must be called once!");
            }
        }
    });

    const handler = app.getHandler();

    await handler({ dstAddr: 'example.com', dstPort: 80 }, (intercept) => {
        assert.ok(!intercept, "intercept must be false or undefined!");
        callAcceptAmount++;
    }, () => assert.fail("deny request is invalid for this operation!"));

    assert.ok(callAcceptAmount === 1, "accept callback must be called once!");
    assert.ok(callValidateAmount === 1, "validate function must be called once!");
})();

// [ ] !hostname && !port                     => validate/execute
// [ ] hostname == dstAddr || port == dstPort => validate/execute
// [X] hostname != dstAddr || port != dstPort => ignore
(async () => {
    const app = createRouter();
    let callAcceptAmount = 0;
    let callValidateAmount = 0;

    app.use({
        uri: { hostname: "example.com", port: "80" },
        async validate() {
            callValidateAmount++
        }
    });

    const handler = app.getHandler();

    await handler({ dstAddr: 'example.com', dstPort: 443 }, (intercept) => {
        assert.ok(!intercept, "intercept must be false or undefined!");
        callAcceptAmount++;
    }, () => assert.fail("deny request is invalid for this operation!"));

    assert.ok(callAcceptAmount === 1, "accept callback must be called once!");
    assert.ok(callValidateAmount === 0, "validate function must not be called!");
})();