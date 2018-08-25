const { readdirSync } = require('fs');
const { join } = require('path');
const files = readdirSync(__dirname).filter(file => file.lastIndexOf('.spec.js'));

process.on('unhandledRejection', (err, p) => {
    console.error('(ノಠ益ಠ)ノ彡┻━┻');
    console.error(err.stack);
});

const testCases = [];
for (const file of files) {
    testCases.push.apply(testCases, require(join(__dirname, file)));
}

Promise.all(testCases).then(() => {
    console.log("ヾ(⌐■_■)ノ♪");
});