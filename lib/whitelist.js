function whitelist(whitelist = []) {
    return (info, accept, deny) => {
        if (whitelist.includes(info.dstAddr + ":" + info.dstPort)) {
            return false;
        }
        deny();
        return true;
    };
}

exports.whitelist = whitelist;
