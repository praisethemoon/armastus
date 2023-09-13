import ComponentStyleProps from "./ComponentStyleProps";
import { parseCoordinate } from "./utils/parseCoordinate";


export interface ViewportInfo {
    x: number;
    y: number;
    width: number;
    height: number;
}

export type ComponentProps =  { style: Partial<ComponentStyleProps>;[key: string]: any }

export class BaseComponent<T = {}> {
    type: string = "base";
    props: ComponentProps = { style: {} };
    key: string = "";
    parent: BaseComponent | null = null;
    children: BaseComponent[] = [];
    previousProps: ComponentProps | null = null;

    state: any = {};

    /**
     * Viewport information
     * Spacing is not part of this!
     */
    viewport: ViewportInfo = {
        x: 0, y: 0, width: 0, height: 0
    }

    /**
     * Location of where to draw children within the viewport
     * this is mostly relevant when there is a border
     */
    childRenderViewport = {
        x: 0, y: 0, width: 0, height: 0
    }

    /**
     * Last rendered component
     */
    _renderCache: BaseComponent | null = null;

    constructor(props?: { style?: Partial<ComponentStyleProps>, key?: string } & T, children?: BaseComponent[]) {
        this.props = { ...this.props, ...props };
        this.props.style = { ...new ComponentStyleProps(), ...props?.style };
        this.previousProps = this.props;
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
        if (maxWidth !== null && maxWidth !== 'unset') {
            totalWidth = Math.min(totalWidth, this.computeDimension(maxWidth, maxWidth, parentW));
        }
        if (maxHeight !== null && maxHeight !== 'unset') {
            totalHeight = Math.min(totalHeight, this.computeDimension(maxHeight, maxHeight, parentH));
        }

        if (position === 'absolute') {
            // Absolute positioning
            this.viewport.x = this.computeDimension(left, null, parentW) + parentX;
            this.viewport.y = this.computeDimension(top, null, parentH) + parentY;
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

        this, this.viewport.x += spaceL;
        this.viewport.y += spaceT;

        this.viewport.width = totalWidth;
        this.viewport.height = totalHeight;


        // extract border values:
        let { borderWidth, borderLeftWidth, borderRightWidth, borderBottomWidth, borderTopWidth } = style;
        borderWidth = parseCoordinate(borderWidth, 0);
        borderLeftWidth = parseCoordinate(borderLeftWidth, borderWidth);
        borderRightWidth = parseCoordinate(borderRightWidth, borderWidth);
        borderBottomWidth = parseCoordinate(borderBottomWidth, borderWidth);
        borderTopWidth = parseCoordinate(borderTopWidth, borderWidth);

        // now we check if we have a border
        this.childRenderViewport = { ...this.viewport };
        this.childRenderViewport.y += borderTopWidth;
        this.childRenderViewport.x += borderLeftWidth;
        this.childRenderViewport.height -= borderTopWidth + borderBottomWidth;
        this.childRenderViewport.width -= borderLeftWidth + borderRightWidth;

        let accX = this.childRenderViewport.x;
        let accY = this.childRenderViewport.y;

        if(this._renderCache == null){
            this._renderCache = this.render();
        }

        if(this._renderCache != null){
            this._renderCache.parent = this;
            this._renderCache.computeViewport(accX, accY, this.childRenderViewport.width, this.childRenderViewport.height)
            // return because the render cache is the actual owner of the children
            return
        }

        let highestHeight = 0;

        let childCounter = -1;
        for (const child of this.children) {
            childCounter++;
            if (child.props.style.position === 'absolute') {
                child.computeViewport(0, 0, this.childRenderViewport.width, this.childRenderViewport.height)
                continue;
            };

            child.computeViewport(
                accX,
                accY,
                this.childRenderViewport.width,
                this.childRenderViewport.height
            );

            // Update the child viewport information
            accX = child.viewport.x + child.viewport.width;

            // Check if the child's height exceeds the highest height
            highestHeight = Math.max(highestHeight, child.viewport.height);

            // Check if the child exceeds the parent width, and if so, move to the next row
            if ((accX  > this.childRenderViewport.x + this.viewport.width) && childCounter > 0) {
                accX = this.childRenderViewport.x;
                accY += highestHeight; // Move to the next row
                highestHeight = child.viewport.height; // Reset highest height for the new row

                child.computeViewport(
                    accX,
                    accY,
                    this.childRenderViewport.width,
                    this.childRenderViewport.height
                );
    
                // Update the child viewport information
                accX = child.viewport.x + child.viewport.width;
    
                // Check if the child's height exceeds the highest height
                highestHeight = Math.max(highestHeight, child.viewport.height);
            }
        }
    }
    

    // Helper function to compute dimensions based on different types of values
    computeDimension(value: string | number | null | undefined, max: string | number | null | undefined, parentSize: number): number {
        if (value === undefined) {
            value = null;
        }

        if (max === undefined) {
            max = null;
        }

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
        } else if (value == null) {
            if (max == null) {
                return 0;
            }
            return this.computeDimension(max, null, parentSize);
        }
        else {
            // Value is null, use max value if provided, or 0 otherwise
            if (max !== null) {
                return typeof max === 'number' ? max : parseFloat(max);
            } else {
                return 0;
            }
        }
    }


    render() {
        
        return null;
    }

    renderLove2d() {}

    display(){
        // we call the renderLove2d initially
        this.renderLove2d();

        // check the render cache, if its on we display it, which in turn should
        // be responsible for rendering its children
        if(this._renderCache != null){
            // @ts-ignore
            this._renderCache.display()
        }
        else{
            // else we manually display children, since the object probably uses native love2d rendering
            this.displayChildren();
        }
    }

    displayChildren(){
        for (const child of this.children) {
            child.display();
        }
    }

    /**
     * Internal update function
     * @param dt 
     */
    update(dt: number) {
        this.updateLove2d(dt);
        // check if the root component has been rendered before
        if(this._renderCache == null){
            this._renderCache = this.render();
        }

        if (this.parent == null) {
            this.computeViewport(0, 0, parseCoordinate(this.props.style.width + "", 0), parseCoordinate(this.props.style.height + "", 0))
        }

        for (const child of this.children) {
            child.update(dt);
        }
    }

    /**
     * Override this if you want to call a love2d regular update function
     */
    updateLove2d(dt: number) {

    }

    setState(newState: any){
        this._renderCache = null;
        this.state = {...this.state, ...newState};
        this._renderCache = this.render();
        if(this._renderCache != null){
            // @ts-ignore
            this._renderCache.parent = this;
        }
        this.computeViewport(this.childRenderViewport.x, this.childRenderViewport.y, this.childRenderViewport.width, this.childRenderViewport.height)
    }


    /**
     * Helper functions
     */


    isMouseInside(): boolean {
        const x = love.mouse.getX();
        const y = love.mouse.getY();
        const bounds = [this.viewport.x, this.viewport.y, this.viewport.width, this.viewport.height];
        return x >= bounds[0] && x <= bounds[0] + bounds[2] && y >= bounds[1] && y <= bounds[1] + bounds[3];
    }
}