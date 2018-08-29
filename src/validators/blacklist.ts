import { parse } from "url";
import { SocksRoute } from "../interfaces/SocksRoute";
import { isUriValid } from '../util/isUriValid';

export function blacklist(list: string[]): SocksRoute {
    return {
        async validate(info) {
            const entry = list.find(domain => isUriValid(info, parse(domain)));
            if (entry !== undefined) {
                return false;
            }
        }
    };
}