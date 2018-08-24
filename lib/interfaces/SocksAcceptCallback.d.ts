/// <reference types="node" />
import { Socket } from "net";
export interface SocksAcceptCallback {
    (intercept?: false): void;
    (intercept: true): Socket;
}
//# sourceMappingURL=SocksAcceptCallback.d.ts.map