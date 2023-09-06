import { Canvas } from "love.graphics";
import { BaseComponent } from "./BaseComponent";
import ComponentStyleProps from "./ComponentStyleProps";
import { Color } from "./Color";

export class Div extends BaseComponent {
    private canvas: Canvas | null = null; // Store the canvas
    private prevCanvasW: number = 0;
    private prevCanvasH: number = 0;

    constructor(props?: { style: Partial<ComponentStyleProps>, key?: string }, children?: BaseComponent[]) {
        super(props, children);
    }

    render() {
        love.graphics.push('all')
        let c: Color = (typeof this.props.style.backgroundColor == 'string') ?  Color.fromString(this.props.style.backgroundColor as string) : this.props.style.backgroundColor || new Color(0, 0, 0, 255)
            
        const [r, g, b, a] = c.toLove2DColor()
        love.graphics.setColor(r, g, b, a)
        love.graphics.rectangle('fill', this.viewport.x, this.viewport.y, this.viewport.width, this.viewport.height)
        love.graphics.pop()

        // Render child elements
        for (const child of this.children) {
            child.render();
        }
    }


}