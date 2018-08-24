import { Route } from './interfaces/Route';
import { SocksConnectionCallback } from "./interfaces/SocksConnectionCallback";
export declare class Router {
    private routes;
    constructor(routes?: Route[]);
    use(route: Route): void;
    getHandler(): SocksConnectionCallback;
}
export declare function createRouter(routes?: Route[]): Router;
export default createRouter;
//# sourceMappingURL=index.d.ts.map