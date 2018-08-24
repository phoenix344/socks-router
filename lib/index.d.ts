import { Route } from './interfaces/Route';
import { SocksProxyInfo } from "./interfaces/SocksProxyInfo";
import { SocksAcceptCallback } from "./interfaces/SocksAcceptCallback";
import { SocksDenyCallback } from "./interfaces/SocksDenyCallback";
import { SocksConnectionCallback } from "./interfaces/SocksConnectionCallback";
export declare class Router {
    private routes;
    constructor(routes?: Route[]);
    use(route: Route): void;
    connectionHandler(info: SocksProxyInfo, accept: SocksAcceptCallback, deny: SocksDenyCallback): Promise<void>;
}
export declare function createRouter(routes?: Route[]): SocksConnectionCallback & Router;
export default createRouter;
//# sourceMappingURL=index.d.ts.map