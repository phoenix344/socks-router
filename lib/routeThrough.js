function routeThrough(port = 'any') {
    return (info, accept, deny) => {
        if (port === 'any' || port === info.dstPort) {
            accept();
            return true;
        }
        return false;
    };
}

exports.routeThrough = routeThrough;
