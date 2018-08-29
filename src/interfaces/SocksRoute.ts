import { Url } from "url";
import { SocksRouteValidator } from "./SocksRouteValidator";
import { SocksRouteInterceptor } from "./SocksRouteInterceptor";
import { SocksRouteInitialize } from "./SocksRouteInitialize";

export interface SocksRoute { 
    isReady?: boolean;

    uri?: Url;
    initialize?: SocksRouteInitialize;
    validate?: SocksRouteValidator;
    intercept?: SocksRouteInterceptor;
}