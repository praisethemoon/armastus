import { Arma } from "./Arma";
import { BaseComponent } from "./BaseComponent";
import { printObject } from "./utils/printObject";


export class Router extends BaseComponent<{route: string, default?: boolean}>{
    route: string;
    default: boolean;

    constructor(props: {route: string, default?: boolean}, children: []){
        super(props, children);
        this.route = props.route;
        this.default = props.default ?? false;
    }

    render(){
        return (this.children.length > 0)?this.children[0]:null;
    }

    match(route: string): {[key: string]: string} | false {
        // we split both routes into segments to compare.

        const routeSegments = route.split("/");
        const patternSegments = this.route.split("/");

        if (routeSegments.length !== patternSegments.length) {
            return false; // Different number of segments, no match
        }

        // prepare param object
        const params: {[key: string]: string} = {};

        for (let i = 0; i < patternSegments.length; i++) {
            const patternSegment = patternSegments[i];
            const routeSegment = routeSegments[i];

            if (patternSegment.startsWith("{") && patternSegment.endsWith("}")) {
                const paramName = patternSegment.slice(1, -1);
                params[paramName] = routeSegment;
            } else if (patternSegment !== routeSegment) {
                return false; // Segments don't match, no match
            }
        }

        return params;
    }
}


export class Switch extends BaseComponent {
    routes: Router[] = [];
    routeState = this.useState(Arma.getRouteState())

    /**
     * We store the state here without this.useState because we do not need this component
     * to listen to state changes, we only need to update the state when the route changes
     */
    routeParamState = Arma.getRouteParamsState();

    constructor(props: {}, children: Router[]){
        super(props, []);
        this.routes = children;
    }

    render() {
        const currentRoute = this.routeState.get();
        let fallBackRoute: Router | null = null;

        for(const route of this.routes){
            if(route.default){
                if(fallBackRoute != null){
                    throw new Error("Multiple fallback routes in Switch component")
                }
                fallBackRoute = route;
            }

            const matchOrParams = route.match(currentRoute)
            if(matchOrParams !== false){
                if(typeof matchOrParams === "object")
                    this.routeParamState.set(() => matchOrParams);
                else
                    this.routeParamState.set(() => ({}));
                return route;
            }

        }

        if(fallBackRoute != null){
            return fallBackRoute;
        }

        return null;
    }
}