import { SocksMiddleware } from './interfaces/SocksMiddleware';

export function blacklist(blacklist: Array<string> = []): SocksMiddleware {
    return async info => {
        return blacklist.includes(info.dstAddr + ":" + info.dstPort) ? false : undefined;
    };
}
