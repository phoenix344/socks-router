const { auth } = require('socksv5');
const { createRouter, Router } = require('./lib/router');
const { routeThrough } = require('./lib/routeThrough');
const { blacklist } = require('./lib/blacklist');
const { whitelist } = require('./lib/whitelist');

exports.Router = Router;
exports.createRouter = createRouter;

exports.routeThrough = routeThrough;
exports.blacklist = blacklist;
exports.whitelist = whitelist;

exports.auth = auth;
