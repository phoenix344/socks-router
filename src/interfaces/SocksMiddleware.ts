import { SocksProxyInfo } from "socksv5";
import { Socket } from "net";

export interface SocksMiddleware {
    (info: SocksProxyInfo, socket?: Socket): Promise<boolean | undefined>
}
