import { BaseComponent } from "./BaseComponent";
import ComponentStyleProps from "./ComponentStyleProps";

export class Arma {
    static createElement(type: typeof BaseComponent, props?: { style: Partial<ComponentStyleProps> }, ...children: BaseComponent[]): BaseComponent {
        const instance = new type(props, children);
        return instance;
    }
}
