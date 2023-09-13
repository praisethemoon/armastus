import { Canvas, Image, Shader, scale } from "love.graphics";
import { BaseComponent } from "./BaseComponent";
import ComponentStyleProps from "./ComponentStyleProps";
import { Color, GradientColor } from "./Color";
import { parseCoordinate } from "./utils/parseCoordinate";
import { ShaderFactory } from "./ShaderFactory";
import { AssetMap } from "./AssetMap";

export class Div extends BaseComponent {
    canvas: Canvas | null = null; // Store the canvas
    prevCanvasW: number = 0;
    prevCanvasH: number = 0;
    gradientShader: Shader | null = null;

    constructor(props?: { style?: Partial<ComponentStyleProps>, key?: string }, children?: BaseComponent[]) {
        super(props, children);
    }

    renderCanvas() {
        let {
            borderColor,
            borderTopColor,
            borderRightColor,
            borderBottomColor,
            borderLeftColor,
            backgroundColor,
            backgroundImageId,
        } = this.props.style;

        const {
            borderBottomWidth,
            borderLeftWidth,
            borderRadius,
            borderRadiusBottomLeft,
            borderRadiusBottomRight,
            borderRadiusTopLeft,
            borderRadiusTopRight,
            borderRightWidth,
            borderTopWidth,
            borderWidth
        } = this.extractBorderProps();

        borderColor = borderColor || backgroundColor || "#000000";
        borderTopColor = borderTopColor || borderColor;
        borderRightColor = borderRightColor || borderColor;
        borderBottomColor = borderBottomColor || borderColor;
        borderLeftColor = borderLeftColor || borderColor;
        this.canvas = this.canvas || love.graphics.newCanvas();

        love.graphics.setCanvas(this.canvas);

        const {
            x,
            y,
            width,
            height,
        } = this.viewport;

        const contentX = this.childRenderViewport.x - x;
        const contentY = this.childRenderViewport.y - y;
        const contentWidth = this.childRenderViewport.width;
        const contentHeight = this.childRenderViewport.height;

        // Check if we need to resize the canvas
        if ((this.prevCanvasH != height) || (this.prevCanvasW != width) || (this.canvas == null)) {
            if (this.canvas != null) {
                this.canvas.release();
            }

            this.canvas = love.graphics.newCanvas(width, height);
            this.prevCanvasH = height;
            this.prevCanvasW = width;
        }

        const hasBorderRadius =
            borderRadius !== 0 ||
            borderRadiusBottomRight !== 0 ||
            borderRadiusBottomLeft !== 0 ||
            borderRadiusTopLeft !== 0 ||
            borderRadiusTopRight !== 0;

        const hasBorderWidth =
            borderWidth !== 0 ||
            borderTopWidth !== 0 ||
            borderRightWidth !== 0 ||
            borderBottomWidth !== 0 ||
            borderLeftWidth !== 0;

        // Clear the canvas
        love.graphics.clear();

        if (backgroundColor != null) {
            // Fill the area of the childRenderViewport with the background color
            this.renderColor(backgroundColor);
            //love.graphics.rectangle("fill", 0, 0, width, height);
            
            const emptyImageData = love.image.newImageData(width, height);

            // Create a texture from the empty image data
            const emptyTexture = love.graphics.newImage(emptyImageData);

            // Create a quad for the rectangle
            const quad = love.graphics.newQuad(0, 0, width, height, width, height);
            love.graphics.draw(emptyTexture, quad, 0, 0);
            this.resetColor()
        }


        if(backgroundImageId != null) {
            this.renderBGImage()
        }


        // Set border colors and draw borders
        if (hasBorderWidth) {
            // Draw rounded rectangle with borders
            //print(borderColor, borderTopColor, borderRightColor, borderBottomColor, borderLeftColor)
            this.renderColor(borderTopColor)
            // draw top line
            love.graphics.setLineWidth(borderTopWidth)
            love.graphics.line(0, 0, width, 0)
            this.resetColor()

            this.renderColor(borderRightColor)
            love.graphics.setLineWidth(borderRightWidth)
            love.graphics.line(width, 0, width, height)
            this.resetColor()

            this.renderColor(borderBottomColor)
            love.graphics.setLineWidth(borderBottomWidth)
            love.graphics.line(0, height, width, height)
            this.resetColor()

            this.renderColor(borderLeftColor)
            love.graphics.setLineWidth(borderLeftWidth)
            love.graphics.line(0, 0, 0, height)
            this.resetColor()

            love.graphics.setLineWidth(1)
        }

        love.graphics.setCanvas();

        // TODO: inherit transparency from color (if not gradient)
        if (hasBorderRadius) {
            this.applyMask(borderRadiusTopLeft, borderRadiusTopRight, borderRadiusBottomLeft, borderRadiusBottomRight);
        }

        love.graphics.setColor(1, 1, 1, 1);
        love.graphics.draw(this.canvas, x, y);
        this.clearMask()
    }

