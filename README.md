# Universal Router
Easier way to add routing functionality on top of the socks5 webserver.

```javascript
const { createServer } = require("@outtacontrol/socks");

const { createRouter } = require("./lib/index");
const { blacklist } = require("./lib/validators/blacklist");
// const { whitelist } = require("./lib/validators/blacklist");

const app = createRouter();

app.use(blacklist(['example1.com', 'example2.com:80']));
// app.use(whitelist(['example1.com', 'example2.com:80']));

// app.use({
//     uri: {hostname: "...", port: "8080"},
//     validate(info) {
//         // // no return or empty return is just continuing the loop
//         // return true; // executes the interception method
//         // return false; // denies access
//     },
//     intercept(info, socket) {
//         // do something with the socket...
//     }
// });

const server = createServer({ auths: [auth.None()] }, app.getHandler());
server.listen(1080, "localhost", () => {
    console.log("socks5 router is listening on port 1080");
});
```
