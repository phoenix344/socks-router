import { SocksProxyInfo } from "./SocksProxyInfo";
export interface Validator {
    (info: SocksProxyInfo): Promise<boolean | void>;
}
//# sourceMappingURL=Validator.d.ts.map