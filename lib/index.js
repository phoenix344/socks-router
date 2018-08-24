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
    async connectionHandler(info, accept, deny) {
        for (const route of this.routes) {
            if (!isUriValid_1.isUriValid(info, route.uri)) {
                // domain/ip/port pattern is not allowed
                deny();
                return;
            }
            const valid = route.validate ? await route.validate(info) : undefined;
            if (valid === false) {
                // filter denied access
                deny();
                return;
            }
            else if (valid === true) {
                if (route.execute) {
                    await route.execute(info, accept(true));
                    return;
                }
            }
        }
        accept();
    }
}
exports.Router = Router;
function createRouter(routes = []) {
    let router = new Router(routes);
    return Object.assign(router.connectionHandler.bind(router), router);
}
exports.createRouter = createRouter;
exports.default = createRouter;
//# sourceMappingURL=index.js.map