const { Server } = require('socksv5');

class Router extends Server {

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

function createRouter(routes, socksOptions) {
    return new Router(routes, socksOptions);
}

exports.Router = Router;
exports.createRouter = createRouter;
