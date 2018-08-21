const { Server } = require('socksv5');

class RouterServer extends Server {

    constructor(routes = [], socksOptions = {}) {
        if (!Array.isArray(routes)) {
            socksOptions = routes;
            routes = [];
        }

        super(socksOptions, (info, accept, deny) => {
            for (const route of routes) {
                if (route(info, accept, deny)) {
                    break;
                }
            }
        });

        this._routes = routes;
    }

    addRoute(route) {
        this._routes.push(route);
        return this;
    }

    removeRoute(route) {
        const index = this._routes.indexOf(route);
        if (index > -1) {
            this._routes.splice(index, 1);
        }
        return this;
    }

    clearRoutes() {
        this._routes.splice(0);
        return this;
    }

}

function createServer(routes, socksOptions) {
    return new RouterServer(routes, socksOptions);
}

exports.Server = RouterServer;
exports.createServer = createServer;
