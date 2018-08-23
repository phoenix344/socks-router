import { SocksMiddleware } from './interfaces/SocksMiddleware';

export function through(port: 'any' | number = 'any'): SocksMiddleware {
    return async info => {
        return port === 'any' || port === info.dstPort ? undefined : false;
    };
}
