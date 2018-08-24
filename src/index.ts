
import { Route } from './interfaces/Route';
import { SocksConnectionCallback } from "./interfaces/SocksConnectionCallback";
import { isUriValid } from "./util/isUriValid";

export class Router {

    private routes: Route[];

    public constructor(routes: Route[] = []) {
        this.routes = routes;
    }

    public use(route: Route): void {
        this.routes.push(route);
    }

    public getHandler(): SocksConnectionCallback {
        return async (info, accept, deny) => {
            for (const route of this.routes) {
                const validDomain = isUriValid(info, route.uri);
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
        }
    }

}

export function createRouter(routes: Route[] = []): Router {
    let router = new Router(routes);
    return router;
}

export default createRouter;