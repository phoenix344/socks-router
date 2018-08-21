function blacklist(blacklist = []) {
    return (info, accept, deny) => {
        if (blacklist.includes(info.dstAddr) || blacklist.includes(info.dstAddr + ":" + info.dstPort)) {
            deny();
            return true;
        }
        return false;
    };
}

exports.blacklist = blacklist;