    applyMask(
        topLeft: number = 0,
        topRight: number = 0,
        bottomLeft: number = 0,
        bottomRight: number = 0
    ) {
        const { width, height, x, y } = this.viewport;

        // Create a stencil function for rounded corners and filled area
        const stencilFunction = () => {
            love.graphics.push("all")
            love.graphics.translate(x, y);
            // Draw the top edge
            love.graphics.rectangle("fill", topLeft, 0, width - topLeft - topRight, topRight);
            // Draw the bottom edge
            love.graphics.rectangle("fill", bottomLeft, height - bottomLeft, width - bottomLeft - bottomRight, bottomRight);
            // Draw the left edge
            love.graphics.rectangle("fill", 0, topLeft, topLeft, height - topLeft - bottomLeft);
            // Draw the right edge
            love.graphics.rectangle("fill", width - topRight, topRight, topRight, height - topRight - bottomRight);

            // Cut out the rounded corners using arcs
            love.graphics.arc("fill", "pie", topLeft, topLeft, topLeft, math.pi, math.pi * 1.5, 20);
            love.graphics.arc("fill", "pie", width - topRight, topRight, topRight, -math.pi * 0.5, 0, 20);
            love.graphics.arc("fill", "pie", bottomLeft, height - bottomLeft, bottomLeft, math.pi * 0.5, math.pi, 20);
            love.graphics.arc("fill", "pie", width - bottomRight, height - bottomRight, bottomRight, 0, math.pi * 0.5, 20);

            // fill remaining area
            love.graphics.rectangle("fill", topLeft, topLeft, width - topLeft - topRight, height - topLeft - bottomLeft);
            love.graphics.pop()
        };

        love.graphics.stencil(stencilFunction, "replace", 1)
        love.graphics.setStencilTest("greater", 0)

        // Set up the stencil
    }

    clearMask() {
        love.graphics.setStencilTest()
    }

    /*
    removed because we simply removed round edges with masks
    drawRoundedCorners(width: number, height: number, topLeft: number, topRight: number, bottomLeft: number, bottomRight: number) {
        
        // Top-left corner
        love.graphics.arc("line", "open", topLeft, topLeft, topLeft, math.pi, math.pi * 1.5)

        // Top-right corner
        love.graphics.arc("line", "open", width - topRight, topRight, topRight, -math.pi * 0.5, 0)

        // Bottom-left corner
        love.graphics.arc("line", "open", bottomLeft, height - bottomLeft, bottomLeft, math.pi * 0.5, math.pi)

        // Bottom-right corner
        love.graphics.arc("line", "open", width - bottomRight, height - bottomRight, bottomRight, 0, math.pi * 0.5)
    }
    */


