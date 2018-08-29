/// <reference types="node" />
import { Url } from "url";
import { Execute } from "./Execute";
export interface Route {
    uri?: Url;
    initialize?: ?validate;
    Validator: any;
    execute?: Execute;
}
//# sourceMappingURL=Route.d.ts.map