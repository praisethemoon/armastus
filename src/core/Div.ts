import { Canvas } from "love.graphics";
import { BaseComponent } from "./BaseComponent";
import ComponentStyleProps from "./ComponentStyleProps";
import { Color } from "./Color";
import { parseCoordinate } from "./utils/parseCoordinate";

export class Div extends BaseComponent {
    private canvas: Canvas | null = null; // Store the canvas
    private prevCanvasW: number = 0;
    private prevCanvasH: number = 0;

    constructor(props?: { style: Partial<ComponentStyleProps>, key?: string }, children?: BaseComponent[]) {
        super(props, children);
    }

    renderCanvas() {
        this.canvas = this.canvas || love.graphics.newCanvas();
        love.graphics.setCanvas(this.canvas as Canvas);
        const {
            x,
            y,
            width,
            height,
        } = this.viewport;

        let {
            borderRadius,
            borderRadiusBottomRight,
            borderRadiusBottomLeft,
            borderRadiusTopLeft,
            borderRadiusTopRight,

            borderColor,
            borderTopColor,
            borderRightColor,
            borderBottomColor,
            borderLeftColor,

            borderWidth,
            borderTopWidth,
            borderRightWidth,
            borderBottomWidth,
            borderLeftWidth,

            backgroundColor
        } = this.props.style;

        //print(borderRadius, borderRadiusBottomRight, borderRadiusBottomLeft, borderRadiusTopLeft, borderRadiusTopRight)

        borderRadius = parseCoordinate(borderRadius + "", 0)
        borderRadiusBottomRight = (borderRadiusBottomRight != null) ? parseCoordinate(borderRadiusBottomRight + "", 0) : borderRadius
        borderRadiusBottomLeft = (borderRadiusBottomLeft != null) ? parseCoordinate(borderRadiusBottomLeft + "", 0) : borderRadius
        borderRadiusTopLeft = (borderRadiusTopLeft != null) ? parseCoordinate(borderRadiusTopLeft + "", 0) : borderRadius
        borderRadiusTopRight = (borderRadiusTopRight != null) ? parseCoordinate(borderRadiusTopRight + "", 0) : borderRadius

        borderWidth = parseCoordinate(borderWidth + "", 0)
        borderTopWidth = (borderTopWidth != null) ? parseCoordinate(borderTopWidth + "", 0) : borderWidth
        borderRightWidth = (borderRightWidth != null) ? parseCoordinate(borderRightWidth + "", 0) : borderWidth
        borderBottomWidth = (borderBottomWidth != null) ? parseCoordinate(borderBottomWidth + "", 0) : borderWidth
        borderLeftWidth = (borderLeftWidth != null) ? parseCoordinate(borderLeftWidth + "", 0) : borderWidth

        borderColor = borderColor || "#000000"
        borderTopColor = borderTopColor || borderColor
        borderRightColor = borderRightColor || borderColor
        borderBottomColor = borderBottomColor || borderColor
        borderLeftColor = borderLeftColor || borderColor

        // we convert colors to love2d colors
        borderColor = (typeof(borderColor) == "string") ? Color.fromString(borderColor) : borderColor
        borderTopColor = (typeof(borderTopColor) == "string") ? Color.fromString(borderTopColor) : borderTopColor
        borderRightColor = (typeof(borderRightColor) == "string") ? Color.fromString(borderRightColor) : borderRightColor
        borderBottomColor = (typeof(borderBottomColor) == "string") ? Color.fromString(borderBottomColor) : borderBottomColor
        borderLeftColor = (typeof(borderLeftColor) == "string") ? Color.fromString(borderLeftColor) : borderLeftColor
        

        //print(borderRadius, borderRadiusBottomRight, borderRadiusBottomLeft, borderRadiusTopLeft, borderRadiusTopRight)


        //print("render: ", this.width)
        if (backgroundColor) {
            // Create a canvas to draw the rounded rectangle
            //if (!this.canvas) {
            if ((this.prevCanvasH != height) || (this.prevCanvasW != width) || (this.canvas == null)) {
                if (this.canvas != null) {
                    this.canvas.release()
                }

                this.canvas = love.graphics.newCanvas(width, height);
                this.prevCanvasH = height
                this.prevCanvasW = width
            }
            love.graphics.setCanvas(this.canvas);
            love.graphics.clear();

            if(typeof backgroundColor == "string") {
                backgroundColor = Color.fromString(backgroundColor);
            }

            const bgColor = backgroundColor.toLove2DColor()


            // Draw the rounded rectangle on the canvas
            love.graphics.setColor(
                bgColor[0], bgColor[1], bgColor[2], 1
            );
            if (borderRadiusBottomRight == 0 && borderRadiusBottomLeft == 0 && borderRadiusTopLeft == 0 && borderRadiusTopRight == 0) {
                love.graphics.rectangle('fill', 0, 0, width, height);
            }
            else {
                const numSegments = 100

                // Draw the top-left rounded corner
                {
                    love.graphics.arc('fill', borderRadiusTopLeft, borderRadiusTopLeft, borderRadiusTopLeft, math.pi, math.pi * 1.5, numSegments);

                    // Draw the top-right rounded corner
                    love.graphics.arc('fill', width - borderRadiusTopRight, borderRadiusTopRight, borderRadiusTopRight, -math.pi * 0.5, 0, numSegments);

                    // Draw the bottom-left rounded corner
                    love.graphics.arc('fill', borderRadiusBottomLeft, height - borderRadiusBottomLeft, borderRadiusBottomLeft, math.pi * 0.5, math.pi, numSegments);

                    // Draw the bottom-right rounded corner
                    love.graphics.arc('fill', width - borderRadiusBottomRight, height - borderRadiusBottomRight, borderRadiusBottomRight, 0, math.pi * 0.5, numSegments);

                    // Fill the top, bottom, left, and right sides with rectangles
                    love.graphics.rectangle('fill', borderRadiusTopLeft, 0, width - borderRadiusTopLeft - borderRadiusTopRight, borderRadiusTopLeft);
                    love.graphics.rectangle('fill', borderRadiusBottomLeft, height - borderRadiusBottomLeft, width - borderRadiusBottomLeft - borderRadiusBottomRight, borderRadiusBottomLeft);
                    love.graphics.rectangle('fill', 0, borderRadiusTopLeft, width - borderRadiusTopRight, height - borderRadiusTopLeft - borderRadiusBottomLeft);
                    love.graphics.rectangle('fill', width - borderRadiusTopRight, borderRadiusTopRight, borderRadiusTopRight, height - borderRadiusTopRight - borderRadiusBottomRight);

                    // Now, render the canvas with opacity
                }
            }
            /**
             * Now we draw border
             */
            /*
            if (borderTopWidth > 0) {
                const colors = borderTopColor.toLove2DColor()
                love.graphics.setColor(colors[0], colors[1], colors[2], colors[3]);
                // we draw border same as in web, we respect radius and border width
                love.graphics.setLineWidth(borderTopWidth)
                love.graphics.rectangle('line', borderRadiusTopLeft, 0, width - borderRadiusTopLeft - borderRadiusTopRight, borderTopWidth);
            }
            */

            love.graphics.setCanvas(); // Reset the canvas
            love.graphics.setColor(1, 1, 1, bgColor[3]);
            love.graphics.draw(this.canvas, x, y);

            // Reset the color
            love.graphics.setColor(1, 1, 1, 1);
        }
    }


    render() {
        this.renderCanvas()
        // Render child elements
        for (const child of this.children) {
            child.render();
        }
    }
}