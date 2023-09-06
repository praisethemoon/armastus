import { Font } from "love.graphics";
import { AssetMap } from "./AssetMap";
import { BaseComponent } from "./BaseComponent";
import ComponentStyleProps from "./ComponentStyleProps";
import { Div } from "./Div";
import { parseCoordinate } from "./utils/parseCoordinate";
import { Color } from "./Color";

type TextBoxHAlign = "left" | "center" | "right";
type TextBoxVAlign = "top" | "center" | "bottom";

export class TextBox extends Div {
    fontAssetName: string;
    fontSize: number;
    font: Font;
    text: string
    halign: TextBoxHAlign = "left";
    valign: TextBoxVAlign = "top";

    constructor(props?: { style: Partial<ComponentStyleProps>, key?: string, fontAssetName?: string, fontSize?: number, valign: TextBoxVAlign, halign: TextBoxHAlign  }, children?: string[]) {
        super(props, []);

        this.fontAssetName = props?.fontAssetName || "defaultFont";
        this.fontSize = props?.fontSize || 12;
        this.font = AssetMap.loadFont(this.fontAssetName, this.fontSize) as Font
        this.text = children?.join("") || "";
        this.halign = props?.halign || "left";
        this.valign = props?.valign || "top";
    }

    render() {
        // render text in childRenderViewport depending on halign and valign
        const textWidth = this.font.getWidth(this.text);
        const textHeight = this.font.getHeight();
        const x = this.childRenderViewport.x;
        const y = this.childRenderViewport.y;
        const w = this.childRenderViewport.width;
        const h = this.childRenderViewport.height;

        const halign = this.halign as TextBoxHAlign;
        const valign = this.valign as TextBoxVAlign;

        let textX = 0;
        let textY = 0;

        if(halign == "left") {
            textX = x;
        }
        else if(halign == "center") {
            textX = x + w/2 - textWidth/2;
        }
        else if(halign == "right") {
            textX = x + w - textWidth;
        }

        if(valign == "top") {
            textY = y;
        }
        else if(valign == "center") {
            textY = y + h/2 - textHeight/2;
        }
        else if(valign == "bottom") {
            textY = y + h - textHeight;
        }

        const color = (typeof(this.props.style.color) == "string" ? Color.fromString(this.props.style.color) : this.props.style.color || new Color(0, 0, 0, 255)).toLove2DColor();
        love.graphics.push();
        love.graphics.setFont(this.font);
        love.graphics.setColor(color[0], color[1], color[2], color[3]);
        love.graphics.printf(this.text, textX, textY, this.viewport.width);
        love.graphics.pop();
    }
    
}