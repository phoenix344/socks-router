
import { SocksRoute } from './interfaces/SocksRoute';
import { SocksConnectionCallback } from "./interfaces/SocksConnectionCallback";
import { isUriValid } from "./util/isUriValid";

export class Router {

    private routes: SocksRoute[];

    public constructor(routes: SocksRoute[] = []) {
        this.routes = routes;
    }

    public use(route: SocksRoute): void {
        this.routes.push(route);
    }

    public getHandler(): SocksConnectionCallback {
        return async (info, accept, deny) => {
            for (const route of this.routes) {

                // execute bootstrap code if exist
                if (route.initialize && !route.isReady) {
                    await route.initialize();
                    route.isReady = true;
                }

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
                    if (route.intercept) {
                        await route.intercept(info, accept(true));
                        return;
                    }
                }
            }
            accept();
        }
    }

}

export function createRouter(routes: SocksRoute[] = []): Router {
    let router = new Router(routes);
    return router;
}

export default createRouter;