    renderColor(color: Color | GradientColor | string | null) {
        const colorObject: Color | GradientColor | null = (typeof (color) == "string") ? Color.fromString(color) : color

        if (colorObject != null) {
            if (colorObject.type == "color") {
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

    resetColor() {
        love.graphics.setColor(1, 1, 1, 1)
        love.graphics.setShader()
    }

    renderBGImage() {

        if (this.props.style.backgroundImageId == null) {
            return;
        }

        const image = AssetMap.loadImage(this.props.style.backgroundImageId);

        // Render the background image with the mask
        // TODO: calculate image extent
        const {
            x,
            y,
            width,
            height,
        } = this.viewport;

        const {/*backgroundImageRender, */backgroundImageSize} = this.props.style;
        
        const imageWidth = image.getWidth();
        const imageHeight = image.getHeight();

        let imgX = 0;
        let imgY = 0;

        let scaleX = 1;
        let scaleY = 1;

        if(backgroundImageSize == "contain"){
            // scale image to fit inside the div while maintaining aspect ration
            const scale = math.min(width / imageWidth, height / imageHeight)
            scaleX = scale
            scaleY = scale

            const scaledWidth = imageWidth * scale
            const scaledHeight = imageHeight * scale
            imgX = width / 2 - scaledWidth / 2
            imgY = height / 2 - scaledHeight / 2
            
        }
        else if(backgroundImageSize == "cover"){
            // scale image to cover the entire div while maintaining aspect ration
            const scale = math.max(width / imageWidth, height / imageHeight)
            scaleX = scale
            scaleY = scale

            const scaledWidth = imageWidth * scale
            const scaledHeight = imageHeight * scale
            imgX = width / 2 - scaledWidth / 2
            imgY = height / 2 - scaledHeight / 2
        }
        else if (backgroundImageSize == "fill") {
            // The replaced content is sized to fill the element's content box
            scaleX = width / imageWidth
            scaleY = height / imageHeight
        }
        else if (typeof (backgroundImageSize) == "string") {
            let size_x = parseCoordinate(backgroundImageSize, imageWidth)
            let size_y = parseCoordinate(backgroundImageSize, imageHeight)

            scaleX = size_x / imageWidth
            scaleY = size_y / imageHeight
        }
        else if (typeof (backgroundImageSize) == "number") {
            scaleX = backgroundImageSize / imageWidth
            scaleY = backgroundImageSize / imageHeight
        }
        else if (Array.isArray(backgroundImageSize)) {
            let size_x = parseCoordinate(backgroundImageSize[0], imageWidth)
            let size_y = parseCoordinate(backgroundImageSize[1], imageHeight)

            scaleX = size_x / imageWidth
            scaleY = size_y / imageHeight
        }

        love.graphics.draw(image, imgX, imgY, 0, scaleX, scaleY);
    }

    /**
     * Renders mask so everything outside the mask is not visible
     */
    startRenderMask() {
    }

    endRenderMask() {
        // Reset the stencil
        love.graphics.setStencilTest();
    }

    getColorOpacity(color: Color | GradientColor | string | null) {
        const colorObject: Color | GradientColor | null = (typeof (color) == "string") ? Color.fromString(color) : color
        if (colorObject?.type == "color") {
            return (colorObject as Color).alpha / 255
        }
        return 1
    }

    renderLove2d() {
        love.graphics.push("all")
        this.renderCanvas()
        love.graphics.pop()
    }

    extractBorderProps() {
        let {
            borderRadius,
            borderRadiusBottomRight,
            borderRadiusBottomLeft,
            borderRadiusTopLeft,
            borderRadiusTopRight,

            borderWidth,
            borderTopWidth,
            borderRightWidth,
            borderBottomWidth,
            borderLeftWidth,
        } = this.props.style;

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


        return {
            borderRadius: borderRadius as number,
            borderRadiusBottomRight: borderRadiusBottomRight as number,
            borderRadiusBottomLeft: borderRadiusBottomLeft as number,
            borderRadiusTopLeft: borderRadiusTopLeft as number,
            borderRadiusTopRight: borderRadiusTopRight as number,

            // border width
            borderWidth: borderWidth as number,
            borderTopWidth: borderTopWidth as number,
            borderRightWidth: borderRightWidth as number,
            borderBottomWidth: borderBottomWidth as number,
            borderLeftWidth: borderLeftWidth as number,
        }

    }
}