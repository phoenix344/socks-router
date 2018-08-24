export interface SocksProxyInfo {
    cmd: string;
    srcAddr?: string | undefined;
    srcPort?: number | undefined;
    dstAddr: string;
    dstPort: number;
}
