"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isUriValid(info, uri) {
    if (uri) {
        if ('string' === typeof uri.hostname) {
            const hostname = '.' + uri.hostname;
            const addrname = '.' + info.dstAddr;
            const index = addrname.lastIndexOf(hostname);
            if (index < 0 || addrname.slice(index).length > hostname.length) {
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
exports.isUriValid = isUriValid;
//# sourceMappingURL=isUriValid.js.map