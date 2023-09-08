import { Canvas, Shader } from "love.graphics";
import { BaseComponent } from "./BaseComponent";
import ComponentStyleProps from "./ComponentStyleProps";
import { Color, GradientColor } from "./Color";
import { parseCoordinate } from "./utils/parseCoordinate";
import { ShaderFactory } from "./ShaderFactory";

export class Div extends BaseComponent {
    canvas: Canvas | null = null; // Store the canvas
    prevCanvasW: number = 0;
    prevCanvasH: number = 0;
    gradientShader: Shader | null = null;

    constructor(props?: { style?: Partial<ComponentStyleProps>, key?: string }, children?: BaseComponent[]) {
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
        if (backgroundColor != null) {
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

            if (typeof backgroundColor == "string") {
                backgroundColor = Color.fromString(backgroundColor);
            }

            // Draw the rounded rectangle on the canvas

            this.renderColor(backgroundColor)

            if (borderRadiusBottomRight == 0 && borderRadiusBottomLeft == 0 && borderRadiusTopLeft == 0 && borderRadiusTopRight == 0) {
                love.graphics.rectangle('fill', 0, 0, width, height);
            }

            else {
                love.graphics.push("all")
                const numSegments = 100
                
                // Fill the top, bottom, left, and right sides with rectangles
                love.graphics.rectangle('fill', borderRadiusTopLeft, 0, width - borderRadiusTopLeft - borderRadiusTopRight, borderRadiusTopLeft);
                love.graphics.rectangle('fill', borderRadiusBottomLeft, height - borderRadiusBottomLeft, width - borderRadiusBottomLeft - borderRadiusBottomRight, borderRadiusBottomLeft);
                love.graphics.rectangle('fill', 0, borderRadiusTopLeft, width - borderRadiusTopRight, height - borderRadiusTopLeft - borderRadiusBottomLeft);
                love.graphics.rectangle('fill', width - borderRadiusTopRight, borderRadiusTopRight, borderRadiusTopRight, height - borderRadiusTopRight - borderRadiusBottomRight);

                if (borderWidth + borderLeftWidth + borderRightWidth + borderTopWidth + borderBottomWidth > 0) {

                    // TOP LINE
                    love.graphics.setLineWidth(borderTopWidth)
                    this.renderColor(borderTopColor)
                    love.graphics.rectangle('fill', borderRadiusTopLeft, 0, width - borderRadiusTopLeft - borderRadiusTopRight, borderTopWidth);

                    /** below is the same proceedure except, if the broder is zero, we use the nearest border color for drawing */
                    if (borderTopWidth == 0) {
                        this.renderColor(borderLeftColor)
                        love.graphics.arc('fill', borderRadiusTopLeft, borderRadiusTopLeft, borderRadiusTopLeft, -math.pi / 2, -3 * math.pi / 4, numSegments);
                        this.renderColor(borderRightColor)
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
                    this.renderColor(borderBottomColor)
                    love.graphics.rectangle('fill', borderRadiusBottomLeft, height - borderRadiusBottomLeft, width - borderRadiusBottomLeft - borderRadiusBottomRight, borderBottomWidth);

                    if (borderBottomWidth == 0) {
                        this.renderColor(borderLeftColor)
                        love.graphics.arc('fill', borderRadiusBottomLeft, height - borderRadiusBottomLeft, borderRadiusBottomLeft, math.pi / 2, 3 * math.pi / 4, numSegments);
                        this.renderColor(borderRightColor)
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
                    this.renderColor(borderLeftColor)
                    love.graphics.rectangle('fill', 0, borderRadiusTopLeft, borderLeftWidth, height - borderRadiusTopLeft - borderRadiusBottomLeft);

                    if (borderLeftWidth == 0) {
                        this.renderColor(borderTopColor)
                        love.graphics.arc('fill', borderRadiusTopLeft, borderRadiusTopLeft, borderRadiusTopLeft, math.pi + math.pi / 4, math.pi, numSegments);
                        this.renderColor(borderBottomColor)
                        love.graphics.arc('fill', borderRadiusBottomLeft, height - borderRadiusBottomLeft, borderRadiusBottomLeft, -math.pi - math.pi / 4, -math.pi, numSegments);
                    }
                    else {// first arc top left which stops at the middle
                        love.graphics.arc('fill', borderRadiusTopLeft, borderRadiusTopLeft, borderRadiusTopLeft, math.pi + math.pi / 4, math.pi, numSegments);
                        // second arc bottom left
                        love.graphics.arc('fill', borderRadiusBottomLeft, height - borderRadiusBottomLeft, borderRadiusBottomLeft, -math.pi - math.pi / 4, -math.pi, numSegments);
                    }

                    // right line
                    love.graphics.setLineWidth(borderRightWidth)
                    this.renderColor(borderRightColor)
                    love.graphics.rectangle('fill', width - borderRadiusTopRight, borderRadiusTopRight, borderRightWidth, height - borderRadiusTopRight - borderRadiusBottomRight);
                    if (borderRightWidth == 0) {
                        this.renderColor(borderTopColor)
                        love.graphics.arc('fill', width - borderRadiusTopRight, borderRadiusTopRight, borderRadiusTopRight, -math.pi / 4, 0, numSegments);
                        this.renderColor(borderBottomColor)
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
            love.graphics.setShader();
            love.graphics.setCanvas(); // Reset the canvas
            //love.graphics.setColor(1, 1, 1, bgColor != null ? bgColor[3] : 1);
            love.graphics.setColor(1, 1, 1, this.getColorOpacity(backgroundColor))
            love.graphics.draw(this.canvas, x, y);

            // Reset the color
            love.graphics.setColor(1, 1, 1, 1);
        }
    }

    renderColor(color: Color | GradientColor | string | null){
        const colorObject: Color | GradientColor | null = (typeof(color) == "string") ? Color.fromString(color) : color
        
        if(colorObject != null) {
            if(colorObject.type == "color") {
                const rgba = (colorObject as Color).toLove2DColor()
                // we set opacity to 1 and draw the entire canvas with the color opacity later on.
                // this is to prevent alpha overlap when rendering div rectangles
                love.graphics.setColor(rgba[0], rgba[1], rgba[2], 1)
            }
            else {
                love.graphics.setShader((colorObject as GradientColor).getShader())
            }
        }
    }

    getColorOpacity(color: Color | GradientColor | string | null){
        const colorObject: Color | GradientColor | null = (typeof(color) == "string") ? Color.fromString(color) : color
        if(colorObject?.type == "color") {
            return (colorObject as Color).alpha/255
        }
        return 1
    }

    render() {
        this.renderCanvas()
        // Render child elements
        for (const child of this.children) {
            child.render();
        }
    }
}