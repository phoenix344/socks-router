/// <reference types="node" />
import { Url } from "url";
import { Validator } from "./Validator";
import { Execute } from "./Execute";
export interface Route {
    uri?: Url;
    validate?: Validator;
    execute?: Execute;
}
//# sourceMappingURL=Route.d.ts.map