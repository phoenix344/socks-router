const assert = require('assert');
const { createRouter } = require('../lib');

const testCases = [];

testCases.push((async function testLastMatch() {
    const app = createRouter();
    let callAcceptAmount = 0;
    let callDenyAmount = 0;
    let callValidateAmount = 0;
    let callExecuteAmount = 0;

    app.use({
        uri: { hostname: "example.com" },
        async validate() {
            callValidateAmount++;
        }
    });

    app.use({
        uri: { port: "443" },
        async validate() {
            callValidateAmount++;
        }
    });

    app.use({
        async validate() {
            callValidateAmount++;
            return true;
        },
        async execute() {
            callExecuteAmount++;
        }
    })

    const handler = app.getHandler();

    await handler({ dstAddr: 'example.com', dstPort: 443 }, (intercept) => {
        assert.ok(intercept, "intercept must be true!");
        callAcceptAmount++;
    }, () => callDenyAmount++);

    assert.ok(callAcceptAmount === 1, "accept callback must be called once!");
    assert.ok(callDenyAmount === 0, "deny callback must not be called once!");
    assert.ok(callValidateAmount === 3, "validate function must be called 3 times!");
    assert.ok(callExecuteAmount === 1, "execute function must be called once!");
})());

testCases.push((async function testIgnoreLast() {
    const app = createRouter();
    let callAcceptAmount = 0;
    let callDenyAmount = 0;
    let callValidateAmount = 0;
    let callExecuteAmount = 0;

    app.use({
        uri: { hostname: "example.com" },
        async validate() {
            callValidateAmount++;
        }
    });

    app.use({
        uri: { port: "443" },
        async validate() {
            callValidateAmount++;
        }
    });

    app.use({
        uri: { port: "80" },
        async validate() {
            assert.fail("third call must not happen!");
            callValidateAmount++;
            return true;
        },
        async execute() {
            callExecuteAmount++;
        }
    })

    const handler = app.getHandler();

    await handler({ dstAddr: 'example.com', dstPort: 443 }, (intercept) => {
        assert.ok(!intercept, "intercept must be false or undefined!");
        callAcceptAmount++;
    }, () => callDenyAmount++);

    assert.ok(callAcceptAmount === 1, "accept callback must be called once!");
    assert.ok(callDenyAmount === 0, "deny callback must not be called once!");
    assert.ok(callValidateAmount === 2, "validate function must be called 2 times!");
    assert.ok(callExecuteAmount === 0, "execute function must not be called once!");
})());

testCases.push((async function testAbortAfterDeny() {
    const app = createRouter();
    let callAcceptAmount = 0;
    let callDenyAmount = 0;
    let callValidateAmount = 0;
    let callExecuteAmount = 0;

    app.use({
        uri: { hostname: "example.com" },
        async validate() {
            callValidateAmount++;
            return false;
        }
    });

    app.use({
        uri: { port: "443" },
        async validate() {
            callValidateAmount++;
        }
    });

    app.use({
        uri: { port: "80" },
        async validate() {
            assert.fail("third call must not happen!");
            callValidateAmount++;
            return true;
        },
        async execute() {
            callExecuteAmount++;
        }
    })

    const handler = app.getHandler();

    await handler({ dstAddr: 'example.com', dstPort: 443 }, (intercept) => {
        assert.ok(!intercept, "intercept must be false or undefined!");
        callAcceptAmount++;
    }, () => callDenyAmount++);

    assert.ok(callAcceptAmount === 0, "accept callback must be called once!");
    assert.ok(callDenyAmount === 1, "deny callback must not be called once!");
    assert.ok(callValidateAmount === 1, "validate function must be called 2 times!");
    assert.ok(callExecuteAmount === 0, "execute function must not be called once!");
})());

module.exports = testCases;
