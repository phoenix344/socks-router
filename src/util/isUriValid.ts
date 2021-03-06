import { SocksProxyInfo } from "../interfaces/SocksProxyInfo";
import { Url } from "url";

export function isUriValid(info: SocksProxyInfo, uri?: Url): boolean {
    if (uri) {
        if ('string' === typeof uri.hostname) {
            const hostname = '.' + uri.hostname;
            const addrname = '.' + info.dstAddr;
            const index = addrname.lastIndexOf(hostname);
            if (addrname.slice(index) !== hostname) {
                return false;
            }
        }
        if ('string' === typeof uri.port) {
            if (uri.port !== info.dstPort.toString()) {
                return false;
            }
        }
    }
    return true;
}