import { SocksProxyInfo } from "./SocksProxyInfo";
import { SocksAcceptCallback } from "./SocksAcceptCallback";
import { SocksDenyCallback } from "./SocksDenyCallback";

export interface SocksConnectionCallback {
    (info: SocksProxyInfo, accept: SocksAcceptCallback, deny: SocksDenyCallback): void;
}
