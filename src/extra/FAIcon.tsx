import { Font } from "love.graphics";
import { AssetMap } from "../core/AssetMap";
import { BaseComponent } from "../core/BaseComponent";
import ComponentStyleProps from "../core/ComponentStyleProps";
import { FAIconType, fa_data } from "./fa_metadata";


export type FAIconBucket = "regular" | "solid" | "brands"

export class FAIcon extends BaseComponent {
    fontRef: Font
    icon: FAIconType
    bucket: FAIconBucket

    iconHeight: number
    iconWidth: number
    constructor(props?: { style?: Partial<ComponentStyleProps>, key?: string, icon?: FAIconType, bucket?: FAIconBucket, size?: number }, children?: BaseComponent[]){
        // we skip children
        super(props, []);

        this.icon = props?.icon || "heart"
        this.bucket = props?.bucket || "regular"
        this.fontRef = AssetMap.loadFont("fa_"+this.bucket, props?.size || 20) ;

        // calculate width and height of the icon
        const wrappedText = this.fontRef.getWrap(fa_to_unicode(this.bucket, this.icon), props?.size || 20)
        this.iconHeight = this.fontRef.getHeight()
        this.iconWidth = wrappedText[0]
    }

    renderLove2d(): void {
        const {x, y, width, height} = this.viewport;
        // display icon at the center

        love.graphics.push("all")
        love.graphics.setFont(this.fontRef)
        love.graphics.print(fa_to_unicode(this.bucket, this.icon), x + width/2 - this.iconWidth/2, y + height/2 - this.iconHeight/2)
        love.graphics.pop()

    }
}

function fa_to_unicode(bucket: FAIconBucket, name: FAIconType): string {
    // @ts-ignore
    return fa_data[bucket][name]
}
