const { readdirSync } = require('fs');
const { join } = require('path');
const files = readdirSync(__dirname).filter(file => file.lastIndexOf('.spec.js'));

process.on('unhandledRejection', (err, p) => {
    console.error(err.stack);
});

for (const file of files) {
    require(join(__dirname, file));
}
