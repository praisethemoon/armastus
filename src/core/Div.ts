import { Canvas, Shader } from "love.graphics";
import { BaseComponent } from "./BaseComponent";
import ComponentStyleProps from "./ComponentStyleProps";
import { Color, GradientColor } from "./Color";
import { parseCoordinate } from "./utils/parseCoordinate";

export class Div extends BaseComponent {
    private canvas: Canvas | null = null; // Store the canvas
    private prevCanvasW: number = 0;
    private prevCanvasH: number = 0;
    private gradientShader: Shader | null = null;

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

            backgroundColor,
            backgroundGradient
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
        if (backgroundColor || backgroundGradient) {
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
            const bgColor = backgroundColor!=null?backgroundColor.toLove2DColor():null


            // Draw the rounded rectangle on the canvas


            if (backgroundGradient != null) {
                if(!this.gradientShader) {
                    const { vertexShader, fragmentShader } = this.createShaderSource(backgroundGradient);
                    //if (this.gradientShader == null) {
                        this.gradientShader = love.graphics.newShader(vertexShader, fragmentShader);
                        print("errors: ", this.gradientShader.getWarnings())

                        let gradientLocations: any[] = []
                        let gradientColors: any[] = []

                        for (let i = 0; i < backgroundGradient.colorStops.length; i++) {
                            gradientLocations.push((parseInt(backgroundGradient.colorStops[i].position)/100))
                            print(parseInt(backgroundGradient.colorStops[i].position)/100)
                            gradientColors.push(backgroundGradient.colorStops[i].color.toLove2DColor())
                        }
                        //print(gradientLocations.length, gradientColors.length)

                        //this.gradientShader.send("numColorStops", gradientLocations.length);
                        this.gradientShader.send("colorPositions", ...gradientLocations);
                        this.gradientShader.send("colorStops", ...gradientColors);
                    }
                
                love.graphics.setShader(this.gradientShader as Shader);
                love.graphics.rectangle('fill', 0, 0, width, height);
                love.graphics.setShader();
            }
            else if(bgColor != null) {
                
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
            love.graphics.setColor(1, 1, 1, bgColor!=null?bgColor[3]:1);
            love.graphics.draw(this.canvas, x, y);

            // Reset the color
            love.graphics.setColor(1, 1, 1, 1);
        }
    }

    createShaderSource(gradient: GradientColor) {
        print(gradient)
        print(...gradient.colorStops[0].color.toLove2DColor())
        const vertexShader = `
            vec4 position(mat4 transform_projection, vec4 vertex_position)
            {
                return transform_projection * vertex_position;
            }
        `;
    
        const fragmentShader = `
            int numColorStops = ${gradient.colorStops.length};
            extern vec4 colorStops[${gradient.colorStops.length}];
            extern float colorPositions[${gradient.colorStops.length}];
            float angle = ${gradient.angle}; // Added angle parameter
    
            vec4 effect(vec4 color, Image texture, vec2 texture_coords, vec2 screen_coords) {
                vec2 dir = normalize(vec2(cos(angle), sin(angle))); // Calculate gradient direction from angle
                float pos = dot(screen_coords - love_ScreenSize.xy / 2.0, dir) / length(love_ScreenSize.xy / 2.0); // Position along the gradient direction
    
                int index = 0;
                for (int i = 0; i < numColorStops - 1; i++) {
                    if (pos >= colorPositions[i] && pos <= colorPositions[i + 1]) {
                        index = i;
                        break;
                    }
                }
    
                vec4 color1 = colorStops[index];
                vec4 color2 = colorStops[index + 1];
                float t = (pos - colorPositions[index]) / (colorPositions[index + 1] - colorPositions[index]);
                return mix(color1, color2, t);
            }
        `;
    
        return { vertexShader, fragmentShader };
    }
    

    render() {
        this.renderCanvas()
        // Render child elements
        for (const child of this.children) {
            child.render();
        }
    }
}