import { Font, Image } from "love.graphics";

export type Love2DAsset = Image | Font

export class AssetMap {
    static assets: { [key: string]: string } = {};

    static addAsset(key: string, assetPath: string) {
        AssetMap.assets[key] = assetPath;
    }

    static getAsset(key: string): string | null {
        if(AssetMap.assets[key] == undefined) {
            return null;
        }
        return AssetMap.assets[key];
    }
    

    static loadFont(key: string, size: number): Font {
        const assetPath = AssetMap.getAsset(key);
        if(assetPath == null) {
            throw new Error("Asset not found: " + key);
        }
        return love.graphics.newFont(assetPath, size);
    }

    static {
        this.addAsset("defaultFont", "res/fonts/RobotoSlab-VariableFont_wght.ttf")
    }
}