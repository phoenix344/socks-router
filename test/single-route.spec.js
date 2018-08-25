const assert = require('assert');
const FakeSocket = require('fakesocket');
const { createRouter } = require('../lib');

const testCases = [];

// host/port not defined => validate, no execute
testCases.push((async function testValidateAccept() {
    const app = createRouter();
    let callAcceptAmount = 0;
    let callDenyAmount = 0;
    let callValidateAmount = 0;
    let callExecuteAmount = 0;

    app.use({
        async validate() {
            callValidateAmount++;
        },
        async execute() {
            callExecuteAmount++;
        }
    });

    const handler = app.getHandler();

    await handler({ dstAddr: 'example.com', dstPort: 80 }, (intercept) => {
        assert.ok(!intercept, "intercept must be false or undefined!");
        callAcceptAmount++;
    }, () => callDenyAmount++);

    assert.ok(callAcceptAmount === 1, "accept callback must be called once!");
    assert.ok(callDenyAmount === 0, "deny callback must not be called once!");
    assert.ok(callValidateAmount === 1, "validate function must be called once!");
    assert.ok(callExecuteAmount === 0, "execute function must not be called once!");
})());

// host/port not defined => validate/execute
testCases.push((async function testValidateExecute() {
    const app = createRouter();
    let callAcceptAmount = 0;
    let callDenyAmount = 0;
    let callValidateAmount = 0;
    let callExecuteAmount = 0;

    app.use({
        async validate() {
            callValidateAmount++;
            return true;
        },
        async execute(info, socket) {
            assert.deepEqual(info, { dstAddr: 'example.com', dstPort: 80 });
            assert.ok(socket instanceof FakeSocket, "socket must be defined");
            callExecuteAmount++;
        }
    });

    const handler = app.getHandler();

    await handler({ dstAddr: 'example.com', dstPort: 80 }, (intercept) => {
        assert.ok(intercept, "intercept must be true");
        callAcceptAmount++;
        return new FakeSocket();
    }, () => callDenyAmount++);

    assert.ok(callAcceptAmount === 1, "accept callback must be called once!");
    assert.ok(callDenyAmount === 0, "deny callback must not be called once!");
    assert.ok(callValidateAmount === 1, "validate function must be called once!");
    assert.ok(callExecuteAmount === 1, "execute function must be called once!");
})());

// host/port not defined => validate == false => deny
testCases.push((async function testValidateDeny() {
    const app = createRouter();
    let callAcceptAmount = 0;
    let callDenyAmount = 0;
    let callValidateAmount = 0;
    let callExecuteAmount = 0;

    app.use({
        async validate() {
            callValidateAmount++;
            return false;
        },
        async execute() {
            callExecuteAmount++;
        }
    });

    const handler = app.getHandler();

    await handler({ dstAddr: 'example.com', dstPort: 80 }, (intercept) => {
        assert.ok(intercept, "intercept must be true");
        callAcceptAmount++;
        return new FakeSocket();
    }, () => callDenyAmount++);

    assert.ok(callAcceptAmount === 0, "accept callback must not be called once!");
    assert.ok(callDenyAmount === 1, "deny callback must not be called once!");
    assert.ok(callValidateAmount === 1, "validate function must be called once!");
    assert.ok(callExecuteAmount === 0, "execute function must not be called once!");
})());

// host fits => validate, no execute
testCases.push((async function testHostValidateAccept() {
    const app = createRouter();
    let callAcceptAmount = 0;
    let callDenyAmount = 0;
    let callValidateAmount = 0;
    let callExecuteAmount = 0;

    app.use({
        uri: { hostname: "example.com" },
        async validate() {
            callValidateAmount++
        },
        async execute() {
            callExecuteAmount++;
        }
    });

    const handler = app.getHandler();

    await handler({ dstAddr: 'example.com', dstPort: 80 }, (intercept) => {
        assert.ok(!intercept, "intercept must be false or undefined!");
        callAcceptAmount++;
    }, () => callDenyAmount++);

    assert.ok(callAcceptAmount === 1, "accept callback must be called once!");
    assert.ok(callDenyAmount === 0, "deny callback must not be called once!");
    assert.ok(callValidateAmount === 1, "validate function must be called once!");
    assert.ok(callExecuteAmount === 0, "execute function must not be called once!");
})());

// port fits => validate, no execute
testCases.push((async function testPortValidateAccept() {
    const app = createRouter();
    let callAcceptAmount = 0;
    let callDenyAmount = 0;
    let callValidateAmount = 0;
    let callExecuteAmount = 0;

    app.use({
        uri: { port: "80" },
        async validate() {
            callValidateAmount++
        },
        async execute() {
            callExecuteAmount++;
        }
    });

    const handler = app.getHandler();

    await handler({ dstAddr: 'example.com', dstPort: 80 }, (intercept) => {
        assert.ok(!intercept, "intercept must be false or undefined!");
        callAcceptAmount++;
    }, () => callDenyAmount++);

    assert.ok(callAcceptAmount === 1, "accept callback must be called once!");
    assert.ok(callDenyAmount === 0, "deny callback must not be called once!");
    assert.ok(callValidateAmount === 1, "validate function must be called once!");
    assert.ok(callExecuteAmount === 0, "execute function must not be called once!");
})());

// host does not fit => ignore validation/execute
testCases.push((async function testHostIgnoreAccept() {
    const app = createRouter();
    let callAcceptAmount = 0;
    let callDenyAmount = 0;
    let callValidateAmount = 0;
    let callExecuteAmount = 0;

    app.use({
        uri: { hostname: "example.com" },
        async validate() {
            callValidateAmount++
        },
        async execute() {
            callExecuteAmount++;
        }
    });

    const handler = app.getHandler();

    await handler({ dstAddr: 'example.net', dstPort: 80 }, (intercept) => {
        assert.ok(!intercept, "intercept must be false or undefined!");
        callAcceptAmount++;
    }, () => callDenyAmount++);

    assert.ok(callAcceptAmount === 1, "accept callback must be called once!");
    assert.ok(callDenyAmount === 0, "deny callback must not be called once!");
    assert.ok(callValidateAmount === 0, "validate function must not be called!");
    assert.ok(callExecuteAmount === 0, "execute function must not be called once!");
})());

// port does not fit => ignore validation/execute
testCases.push((async function testPortIgnoreAccept() {
    const app = createRouter();
    let callAcceptAmount = 0;
    let callDenyAmount = 0;
    let callValidateAmount = 0;
    let callExecuteAmount = 0;

    app.use({
        uri: { port: "80" },
        async validate() {
            callValidateAmount++
        },
        async execute() {
            callExecuteAmount++;
        }
    });

    const handler = app.getHandler();

    await handler({ dstAddr: 'example.com', dstPort: 443 }, (intercept) => {
        assert.ok(!intercept, "intercept must be false or undefined!");
        callAcceptAmount++;
    }, () => callDenyAmount++);

    assert.ok(callAcceptAmount === 1, "accept callback must be called once!");
    assert.ok(callDenyAmount === 0, "deny callback must not be called once!");
    assert.ok(callValidateAmount === 0, "validate function must not be called!");
    assert.ok(callExecuteAmount === 0, "execute function must not be called once!");
})());

module.exports = testCases;
