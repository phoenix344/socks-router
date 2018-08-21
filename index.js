const { auth } = require('socksv5');
const { createServer, Server } = require('./lib/router');
const { routeThrough } = require('./lib/routeThrough');
const { blacklist } = require('./lib/blacklist');
const { whitelist } = require('./lib/whitelist');

exports.Server = Server;
exports.createServer = createServer;

exports.routeThrough = routeThrough;
exports.blacklist = blacklist;
exports.whitelist = whitelist;

exports.auth = auth;
