import { parse } from "url";
import { Route } from "../interfaces/Route";
import { isUriValid } from "../util/isUriValid";

export function whitelist(list: string[]): Route {
    return {
        async validate(info) {
            const entry = list.find(domain => isUriValid(info, parse(domain)));
            if (entry === undefined) {
                return false;
            }
        }
    };
}