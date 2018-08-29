import { SocksConnectionCallback } from "./interfaces/SocksConnectionCallback";
import { SocksAcceptCallback } from "./interfaces/SocksAcceptCallback";
import { SocksDenyCallback } from "./interfaces/SocksDenyCallback";
import { SocksProxyInfo } from "./interfaces/SocksProxyInfo";
import { SocksRoute } from "./interfaces/SocksRoute";
import { SocksRouteInitialize } from "./interfaces/SocksRouteInitialize";
import { SocksRouteInterceptor } from "./interfaces/SocksRouteInterceptor";
import { SocksRouteValidator } from "./interfaces/SocksRouteValidator";
import { isUriValid } from "./util/isUriValid";
export { SocksConnectionCallback, SocksAcceptCallback, SocksDenyCallback, SocksProxyInfo, SocksRoute, SocksRouteInitialize, SocksRouteInterceptor, SocksRouteValidator, isUriValid };
export declare class Router {
    private routes;
    constructor(routes?: SocksRoute[]);
    use(route: SocksRoute): void;
    getHandler(): SocksConnectionCallback;
}
export declare function createRouter(routes?: SocksRoute[]): Router;
export default createRouter;
//# sourceMappingURL=index.d.ts.map