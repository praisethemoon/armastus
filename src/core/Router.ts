import { Arma } from "./Arma";
import { BaseComponent } from "./BaseComponent";



export class Router extends BaseComponent<{route: string, exact?: boolean, default?: boolean}>{
    route: string;
    exact: boolean;
    default: boolean;

    constructor(props: {exact: boolean, route: string, default?: boolean}, children: []){
        super(props, children);
        this.route = props.route;
        this.exact = props.exact;
        this.default = props.default ?? false;
    }

    render(){
        print("rendering router", this.route, this.props.style.width, this.props.style.height)
        return this.children[0]
    }

    match(route: string){
        if(this.exact == false || this.exact == null){
            if(route.startsWith(this.route)){
                return true;
            }
        }
        if(this.exact == true){
            if(route == this.route){
                return true;
            }
        }
        return false;
    }
}


export class Switch extends BaseComponent {
    routes: Router[] = [];
    routeState = this.useState(Arma.getRouteState())

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

            if(route.match(currentRoute)){
                return route
            }
        }

        if(fallBackRoute != null){
            return fallBackRoute;
        }

        return null;
    }
}