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
        borderColor = (typeof (borderColor) == "string") ? Color.fromString(borderColor) : borderColor
        borderTopColor = (typeof (borderTopColor) == "string") ? Color.fromString(borderTopColor) : borderTopColor
        borderRightColor = (typeof (borderRightColor) == "string") ? Color.fromString(borderRightColor) : borderRightColor
        borderBottomColor = (typeof (borderBottomColor) == "string") ? Color.fromString(borderBottomColor) : borderBottomColor
        borderLeftColor = (typeof (borderLeftColor) == "string") ? Color.fromString(borderLeftColor) : borderLeftColor


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

            if (typeof backgroundColor == "string") {
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
                love.graphics.push("all")
                const numSegments = 100
                love.graphics.setColor(bgColor[0], bgColor[1], bgColor[2], bgColor[3])
                // Fill the top, bottom, left, and right sides with rectangles
                love.graphics.rectangle('fill', borderRadiusTopLeft, 0, width - borderRadiusTopLeft - borderRadiusTopRight, borderRadiusTopLeft);
                love.graphics.rectangle('fill', borderRadiusBottomLeft, height - borderRadiusBottomLeft, width - borderRadiusBottomLeft - borderRadiusBottomRight, borderRadiusBottomLeft);
                love.graphics.rectangle('fill', 0, borderRadiusTopLeft, width - borderRadiusTopRight, height - borderRadiusTopLeft - borderRadiusBottomLeft);
                love.graphics.rectangle('fill', width - borderRadiusTopRight, borderRadiusTopRight, borderRadiusTopRight, height - borderRadiusTopRight - borderRadiusBottomRight);

                if (borderWidth + borderLeftWidth + borderRightWidth + borderTopWidth + borderBottomWidth > 0) {
                    print("Radius high")

                    const topColors = borderTopColor.toLove2DColor()
                    const bottomColors = borderBottomColor.toLove2DColor()
                    const leftColors = borderLeftColor.toLove2DColor()
                    const rightColors = borderRightColor.toLove2DColor()

                    // TOP LINE
                    love.graphics.setLineWidth(borderTopWidth)
                    love.graphics.setColor(topColors[0], topColors[1], topColors[2], topColors[3]);
                    love.graphics.rectangle('fill', borderRadiusTopLeft, 0, width - borderRadiusTopLeft - borderRadiusTopRight, borderTopWidth);

                    /** below is the same proceedure except, if the broder is zero, we use the nearest border color for drawing */
                    if (borderTopWidth == 0) {
                        love.graphics.setColor(leftColors[0], leftColors[1], leftColors[2], leftColors[3]);
                        love.graphics.arc('fill', borderRadiusTopLeft, borderRadiusTopLeft, borderRadiusTopLeft, -math.pi / 2, -3 * math.pi / 4, numSegments);
                        love.graphics.setColor(rightColors[0], rightColors[1], rightColors[2], rightColors[3])
                        love.graphics.arc('fill', width - borderRadiusTopRight, borderRadiusTopRight, borderRadiusTopRight, -math.pi / 2, -math.pi / 4, numSegments);
                    }
                    else {
                        // first arc top left
                        love.graphics.arc('fill', borderRadiusTopLeft, borderRadiusTopLeft, borderRadiusTopLeft, -math.pi / 2, -3 * math.pi / 4, numSegments);
                        // second arc top right
                        love.graphics.arc('fill', width - borderRadiusTopRight, borderRadiusTopRight, borderRadiusTopRight, -math.pi / 2, -math.pi / 4, numSegments);
                    }

                    // bottom line
                    love.graphics.setLineWidth(borderBottomWidth)
                    love.graphics.setColor(bottomColors[0], bottomColors[1], bottomColors[2], bottomColors[3]);
                    love.graphics.rectangle('fill', borderRadiusBottomLeft, height - borderRadiusBottomLeft, width - borderRadiusBottomLeft - borderRadiusBottomRight, borderBottomWidth);

                    if (borderBottomWidth == 0) {
                        love.graphics.setColor(leftColors[0], leftColors[1], leftColors[2], leftColors[3]);
                        love.graphics.arc('fill', borderRadiusBottomLeft, height - borderRadiusBottomLeft, borderRadiusBottomLeft, math.pi / 2, 3 * math.pi / 4, numSegments);
                        love.graphics.setColor(rightColors[0], rightColors[1], rightColors[2], rightColors[3])
                        love.graphics.arc('fill', width - borderRadiusBottomRight, height - borderRadiusBottomRight, borderRadiusBottomRight, math.pi / 2, math.pi / 4, numSegments);
                    }
                    else {
                        // first arc bottom left
                        love.graphics.arc('fill', borderRadiusBottomLeft, height - borderRadiusBottomLeft, borderRadiusBottomLeft, math.pi / 2, 3 * math.pi / 4, numSegments);
                        // second arc bottom right
                        love.graphics.arc('fill', width - borderRadiusBottomRight, height - borderRadiusBottomRight, borderRadiusBottomRight, math.pi / 2, math.pi / 4, numSegments);
                    }

                    // left line
                    love.graphics.setLineWidth(borderLeftWidth)
                    love.graphics.setColor(leftColors[0], leftColors[1], leftColors[2], leftColors[3]);
                    love.graphics.rectangle('fill', 0, borderRadiusTopLeft, borderLeftWidth, height - borderRadiusTopLeft - borderRadiusBottomLeft);

                    if (borderLeftWidth == 0) {
                        love.graphics.setColor(topColors[0], topColors[1], topColors[2], topColors[3]);
                        love.graphics.arc('fill', borderRadiusTopLeft, borderRadiusTopLeft, borderRadiusTopLeft, math.pi + math.pi / 4, math.pi, numSegments);
                        love.graphics.setColor(bottomColors[0], bottomColors[1], bottomColors[2], bottomColors[3])
                        love.graphics.arc('fill', borderRadiusBottomLeft, height - borderRadiusBottomLeft, borderRadiusBottomLeft, -math.pi - math.pi / 4, -math.pi, numSegments);
                    }
                    else {// first arc top left which stops at the middle
                        love.graphics.arc('fill', borderRadiusTopLeft, borderRadiusTopLeft, borderRadiusTopLeft, math.pi + math.pi / 4, math.pi, numSegments);
                        // second arc bottom left
                        love.graphics.arc('fill', borderRadiusBottomLeft, height - borderRadiusBottomLeft, borderRadiusBottomLeft, -math.pi - math.pi / 4, -math.pi, numSegments);
                    }

                    // right line
                    love.graphics.setLineWidth(borderRightWidth)
                    love.graphics.setColor(rightColors[0], rightColors[1], rightColors[2], rightColors[3]);
                    love.graphics.rectangle('fill', width - borderRadiusTopRight, borderRadiusTopRight, borderRightWidth, height - borderRadiusTopRight - borderRadiusBottomRight);
                    if (borderRightWidth == 0) {
                        love.graphics.setColor(topColors[0], topColors[1], topColors[2], topColors[3]);
                        love.graphics.arc('fill', width - borderRadiusTopRight, borderRadiusTopRight, borderRadiusTopRight, -math.pi / 4, 0, numSegments);
                        love.graphics.setColor(bottomColors[0], bottomColors[1], bottomColors[2], bottomColors[3])
                        love.graphics.arc('fill', width - borderRadiusBottomRight, height - borderRadiusBottomRight, borderRadiusBottomRight, math.pi / 4, 0, numSegments);
                    }
                    else {
                        // first arc top right
                        love.graphics.arc('fill', width - borderRadiusTopRight, borderRadiusTopRight, borderRadiusTopRight, 0, -math.pi / 4, numSegments);
                        // second arc bottom right
                        love.graphics.arc('fill', width - borderRadiusBottomRight, height - borderRadiusBottomRight, borderRadiusBottomRight, 0, math.pi / 4, numSegments);
                    }


                }
                else {
                    // Draw the top-left rounded corner
                    love.graphics.arc('fill', borderRadiusTopLeft, borderRadiusTopLeft, borderRadiusTopLeft, math.pi, math.pi * 1.5, numSegments);

                    // Draw the top-right rounded corner
                    love.graphics.arc('fill', width - borderRadiusTopRight, borderRadiusTopRight, borderRadiusTopRight, -math.pi * 0.5, 0, numSegments);

                    // Draw the bottom-left rounded corner
                    love.graphics.arc('fill', borderRadiusBottomLeft, height - borderRadiusBottomLeft, borderRadiusBottomLeft, math.pi * 0.5, math.pi, numSegments);

                    // Draw the bottom-right rounded corner

                    love.graphics.arc('fill', width - borderRadiusBottomRight, height - borderRadiusBottomRight, borderRadiusBottomRight, 0, math.pi * 0.5, numSegments);

                }
                love.graphics.pop()
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