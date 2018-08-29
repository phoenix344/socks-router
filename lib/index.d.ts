import { SocksRoute } from './interfaces/SocksRoute';
import { SocksConnectionCallback } from "./interfaces/SocksConnectionCallback";
export declare class Router {
    private routes;
    constructor(routes?: SocksRoute[]);
    use(route: SocksRoute): void;
    getHandler(): SocksConnectionCallback;
}
export declare function createRouter(routes?: SocksRoute[]): Router;
export default createRouter;
//# sourceMappingURL=index.d.ts.map