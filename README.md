# Universal Router
A wrapper on top of the socksv5 server to attach multiple components more easily

```javascript
const { auth, createServer, routeThrough, blacklist, whitelist } = require("universal-router");

// es6/typescript compatible
// import { auth, createServer, routeThrough, blacklist, whitelist } from "universal-router";

const server = createServer([

    // deny every domains in the blacklist (specify with port)
    blacklist(['example1.com', 'example2.com:80']),

    // // deny every domains not in the whitelist (specify with port)
    // whitelist(['example1.com', 'example2.com:80']),

    // only routing connections with destination port 443
    routeThrough(443),

    // only routing connections with destination port 80
    routeThrough(80),

    // routing connection for any destination port
    routeThrough('any')
], { auths: [auth.None()] });

server.listen(1080, "localhost", () => {
    console.log("socks5 router is listening on port 1080");
});
```
