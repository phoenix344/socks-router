import { Server as SocksServer, SocksProxyInfo, SocksAcceptCallback, SocksServerOptions } from 'socksv5';
import { Socket } from 'net';
import { SocksMiddleware } from './interfaces/SocksMiddleware';
import { SocksRoute } from './interfaces/SocksRoute';

export class Server extends SocksServer {
    private routes: SocksMiddleware[];

    public constructor(socksOptions: SocksServerOptions = {}) {
        const routes: SocksMiddleware[] = [];

        super(socksOptions, async (info: SocksProxyInfo, accept: SocksAcceptCallback, deny: () => void) => {
            for (const route of routes) {
                const signal = await route(info);
                if (signal === false) {
                    deny();
                    return;
                } else if (signal === true) {
                    // execute route
                    await route(info, accept(true));
                    return;
                }
            }

            // No interception or denial? Let's start the proxy!
            accept();
        });

        this.routes = routes;
    }

    public use(middleware: SocksMiddleware) {
        this.routes.push(middleware);
        return this;
    }

    public route(pattern: string | SocksProxyInfo, middleware: SocksMiddleware | SocksRoute | undefined, route?: SocksRoute): SocksMiddleware {
        if (middleware && !route) {
            route = middleware;
            middleware = undefined;
        }
        return async (info: SocksProxyInfo, socket?: Socket) => {

            // if socket exists, the route was already checked.
            if (socket) {
                if (route) {
                    return await route(info, socket);
                }

                throw new Error("route must be defined!");
            }

            // if middleware exists, avoid default route check and use the middleware instead.
            if (middleware) {
                return await (<SocksMiddleware>middleware)(info);
            }

            if ('string' === typeof pattern) {
                if (pattern === info.dstAddr || pattern === `${info.dstAddr}:${info.dstPort}`) {
                    return true;
                }
            } else {
                if (pattern.dstAddr === info.dstAddr && (pattern.dstPort === undefined || pattern.dstPort === info.dstPort)) {
                    return true;
                }
            }
            return false;
        };
    }

}

export function createServer(socksOptions: SocksServerOptions) {
    return new Server(socksOptions);
}
