const { auth, createServer, through, blacklist, whitelist } = require("./index");

const server = createServer([

    // deny every domains in the blacklist (specify with port)
    blacklist(['example1.com', 'example2.com:80']),

    // // deny every domains not in the whitelist (specify with port)
    // whitelist(['example1.com', 'example2.com:80']),

    // only routing connections with destination port 443
    through(443),

    // only routing connections with destination port 80
    through(80),

    // routing connection for any destination port
    through('any')
], { auths: [auth.None()] });

server.listen(1080, "localhost", () => {
    console.log("socks5 router is listening on port 1080");
});