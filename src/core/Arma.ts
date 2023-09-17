import { BaseComponent } from "./BaseComponent";
import ComponentStyleProps from "./ComponentStyleProps";

export class StateObject<T>{
    private value: T;
    private subscribers: BaseComponent[] = [];

    constructor(initialValue: T) {
        this.value = initialValue;
    }

    set(fn: (oldValue: T) => T) {
        this.value = fn(this.value);
        this.notify();
    }

    get(): T {
        return this.value;
    }

    subscribe(component: BaseComponent) {
        this.subscribers.push(component);
    }

    unsubscribe(component: BaseComponent) {
        this.subscribers = this.subscribers.filter(c => c != component);
    }

    notify() {
        for (const subscriber of this.subscribers) {
            subscriber.receiveStateUpdate();
        }
    }
}

export class Arma {
    static createElement(type: typeof BaseComponent, props?: { style: Partial<ComponentStyleProps> }, ...children: BaseComponent[]): BaseComponent {
        const instance = new type(props, children);
        return instance;
    }

    static newState<T>(initialValue: T) {
        return new StateObject<T>(initialValue);
    }

    private static root: BaseComponent;
    private static higherOrderLayers: BaseComponent[][] = [];
    private static sortedAvailableLayers: number[] = []

    private static routeState: StateObject<string> = new StateObject<string>("/");
    private static routeParams: StateObject<any> = new StateObject({amout: "0"});

    /**
     * View management
     */
    static setRoot(root: BaseComponent) {
        this.root = root;
    }

    static render() {
        this.root.display();
        let counter = 0;
        // Render higher order layers
        for (const layerIndex of this.sortedAvailableLayers) {
            // sometimes components unmount after being pushed to higher order layers, due to UI changes etc
            if (this.higherOrderLayers[layerIndex] != null) {
                for (const component of this.higherOrderLayers[layerIndex]) {
                    component.display(layerIndex);
                }
            }
        }

        // empty higher order layers
        this.higherOrderLayers = [];
    }

    /**
     * Adds a layer with higher zindex than current layers
     * the algorithm is simple, we store the number of layers in array, sort it 
     * and iterate through it to render the layers
     * @param layer 
     * @param zIndex 
     */
    static addHigherOrderLayer(layer: BaseComponent, zIndex: number) {
        if (this.sortedAvailableLayers.indexOf(zIndex) == -1) {
            this.sortedAvailableLayers.push(zIndex);
            this.sortedAvailableLayers.sort((a, b) => a - b);
        }

        if (this.higherOrderLayers[zIndex] == undefined) {
            this.higherOrderLayers[zIndex] = [];
        }

        this.higherOrderLayers[zIndex].push(layer);
    }

    /**
     * Update root component
     * @param dt 
     */
    static update(dt: number) {
        this.root.update(dt);
    }

    /** */
    static setRoute(route: string) {
        this.routeState.set(() => route);
    }

    static getRouteState() {
        return this.routeState;
    }

    static getRoute() {
        return this.routeState.get()
    }

    static getRouteParamsState() {
        return this.routeParams;
    }

    static getRouteParams() {
        return this.routeParams.get();
    }
}


