
import { Route } from './interfaces/Route';
import { SocksProxyInfo } from "./interfaces/SocksProxyInfo";
import { SocksAcceptCallback } from "./interfaces/SocksAcceptCallback";
import { SocksDenyCallback } from "./interfaces/SocksDenyCallback";
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

    public async connectionHandler(info: SocksProxyInfo, accept: SocksAcceptCallback, deny: SocksDenyCallback): Promise<void> {
        for (const route of this.routes) {
            if (!isUriValid(info, route.uri)) {
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

export function createRouter(routes: Route[] = []): SocksConnectionCallback & Router {
    let router = new Router(routes);
    return Object.assign(router.connectionHandler.bind(router), router);
}

export default createRouter;