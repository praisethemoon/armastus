import { BaseComponent } from "./BaseComponent";
import ComponentStyleProps from "./ComponentStyleProps";

export class StateObject<T>{
    private value: T;
    private subscribers: BaseComponent[] = [];

    constructor(initialValue: T) {
        this.value = initialValue;
    }
    
    set(fn: (oldValue: T) => T) {
        const oldValue = this.value;
        this.value = fn(this.value);
        print("set", oldValue, "to", this.value)
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

    static newState<T>(initialValue: T){
        return new StateObject<T>(initialValue);
    }
}


