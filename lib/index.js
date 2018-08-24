"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isUriValid_1 = require("./util/isUriValid");
class Router {
    constructor(routes = []) {
        this.routes = routes;
    }
    use(route) {
        this.routes.push(route);
    }
    getHandler() {
        return async (info, accept, deny) => {
            for (const route of this.routes) {
                const validDomain = isUriValid_1.isUriValid(info, route.uri);
                if (!validDomain) {
                    // domain/ip/port will be ignored for this operation
                    continue;
                }
                const validated = route.validate ? await route.validate(info) : undefined;
                if (validated === false) {
                    // filter denied access
                    deny();
                    return;
                }
                else if (validated === true) {
                    if (route.execute) {
                        await route.execute(info, accept(true));
                        return;
                    }
                }
            }
            accept();
        };
    }
}
exports.Router = Router;
function createRouter(routes = []) {
    let router = new Router(routes);
    return router;
}
exports.createRouter = createRouter;
exports.default = createRouter;
//# sourceMappingURL=index.js.map