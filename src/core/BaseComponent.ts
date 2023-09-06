import ComponentStyleProps from "./ComponentStyleProps";
import { parseCoordinate } from "./utils/parseCoordinate";


export interface ViewportInfo {
    x: number;
    y: number;
    width: number;
    height: number;
}

export class BaseComponent {
    type: string = "base";
    props: { style: Partial<ComponentStyleProps>;[key: string]: any } = { style: {} };
    key: string = "";
    parent: BaseComponent | null = null;
    children: BaseComponent[] = [];

    /**
     * Viewport information
     */
    viewport: ViewportInfo = {
        x: 0, y: 0, width: 0, height: 0
    }

    constructor(props?: { style: Partial<ComponentStyleProps>, key?: string }, children?: BaseComponent[]) {
        this.props = { ...this.props, ...props };
        this.props.style = { ...new ComponentStyleProps(), ...props?.style };
        this.key = props?.key || "";


        for (const child of (children || [])) {
            child.parent = this;
            this.addChild(child);
        }
    }

    /**
     * pushes a child to the children array
     * @param child
     */
    addChild(child: BaseComponent) {
        child.parent = this;
        this.children.push(child);
    }
    /**
       * Compute the viewport information for this component and its parent, considering their properties.
       * @param parentX The x-coordinate of the parent's viewport.
       * @param parentY The y-coordinate of the parent's viewport.
       * @param parentW The width of the parent's viewport.
       * @param parentH The height of the parent's viewport.
       */
    computeViewport(parentX: number, parentY: number, parentW: number, parentH: number) {
        // Initialize the child viewport with the parent's viewport

        // Apply the component's own style properties
        const style: Partial<ComponentStyleProps> = this.props.style || new ComponentStyleProps();
        const { width, height, maxWidth, maxHeight, position, top, left, space, spaceLeft, spaceBottom, spaceRight, spaceTop } = style;

        // Initialize variables to calculate the combined dimensions of all child components
        let totalWidth = this.computeDimension(width, maxWidth, parentW);
        let totalHeight = this.computeDimension(height, maxHeight, parentH);

        // check if max width or height is set
        if (maxWidth !== undefined && maxWidth !== 'unset') {
            totalWidth = Math.min(totalWidth, this.computeDimension(maxWidth, maxWidth, parentW));
        }
        if (maxHeight !== undefined && maxHeight !== 'unset') {
            totalHeight = Math.min(totalHeight, this.computeDimension(maxHeight, maxHeight, parentH));
        }

        if (position === 'absolute') {
            // Absolute positioning
            this.viewport.x = this.computeDimension(left, undefined, parentW) + parentX;
            this.viewport.y = this.computeDimension(top, undefined, parentH) + parentY;
        } else {
            this.viewport.x = parentX;
            this.viewport.y = parentY;
        }

        let spaceL = this.computeDimension(spaceLeft, space, parentW);
        let spaceR = this.computeDimension(spaceRight, space, parentW);
        let spaceT = this.computeDimension(spaceTop, space, parentH);
        let spaceB = this.computeDimension(spaceBottom, space, parentH);

        totalWidth = totalWidth - spaceL - spaceR;
        totalHeight = totalHeight - spaceT - spaceB;

        this,this.viewport.x += spaceL;
        this.viewport.y += spaceT;

        this.viewport.width = totalWidth;
        this.viewport.height = totalHeight;

        let accX = this.viewport.x;
        let accY = this.viewport.y;

        let highestHeight = 0;

        for (const child of this.children) {
            if(child.props.style.position === 'absolute') {
                child.computeViewport(0, 0, this.viewport.width, this.viewport.height)
                continue;
            };

            const childViewportResult = child.computeViewport(
                accX,
                accY,
                this.viewport.width,
                this.viewport.height
            );

            // Update the child viewport information
            accX = child.viewport.x + child.viewport.width;

            // Check if the child's height exceeds the highest height
            highestHeight = Math.max(highestHeight, child.viewport.height);

            // Check if the child exceeds the parent width, and if so, move to the next row
            if (accX + child.viewport.width > this.viewport.x + this.viewport.width) {
                accX = this.viewport.x;
                accY += highestHeight; // Move to the next row
                highestHeight = child.viewport.height; // Reset highest height for the new row

                // now the child surely exceed the area, we reassign it to new row
                child.viewport.x = accX;
                child.viewport.y = accY;

                // Update the accumulated x-coordinate
                accX += child.viewport.width;

            }
        }

        /*
        if(this.key == "obj1") {
            print("current dims", this.viewport.x, this.viewport.y, this.viewport.width, this.viewport.height)
            print("parent:", parentX, parentY, parentW, parentH)
        }
        */
    }

    // Helper function to compute dimensions based on different types of values
    computeDimension(value: string | number | undefined, max: string | number | undefined, parentSize: number): number {
        if (typeof value === 'number') {
            return value;
        } else if (typeof value === 'string') {
            if (value === 'unset' || value === 'auto') {
                return 0;
            } else if (value.endsWith('%')) {
                return (parseFloat(value) / 100) * parentSize;
            } else {
                return parseFloat(value);
            }
        } else if (value == undefined) {
            if(max == undefined) {
                return 0;
            }
            return this.computeDimension(max, undefined, parentSize);
        } 
        else {
            // Value is undefined, use max value if provided, or 0 otherwise
            if (max !== undefined) {
                return typeof max === 'number' ? max : parseFloat(max);
            } else {
                return 0;
            }
        }
    }


    render() { }

    update(dt: number) {
        if (this.parent == null) {
            this.computeViewport(0, 0, parseCoordinate(this.props.style.width + "", 0), parseCoordinate(this.props.style.height + "", 0))
        }

        for (const child of this.children) {
            child.update(dt);
        }
    }


}