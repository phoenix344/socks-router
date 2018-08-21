
declare module "universal-router" {
    import { Socket } from "net";
    import { Server } from "socksv5";
    export { auth } from "socksv5";

    interface SocksRouteInfo {
        srcPort: number;
        srcAddr: string;
        dstPort: number;
        dstAddr: string;
    }

    interface AcceptCallback {
        (intercept: true): Socket;
        (intercept?: false): void;
    }

    interface DenyCallback {
        (): void;
    }

    interface SocksConnectionListener {
        (info: SocksRouteInfo, accept: AcceptCallback, deny: DenyCallback): boolean;
    }

    export class Router extends Server {
        constructor(options?: SocksServerOptions);
        constructor(routes?: SocksConnectionListener[], options?: SocksServerOptions);

        addRoute(route: SocksConnectionListener): this;
        removeRoute(route: SocksConnectionListener): this;
        clearRoutes(): this;
    }

    export function createRouter(routes?: SocksConnectionListener[]): SocksConnectionListener;

    export function routeThrough(port?: number | 'any'): SocksConnectionListener;
    export function blacklist(addresses?: string[]): SocksConnectionListener;
    export function whitelist(addresses?: string[]): SocksConnectionListener;
}