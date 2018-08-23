import { SocksMiddleware } from './interfaces/SocksMiddleware';

export function whitelist(whitelist: Array<string> = []): SocksMiddleware {
    return async info => {
        return whitelist.includes(info.dstAddr + ":" + info.dstPort) ? undefined : false;
    };
}
