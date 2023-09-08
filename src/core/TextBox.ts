import { Font } from "love.graphics";
import { AssetMap } from "./AssetMap";
import { BaseComponent } from "./BaseComponent";
import ComponentStyleProps from "./ComponentStyleProps";
import { Div } from "./Div";
import { parseCoordinate } from "./utils/parseCoordinate";
import { Color } from "./Color";

type TextBoxHAlign = "left" | "center" | "right";
type TextBoxVAlign = "top" | "center" | "bottom";
type TextContentAlign = "left" | "right" | "center" | "justify"

export class TextBox extends Div {
    fontAssetName: string;
    fontSize: number;
    font: Font;
    text: string
    halign: TextBoxHAlign = "left";
    valign: TextBoxVAlign = "top";
    textAlign: TextContentAlign = "left";

    constructor(props?: { style?: Partial<ComponentStyleProps>, key?: string, fontAssetName?: string, fontSize?: number, valign: TextBoxVAlign, halign: TextBoxHAlign, textAlign?: TextContentAlign }, children?: string[]) {
        super(props, []);

        this.fontAssetName = props?.fontAssetName || "defaultFont";
        this.fontSize = props?.fontSize || 12;
        this.font = AssetMap.loadFont(this.fontAssetName, this.fontSize) as Font
        this.text = children?.join("") || "";
        this.halign = props?.halign || "left";
        this.valign = props?.valign || "top";
        this.textAlign = props?.textAlign || "left";
    }

    render() {
        // render text in childRenderViewport depending on halign and valign
        const textWidth = math.min(this.font.getWidth(this.text), this.viewport.width);

        const wrappedText = this.font.getWrap(this.text, this.viewport.width); // Get the wrapped text array
        const numLines = wrappedText[1].length; // Calculate the total number of lines
        const lineHeight = this.font.getHeight(); // Get the height of a single line

        const textHeight = (numLines) * lineHeight;

        const x = this.childRenderViewport.x;
        const y = this.childRenderViewport.y;
        const w = this.childRenderViewport.width;
        const h = this.childRenderViewport.height;


        const halign = this.halign as TextBoxHAlign;
        const valign = this.valign as TextBoxVAlign;

        let textX = 0;
        let textY = 0;

        if (halign == "left") {
            textX = x;
        }
        else if (halign == "center") {
            textX = x + w / 2 - textWidth / 2;
        }
        else if (halign == "right") {
            textX = x + w - textWidth;
        }

        if (valign == "top") {
            textY = y;
        }
        else if (valign == "center") {
            textY = y + h / 2 - textHeight / 2;
        }
        else if (valign == "bottom") {
            textY = y + h - textHeight;
        }

        
        love.graphics.push('all');

        // Enable scissor test to clip rendering
        love.graphics.setScissor(x, y, w, h);
        love.graphics.setFont(this.font);
        this.renderColor(this.props.style.color as Color)
        love.graphics.printf(this.text, textX, textY, this.viewport.width, this.textAlign);

        // Disable scissor test when done to restore normal rendering
        love.graphics.setScissor();
        love.graphics.pop();
    }
}